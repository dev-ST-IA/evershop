const { insert } = require('@evershop/postgres-query-builder');

module.exports = async (request, response, delegate) => {
  const connection = await delegate.getConnection;
  const data = request.body;

  const result = await insert('cms_banner').given(data).execute(connection);
  return result;
};
