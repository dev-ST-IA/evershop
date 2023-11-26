const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { DateTime } = require('luxon');

class CompletedRewardRoundCollection {
  constructor(baseQuery) {
    this.baseQuery = baseQuery;
  }

  // eslint-disable-next-line no-unused-vars
  async init(args, { filters = [] }, { user }) {
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

    // categoryLimit filter
    const categoryLimit = filters.find((f) => f.key === 'category_limit');
    if (categoryLimit) {
      this.baseQuery.andWhere(
        'reward_round.category_limit',
        '=',
        categoryLimit.value
      );
      currentFilters.push({
        key: 'category_limit',
        operation: '=',
        value: categoryLimit.value
      });
    }

    // completedQty filter
    const completedQty = filters.find((f) => f.key === 'current_completed_quantity');
    if (completedQty) {
      this.baseQuery.andWhere(
        'reward_round.current_completed_quantity',
        '=',
        completedQty.value
      );
      currentFilters.push({
        key: 'current_completed_quantity',
        operation: '=',
        value: completedQty.value
      });
    }

    // start date filter
    const startDate = filters.find((f) => f.key === 'round_start_date_time');
    if (startDate) {
      const [min, max] = startDate.value.split('-').map((v) => parseFloat(v));
      let currentStartDateFilter;
      if (Number.isNaN(min) === false) {
        const minDate = new Date(min);
        if(DateTime.fromISO(minDate).isValid){
          const parsedMin = minDate.toISOString().slice(0, 19).replace('T', ' ');
          this.baseQuery.andWhere('reward_round.round_start_date_time', '>=', parsedMin);
          currentStartDateFilter = { key: 'round_start_date_time', operation: '>=', value: `${parsedMin}` };
        }else{
          currentStartDateFilter = { key: 'round_start_date_time', operation: '>=', value: `` };
        }
        
      }

      if (Number.isNaN(max) === false) {
        const maxDate = new Date(max);
        if(DateTime.fromISO(maxDate).isValid){
          const parsedMax = maxDate.toISOString().slice(0, 19).replace('T', ' ');
          this.baseQuery.andWhere('reward_round.round_start_date_time', '<=', parsedMax);
          currentStartDateFilter = {
            key: 'round_start_date_time',
            operation: '<=',
            value: `${currentStartDateFilter.value}-${parsedMax}`
          };
        }else{
          currentStartDateFilter = {
            key: 'round_start_date_time',
            operation: '<=',
            value: ``
          };
        }
        
      }
      if (currentStartDateFilter) {
        currentFilters.push(currentStartDateFilter);
      }
    }

    // end date filter
    // start date filter
    const endDate = filters.find((f) => f.key === 'round_end_date_time');
    if (endDate) {
      const [min, max] = endDate.value.split('-').map((v) => parseFloat(v));
      let currentEndDateFilter;
      if (Number.isNaN(min) === false) {
        const minDate = new Date(min);
        if(DateTime.fromISO(minDate).isValid){
          const parsedMin = minDate.toISOString().slice(0, 19).replace('T', ' ');
          this.baseQuery.andWhere('reward_round.round_end_date_time', '>=', parsedMin);
          currentEndDateFilter = { key: 'round_end_date_time', operation: '>=', value: `${parsedMin}` };
        }
      }

      if (Number.isNaN(max) === false) {
        const maxDate = new Date(max);
        if(DateTime.fromISO(maxDate).isValid){
          const parsedMax = maxDate.toISOString().slice(0, 19).replace('T', ' ');
          this.baseQuery.andWhere('reward_round.round_end_date_time', '<=', parsedMax);
          currentEndDateFilter = {
            key: 'round_end_date_time',
            operation: '<=',
            value: `${currentEndDateFilter.value}-${parsedMax}`
          };
        }
      }
      if (currentEndDateFilter) {
        currentFilters.push(currentEndDateFilter);
      }
    }

    // winner filter
    const winner = filters.find((f) => f.key === 'winner_status');
    if (winner) {
      this.baseQuery.andWhere(
        'reward_round.winner_id',
        // eslint-disable-next-line eqeqeq
        winner.value == 1? '<>':'IS NULL',
        ''
      );
      currentFilters.push({
        key: 'winner_status',
        // eslint-disable-next-line eqeqeq
        operation: winner.value == 1? '<>':'IS NULL',
        value: winner.value
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
      this.baseQuery.orderBy('reward_round.category_id', 'DESC');
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
    totalQuery.select('COUNT(reward_round.category_id)', 'total');
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

module.exports.CompletedRewardRoundCollection = CompletedRewardRoundCollection;
