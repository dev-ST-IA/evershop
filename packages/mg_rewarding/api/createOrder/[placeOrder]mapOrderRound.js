const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { insert } = require('@evershop/postgres-query-builder');
const { mgconstants } = require('../../helpers/constants');
const {getOrderRewardBaseQuery} = require('../../services/getOrderRewardBaseQuery');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  // Get the order data from $body
  const newOrder = response.$body?.data || {};
  const query = getOrderRewardBaseQuery(newOrder.order_id, mgconstants.reward_rounds.status.ONGOING);
  const orderItems = await query.execute(pool);
  if (!orderItems) return next();
  const insertMappingQueries = orderItems.map(item => insert('order_round_mapping')
    .given({
      "round_id": item.round_id,
      "order_item_id": item.order_item_id,
      active: 0
    })
    .execute(pool))
  await Promise.allSettled(insertMappingQueries);
  return next();
};
