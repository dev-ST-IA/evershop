const { execute } = require('@evershop/postgres-query-builder');

const add_include_all_collection = `
ALTER TABLE collection
ADD COLUMN include_all BOOLEAN NULL DEFAULT('0');

ALTER TABLE collection
ADD COLUMN include_all_order_by INT NULL DEFAULT(0);
`;

const add_show_in_homepage_collection = `
ALTER TABLE collection
ADD COLUMN show_in_homepage BOOLEAN NULL DEFAULT('0');
`;

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, add_include_all_collection);
  await execute(connection, add_show_in_homepage_collection);
};
