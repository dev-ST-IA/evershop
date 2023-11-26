const { update, select, insert, rollback, commit } = require('@evershop/postgres-query-builder');
const {
  INVALID_PAYLOAD,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  OK
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { DateTime } = require('luxon')

module.exports = async (request, response, delegate) => {
  const connection = await delegate.getConnection;
  const roundId = request.params.id;
  const cRH = await select()
    .from('customer_reward_history')
    .where('round_id', '=', roundId)
    .load(connection);

  if (!cRH) {
    response.status(INVALID_PAYLOAD);
    throw new Error('Invalid Round Id');
  }

  const { reward_received, reward_sent, reward_expiry } = cRH;

  try {
    const body = {}
    let expiryDate = DateTime.now()
    const today = DateTime.now().startOf('day');
    if (reward_expiry) {
      expiryDate = DateTime.fromSQL(reward_expiry, { zone: 'UTC' });
    }

    if (expiryDate >= today || reward_sent) {
      let eventDescription = ""
      if (reward_sent) {
        body.reward_received = '1';
        eventDescription = "Reward Received By Winner"
      } else if (!reward_received) {
        body.reward_sent = '1';
        eventDescription = "Reward Claimed By Winner"
      } else {
        response.status(CONFLICT);
        const message = "Cannot Update Entity."
        response.json({
          data: {
            error: message,
            status: CONFLICT
          }
        })
        throw new Error(message)
      }

      const newCRH = await update('customer_reward_history')
        .given(body)
        .where('round_id', '=', cRH.round_id)
        .execute(connection);

      const newEvent = await insert('reward_round_history')
        .given({
          round_id: roundId,
          description: eventDescription
        })
        .execute(connection);

      await commit(connection);
      response.status(OK)
      response.json({
        data: {
          status: OK,
          customerRewardHistory: { ...newCRH },
          rewardRoundHistory: { ...newEvent }
        }
      })

    } else {
      response.status(FORBIDDEN);
      const message = "Reward Expired. Cannot be claimed by the winner"
      response.json({
        data: {
          error: message,
          status: CONFLICT
        }
      })
      throw new Error(message)
    }

  } catch (e) {
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    const message = e?.message
    response.json({
      data: {
        error: message,
        status: INTERNAL_SERVER_ERROR
      }
    })
    throw new Error(message)
  }
};
