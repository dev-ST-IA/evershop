const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');

class BannerCollection {
  constructor(baseQuery) {
    this.baseQuery = baseQuery;
  }

  async init(args, { filters = [] }) {
    const currentFilters = [];

    // Name filter
    const nameFilter = filters.find((f) => f.key === 'name');
    if (nameFilter) {
      this.baseQuery.andWhere(
        'cms_banner.name',
        'ILIKE',
        `%${nameFilter.value}%`
      );
      currentFilters.push({
        key: 'name',
        operation: '=',
        value: nameFilter.value
      });
    }

    // Active filter
    const activeFilter = filters.find((f) => f.key === 'active');
    this.baseQuery.andWhere('cms_banner.active', '=', activeFilter? activeFilter.value:1);
    currentFilters.push({
      key: 'active',
      operation: '=',
      value: activeFilter? activeFilter.value:1
    });

    const sortBy = filters.find((f) => f.key === 'sortBy');
    const sortOrder = filters.find(
      (f) =>
        f.key === 'sortOrder' &&
        ['ASC', 'DESC', 'asc', 'desc'].includes(f.value)
    ) || { value: 'DESC' };
    if (sortBy && sortBy.value === 'name') {
      this.baseQuery.orderBy('cms_banner.name', sortOrder.value);
      currentFilters.push({
        key: 'sortBy',
        operation: '=',
        value: sortBy.value
      });
    }
    this.baseQuery.orderBy('cms_banner.cms_banner_id', 'DESC');
      
    if (sortOrder.key) {
      currentFilters.push({
        key: 'sortOrder',
        operation: '=',
        value: sortOrder.value
      });
    }

    // Clone the main query for getting total right before doing the paging
    const totalQuery = this.baseQuery.clone();
    totalQuery.select('COUNT(cms_banner.cms_banner_id)', 'total');
    totalQuery.removeOrderBy();
    // Paging
    const page = filters.find((f) => f.key === 'page') || { value: 1 };
    const limit = filters.find((f) => f.key === 'limit') || { value: 20 }; // TODO: Get from the config
    currentFilters.push({
      key: 'page',
      operation: '=',
      value: page.value
    });
    currentFilters.push({
      key: 'limit',
      operation: '=',
      value: limit.value
    });
    this.baseQuery.limit(
      (page.value - 1) * parseInt(limit.value, 10),
      parseInt(limit.value, 10)
    );
    this.currentFilters = currentFilters;
    this.totalQuery = totalQuery;
  }

  async items() {
    const items = await this.baseQuery.execute(pool);
    return items.map((row) => camelCase(row));
  }

  async total() {
    // Call items to get the total
    const total = await this.totalQuery.execute(pool);
    return total[0].total;
  }

  currentFilters() {
    return this.currentFilters;
  }
}

module.exports.BannerCollection = BannerCollection;
