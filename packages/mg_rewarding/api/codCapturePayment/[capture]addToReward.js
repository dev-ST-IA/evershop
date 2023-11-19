const { select, update } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { mgconstants } = require('../../helpers/constants');
const { getOrderRewardBaseQuery } = require('../../services/getOrderRewardBaseQuery');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const promises = [];
  Object.keys(delegate).forEach((id) => {
    // Check if middleware is async
    if (delegate[id] instanceof Promise) {
      promises.push(delegate[id]);
    }
  });
  const results = await Promise.allSettled(promises);
  const rejected = results.find(t => t.status === 'rejected')
  if (rejected) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: rejected.reason.message
      }
    });
    throw new Error(rejected.reason.message);
  }

  // eslint-disable-next-line camelcase
  const { order_id } = request.body;

  // Validate the order;
  const order = await select()
    .from('order')
    .where('uuid', '=', order_id)
    .and('payment_method', '=', 'cod')
    .and('payment_status', '=', 'paid')
    .load(pool);

  let error = false;
  let status = null;
  let res = null;
  if (!order) {
    error = true;
    status = INVALID_PAYLOAD;
    res = {
      error: {
        status: INVALID_PAYLOAD,
        message:
          'Requested order does not exist or is not in pending payment status'
      }
    }
  }

  if (error) {
    response.status(status);
    response.json(res);
    throw res.error.message;
  }

  const query = getOrderRewardBaseQuery(order.order_id, mgconstants.reward_rounds.status.ONGOING);
  const orderItemsReward = await query.execute(pool);

  if (!orderItemsReward) {
    return next();
  }

  const updateRoundItemsPromises = orderItemsReward.map(item =>
    update('order_round_mapping')
      .given({
        active: '1'
      })
      .where("round_id", '=', item.round_id)
      .andWhere("order_item_id", '=', item.order_item_id)
      .execute(pool)
  )

  const updatedRoundItems = await Promise.allSettled(updateRoundItemsPromises);

  if (updatedRoundItems.every(r => r.status === 'fulfilled')) {
    const orderRoundsandQuantities = orderItemsReward.reduce((result, currentItem) => {
      // Find the index of the existing item with the same round_id
      const existingItemIndex = result.findIndex(
        (item) => item.round_id === currentItem.round_id
      );

      if (existingItemIndex !== -1) {
        // If the round_id already exists, update the qty
        // eslint-disable-next-line no-param-reassign
        result[existingItemIndex].qty += currentItem.qty;
      } else {
        // If the round_id doesn't exist, add a new object to the result array
        result.push({
          round_id: currentItem.round_id,
          qty: currentItem.qty + currentItem.current_completed_quantity ?? 0,
          reward_category_id: currentItem.category_id,
          category_limit:currentItem.category_limit
        });
      }
      return result;
    }, []);

    const updateRoundQtyQueries = orderRoundsandQuantities.map(r =>
      update('reward_round')
        .given({
          'current_completed_quantity': r.qty
        })
        .where('round_id', '=', r.round_id)
        .execute(pool)
    )

    const updated = await Promise.allSettled(updateRoundQtyQueries);
    if (!updated.every(r => r.status === 'fulfilled')) {
      error = true;
      status = INTERNAL_SERVER_ERROR;
      res = {
        error: {
          status: INVALID_PAYLOAD,
          message:
            "Payment Captured!. Ongoing rewarding round is not updated"
        }
      }
    }
    request.body.updatedRewardRounds = updated.map(u => u.value)
  } else {
    error = true;
    status = INTERNAL_SERVER_ERROR;
    res = {
      error: {
        status: INVALID_PAYLOAD,
        message:
          "Payment Captured!. Ongoing rewarding round is not updated"
      }
    }
  }

  if (error) {
    response.status(status);
    response.json(res);
    throw new Error(res.error.message)
  }
  return next();
};
