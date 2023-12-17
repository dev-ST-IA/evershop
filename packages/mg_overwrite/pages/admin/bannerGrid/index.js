const {
  buildFilterFromUrl
} = require('@evershop/evershop/src/lib/util/buildFilterFromUrl');
const { setContextValue } = require('@evershop/evershop/src/modules/graphql/services/contextHelper');


// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Banners',
    description: 'Banners'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request.query));
};
