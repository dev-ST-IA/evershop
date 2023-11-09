const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');

class RewardCategoryCollection {
  constructor(baseQuery) {
    this.baseQuery = baseQuery;
  }

  async init(args, { filters = [] }, { user }) {
    if (!user) {
      this.baseQuery.andWhere('reward_category.active', '=', 1);
    }
    const currentFilters = [];

    // Name filter
    const nameFilter = filters.find((f) => f.key === 'category_name');
    if (nameFilter) {
      this.baseQuery.andWhere(
        'reward_category.category_name',
        'ILIKE',
        `%${nameFilter.value}%`
      );
      currentFilters.push({
        key: 'category_name',
        operation: '=',
        value: nameFilter.value
      });
    }

    // Status filter
    const statusFilter = filters.find((f) => f.key === 'active');
    if (statusFilter) {
      this.baseQuery.andWhere('reward_category.active', '=', statusFilter.value);
      currentFilters.push({
        key: 'active',
        operation: '=',
        value: statusFilter.value
      });
    }

    // categoryLimit filter
    const categoryLimit = filters.find((f) => f.key === 'category_limit');
    if (categoryLimit) {
      this.baseQuery.andWhere(
        'reward_category.category_limit',
        '=',
        categoryLimit.value
      );
      currentFilters.push({
        key: 'category_limit',
        operation: '=',
        value: categoryLimit.value
      });
    }

    const sortBy = filters.find((f) => f.key === 'sortBy');
    const sortOrder = filters.find(
      (f) =>
        f.key === 'sortOrder' &&
        ['ASC', 'DESC', 'asc', 'desc'].includes(f.value)
    ) || { value: 'DESC' };
    if (sortBy && sortBy.value === 'category_name') {
      this.baseQuery.orderBy('reward_category.category_name', sortOrder.value);
      currentFilters.push({
        key: 'sortBy',
        operation: '=',
        value: sortBy.value
      });
    } else {
      this.baseQuery.orderBy('reward_category.category_id', 'DESC');
    }
    if (sortOrder.key) {
      currentFilters.push({
        key: 'sortOrder',
        operation: '=',
        value: sortOrder.value
      });
    }

    // Clone the main query for getting total right before doing the paging
    const totalQuery = this.baseQuery.clone();
    totalQuery.select('COUNT(reward_category.category_id)', 'total');
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

module.exports.RewardCategoryCollection = RewardCategoryCollection;
