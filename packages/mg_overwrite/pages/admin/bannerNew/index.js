const { setContextValue } = require("@evershop/evershop/src/modules/graphql/services/contextHelper");

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Create a new banner',
    description: 'Create a new banner'
  });
};
