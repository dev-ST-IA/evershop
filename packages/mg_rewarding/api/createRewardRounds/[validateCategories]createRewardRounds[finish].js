const { insert, rollback } = require('@evershop/postgres-query-builder');
const {
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { mgconstants } = require('../../helpers/constants');

module.exports = async (request, response, delegate) => {
  const connection = await delegate.getConnection;
  const categories = await delegate.validateCategories;
  const {buildRewardRound} = module.exports

  const roundInserts = categories.map(category =>
    insert('reward_round')
      .given(buildRewardRound(category))
      .execute(connection)
  )

  const roundInsertPromises = await Promise.allSettled(roundInserts);

  const roundInsertedEventsQuery = roundInsertPromises.filter(t => t.status === 'fulfilled')
  .map(r => insert('reward_round_history')
  .given({
    round_id:r.value.insertId,
    description: 'Round Created'
  }).execute(connection))
  const roundInsertedEventsPromises = await Promise.allSettled(roundInsertedEventsQuery);

  const roundInsertRejects = roundInsertPromises.find(r => r.status === 'rejected')
  const roundInsertEventRejects = roundInsertedEventsPromises.find(r => r.status === 'rejected')

  if (!roundInsertRejects && !roundInsertEventRejects) {
    return roundInsertPromises.map(r => r.value);
  }
  else {
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      data: null,
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: roundInsertRejects.reason.message
      }
    });
    throw new Error(roundInsertRejects.reason.message)
  }
};

module.exports.buildRewardRound = (category) =>
({
  "category_id": category.category_id,
  "round_status": mgconstants.reward_rounds.status.ONGOING,
  "current_completed_quantity": 0,
  "category_limit": category.category_limit
})
