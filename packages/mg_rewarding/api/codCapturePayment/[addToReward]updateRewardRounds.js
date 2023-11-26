const { update, insert } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { mgconstants } = require('../../helpers/constants');

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
  const { updatedRewardRounds } = request.body;

  const toCompleteRounds = (updatedRewardRounds ?? []).filter(t => t.current_completed_quantity >= t.category_limit);

  const completeRoundQueries = toCompleteRounds.map(r =>
    update('reward_round')
      .given({
        round_status: mgconstants.reward_rounds.status.COMPLETED,
        round_end_date_time: 'NOW()'
      })
      .where('round_id', '=', r.round_id)
      .execute(pool)
  )

  const roundUpdated = await Promise.allSettled(completeRoundQueries);
  request.body.completedRounds = roundUpdated.map(t => t.value)

  const roundCompletedEventsQuery = request.body.completedRounds
  .map(r => insert('reward_round_history')
  .given({
    round_id:r.round_id,
    description: 'Round Completed'
  }).execute(pool))
  const roundCompletedEventsPromises = await Promise.allSettled(roundCompletedEventsQuery);

  const roundCompletedEventRejects = roundCompletedEventsPromises.find(r => r.status === 'rejected')


  if (roundUpdated.find(t => t.status === 'rejected') || roundCompletedEventRejects) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message:
          "Payment Captured!. Ongoing rewarding round is not updated"
      }
    });
    throw new Error("Payment Captured!. Ongoing rewarding round is not updated")
  }
  return next();
};
