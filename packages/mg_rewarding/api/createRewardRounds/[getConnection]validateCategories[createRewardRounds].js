const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { select, rollback } = require('@evershop/postgres-query-builder');
const {
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { mgconstants } = require('../../helpers/constants');

module.exports = async (request, response, delegate) => {
  const connection = await delegate.getConnection;
  const ids = request.body.selectedIds ?? [];

  const categoriesAvailablePromises = ids.map(id =>
    select().from("reward_category")
      .where("reward_category.category_id", "=", id)
      .andWhere("reward_category.active", "=", "1")
      .load(pool)
  )

  const categoriesAvailable = await Promise.allSettled(categoriesAvailablePromises);
  const categoriesAvailableRejected = categoriesAvailable.find(t => t.status === "rejected")
  const categoriesUnAvailable = categoriesAvailable.find(t => !t.value && t.status === "fulfilled")

  const ongoingRoundsPromises = ids.map(id =>
    select("COUNT(reward_round.category_id)").from("reward_round")
      .limit(0, 1)
      .where("reward_round.category_id", "=", id)
      .andWhere("reward_round.round_status", "=", mgconstants.reward_rounds.status.ONGOING)
      .load(pool)
  )

  const ongoingRounds = await Promise.allSettled(ongoingRoundsPromises);
  const ongoingRoundsRejected = ongoingRounds.find(t => t.status === "rejected")
  const ongoingRoundsAvailable = ongoingRounds.find(t => !!t.value && t.status==="fulfilled").value

  let error = null;
  let errorStatus = null;
  if (categoriesAvailableRejected || ongoingRoundsRejected) {
    errorStatus = INTERNAL_SERVER_ERROR;
    error = {
      status: INTERNAL_SERVER_ERROR,
      message: categoriesAvailableRejected ? categoriesAvailableRejected.reason : ongoingRoundsRejected.reason
    }
  }

  if (!error && categoriesUnAvailable) {
    errorStatus = NOT_FOUND
    error = {
      status: NOT_FOUND,
      message: "One or more Categories are unavailable to start a rewarding round"
    }
  }

  if (!error && ongoingRoundsAvailable?.count > 0) {
    errorStatus = FORBIDDEN
    error = {
      status: FORBIDDEN,
      message: "One or more Categories already has an On-Going Rewarding Round"
    }
  }

  if (error) {
    await rollback(connection);
    response.status(errorStatus);
    response.json({ error });
    throw new Error(error.message);
  }

  return categoriesAvailable.map(c => c.value);
};
