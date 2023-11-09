const { select } = require('@evershop/postgres-query-builder');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { RewardCategoryCollection } = require('../../../services/RewardCategoryCollection');

module.exports = {
  RewardCategory: {
    deleteApi: (category) => buildUrl('deleteRewardCategory', { id: category.uuid }),
    editUrl: (category) => buildUrl('rewardingCategoryEdit', { id: category.uuid }),
    updateApi: (category) => buildUrl('updateRewardCategory', { id: category.uuid }),
    addProductUrl: (category) =>
        buildUrl('addProductToRewardCategory', { category_id: category.uuid })
  },
  Query: {
    rewardCategory: async (_, { id }, { pool }) => {
      const query = await select().from('reward_category');
      query.where('reward_category.category_id', '=', id);
      query.limit(0,1);
      const result = await query.load(pool);
      if (!result) {
        return null;
      } else {
        return camelCase(result);
      }
    },
    rewardCategories: async (_, { filters = [] }, { user }) => {
      const query = await select().from('reward_category');
      const root = new RewardCategoryCollection(query);
      await root.init({}, { filters }, { user });
      return root;
    }
  },
  Product: {
    rewardCategory: async (product, _, { pool }) => {
      // Get the url rewrite for this product
      const category = await select()
      .from('reward_category')
      .where('category_id', '=', product.rewardCategoryId)
      .load(pool);

      if (category) {
        return camelCase(category);
      }
      return undefined;
    },
    removeFromRewardCategoryUrl: async (product, _, { pool }) => {
      if (!product.rewardCategoryId) {
          return null;
      } else {
          const rewardCategory = await select()
              .from('reward_category')
              .where('category_id', '=', product.rewardCategoryId)
              .load(pool);
          return buildUrl('removeProductFromRewardCategory', {
              category_id: rewardCategory.uuid,
              product_id: product.uuid
          });
      }
  }
  }
};
