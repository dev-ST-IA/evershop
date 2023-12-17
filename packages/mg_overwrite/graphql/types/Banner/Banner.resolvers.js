const { select } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const {
  getBannersBaseQuery
} = require('../../../services/getBannersBaseQuery');
const { BannerCollection } = require('../../../services/BannerCollection');

module.exports = {
  Query: {
    banner: async (_, { id }, { pool }) => {
      const query = select().from('cms_banner');
      query.where('cms_banner_id', '=', id);
      const result = await query.load(pool);
      return result ? camelCase(result) : null;
    },
    // eslint-disable-next-line no-unused-vars
    banners: async (_, { filters = [] }, { user }) => {
      const query = getBannersBaseQuery();
      const root = new BannerCollection(query);
      await root.init({}, { filters });
      return root;
    }
  },
  Banner: {
    editUrl: (banner) => buildUrl('bannerEdit', { id: banner.uuid }),
    updateApi: (banner) => buildUrl('updateBanner', { id: banner.uuid }),
    deleteApi: (banner) => buildUrl('deleteBanner', { id: banner.uuid }),
    url: async (banner, _, { pool }) => {
      // Get the url rewrite for this banner
      if(!banner.url_id) return ''
      const urlRewrite = await select()
        .from('url_rewrite')
        .where('url_rewrite_id', '=', banner.url_id)
        .load(pool);
      if (!urlRewrite) {
        return '';
      } else {
        return urlRewrite.request_path;
      }
    },
    image: (banner) => {
      const { image } = banner;
      if (!image) {
        return null;
      } else {
        return {
          path: image,
          url: `/assets${image}`
        };
      }
    }
  }
};
