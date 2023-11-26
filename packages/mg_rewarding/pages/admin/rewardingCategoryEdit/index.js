const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  setContextValue
} = require('../../../../evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('reward_category');
    query.andWhere('reward_category.uuid', '=', request.params.id);
    const category = await query.load(pool);
    if (category === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'categoryId', category.category_id);
      setContextValue(request, 'categoryUuid', category.uuid);
      setContextValue(request, 'pageInfo', {
        title: category.category_name,
        description: category.reward_details
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
