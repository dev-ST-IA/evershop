const { select } = require('@evershop/postgres-query-builder');

module.exports.getBannersBaseQuery = () => {
  const query = select().from('cms_banner');
  return query;
};
