const { get } = require('@evershop/evershop/src/lib/util/get');
const { select, insert } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR,
  OK
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { buildRewardRound } = require('../createRewardRounds/[validateCategories]createRewardRounds[finish]');

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
  const { completedRounds } = request.body;

  if (!completedRounds) {
    response.status(OK);
    response.json({
      data: {}
    });
    return next();
  }

  const selectedIds = (completedRounds ?? []).map(r => parseInt(r.category_id, 10))

  try {
    const categoriesAvailablePromises = selectedIds.map(id =>{
      const selectQueries = select().from("reward_category")
      .where("reward_category.category_id", "=", id)
      .and("reward_category.auto_restart","=", '1');

      selectQueries.and("reward_category.active", "=", "1")
      return selectQueries.execute(pool);
    }
    )
    const categoriesAvailable = await Promise.allSettled(categoriesAvailablePromises);
    const categoriesAvailableRejected = categoriesAvailable.find(t => t.status === "rejected")

    if(categoriesAvailableRejected){
      throw new Error("Cannot create new rounds of rewarding system");
    }
    const roundInserts = categoriesAvailable.map(c=>c.value[0]).filter(c => !!c).map(category =>
      insert('reward_round')
        .given(buildRewardRound(category))
        .execute(pool)
    )

    const roundInsertPromises = await Promise.allSettled(roundInserts);
    const roundInsertRejects = roundInsertPromises.find(r => r.status === 'rejected')

    if (roundInsertRejects) {
      throw new Error("One or more Rounds of rewarding system were not created.")
    }
    response.status(OK);
    response.json({
      data: {}
    });
    return next();
  } catch (error) {
    const message = get(
      error,
      'response.data.error.message',
      'Something wrong. Please reload the page!'
    );
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message
      }
    });
    throw new Error(message)
  }
};
