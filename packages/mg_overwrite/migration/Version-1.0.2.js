const { execute } = require('@evershop/postgres-query-builder');

const add_quick_links_cms = `
ALTER TABLE cms_page
ADD COLUMN show_in_footer BOOLEAN NULL DEFAULT('0');

ALTER TABLE cms_page
ADD COLUMN show_in_header BOOLEAN NULL DEFAULT('0');

ALTER TABLE cms_page
ADD COLUMN show_in_menu BOOLEAN NULL DEFAULT('0');
`;

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, add_quick_links_cms);
};
