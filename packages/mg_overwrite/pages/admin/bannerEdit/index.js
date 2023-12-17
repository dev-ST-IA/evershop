const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { setContextValue } = require('@evershop/evershop/src/modules/graphql/services/contextHelper');


module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('cms_banner');
    query.andWhere('cms_banner.uuid', '=', request.params.id);

    const banner = await query.load(pool);

    if (banner === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'cmsBannerId', banner.cms_banner_id);
      setContextValue(request, 'cmsBannerUuid', banner.uuid);
      setContextValue(request, 'pageInfo', {
        title: banner.name,
        description: banner.description
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
