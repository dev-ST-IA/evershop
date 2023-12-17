const { CollectionCollection } = require("@evershop/evershop/src/modules/catalog/services/CollectionCollection");
const { getCollectionsBaseQuery } = require("@evershop/evershop/src/modules/catalog/services/getCollectionsBaseQuery");

module.exports = {
  Query: {
    featuredCollections: async (_, { filters = [] }) => {
      const query = getCollectionsBaseQuery();
      query.andWhere('collection.show_in_homepage','=','1')
      const root = new CollectionCollection(query);
      await root.init({}, { filters });
      return root;
    }
  }
};
