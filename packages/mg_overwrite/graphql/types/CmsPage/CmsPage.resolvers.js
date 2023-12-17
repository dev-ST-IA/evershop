/* eslint-disable no-unused-vars */
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { select } = require('@evershop/postgres-query-builder');

module.exports = {
  Query: {
    cmsFooterLinks: async (_, { filters = [] }, { pool }) => {
      const query = select('cms_page_description.name')
        .select('cms_page_description.url_key')
        .from('cms_page');
      query
        .leftJoin('cms_page_description')
        .on(
          'cms_page.cms_page_id',
          '=',
          'cms_page_description.cms_page_description_cms_page_id'
        );
      query.where('cms_page.status', '=', '1');
      query.andWhere('cms_page.show_in_footer', '=', '1')
      const data = await query.execute(pool);
      if (!data) return []
      return data.map(cms => {
        const formatted = camelCase(cms)
        return ({
          name: formatted.name,
          urlKey: formatted.urlKey,
          url: formatted.urlKey ? buildUrl('cmsPageView', { url_key: formatted.urlKey }) : ''
        })
      })
    },
    cmsHeaderLinks: async (_, { filters = [] }, { pool }) => {
      const query = select('cms_page_description.name')
        .select('cms_page_description.url_key')
        .from('cms_page');
      query
        .leftJoin('cms_page_description')
        .on(
          'cms_page.cms_page_id',
          '=',
          'cms_page_description.cms_page_description_cms_page_id'
        );
      query.where('cms_page.status', '=', '1');
      query.andWhere('cms_page.show_in_header', '=', '1')
      const data = await query.execute(pool);
      if (!data) return []
      return data.map(cms => {
        const formatted = camelCase(cms)
        return ({
          name: formatted.name,
          urlKey: formatted.urlKey,
          url: formatted.urlKey ? buildUrl('cmsPageView', { url_key: formatted.urlKey }) : ''
        })
      })
    },
    cmsMenuLinks: async (_, { filters = [] }, { pool }) => {
      const query = select('cms_page_description.name')
        .select('cms_page_description.url_key')
        .from('cms_page');
      query
        .leftJoin('cms_page_description')
        .on(
          'cms_page.cms_page_id',
          '=',
          'cms_page_description.cms_page_description_cms_page_id'
        );
      query.where('cms_page.status', '=', '1');
      query.andWhere('cms_page.show_in_menu', '=', '1')
      const data = await query.execute(pool);
      if (!data) return []
      return data.map(cms => {
        const formatted = camelCase(cms)
        return ({
          name: formatted.name,
          urlKey: formatted.urlKey,
          url: formatted.urlKey ? buildUrl('cmsPageView', { url_key: formatted.urlKey }) : ''
        })
      })
    }
  }
};
