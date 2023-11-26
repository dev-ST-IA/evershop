const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { setContextValue } = require('@evershop/evershop/src/modules/graphql/services/contextHelper');


module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query
      .from('product');
    query.where('product.uuid', '=', request.params.uuid);
    query.andWhere('status', '=', 1);
    const product = await query.load(pool);

    if (product === null) {
      response.status(404);
      next();
    } else {
      const { reward_category_id } = product
      if(reward_category_id){
        setContextValue(request, "rewardCategoryId", reward_category_id);
      }
      next();
    }
  } catch (e) {
    next(e);
  }
};
