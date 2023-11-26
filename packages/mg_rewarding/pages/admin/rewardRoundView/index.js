const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  setContextValue
} = require('../../../../evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('reward_round');
    query.where('reward_round.uuid', '=', request.params.id);
    const round = await query.load(pool);
    if (round === null) {
      response.status(404);
      next();
    } else {
      const category = await select().from('reward_category').where('category_id','=',round.category_id).load(pool);
      setContextValue(request, 'categoryId', category?.category_id);
      setContextValue(request, 'categoryUuid', category?.uuid);
      setContextValue(request, 'roundUuid', round.uuid);
      setContextValue(request, 'roundId', round.round_id);
      setContextValue(request, 'winnerId', round.winner_id);
      setContextValue(request, 'pageInfo', {
        title: `${category.category_name }-${round.round_id}`,
        description: category.reward_details?? ""
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
