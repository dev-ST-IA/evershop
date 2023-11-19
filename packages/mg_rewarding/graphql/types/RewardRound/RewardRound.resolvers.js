const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
// const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { select } = require('@evershop/postgres-query-builder');
const { getOngoingRewardRoundsBaseQuery } = require('../../../services/getOngoingRewardRoundsBaseQuery');
const { OngoingRewardRoundCollection } = require('../../../services/OngoingRewardRoundCollection');

// buildUrl('updateRewardRound', { id: round.uuid })
// buildUrl('deleteRewardRound', { id: round.uuid })
// buildUrl('viewRewardRound', { id: round.uuid }) 
// buildUrl('selectRoundWinner', { id: round.uuid })
module.exports = {
  RewardRound: {
    updateApi: () => "",
    deleteApi: () => "",
    viewRoundApi: () => "",
    selectWinnerApi: () => "",
    category: async ({ categoryId }, _, {pool}) => {
      const query = await select().from('reward_category');
      query.where('category_id', '=', categoryId);
      query.limit(0, 1);
      const result = await query.load(pool);
      if (!result) return null;
      return camelCase(result);
    },
    winner: async (_, { customerId }, { pool }) => {
      if (!customerId) return null;
      const query = await select().from('customer');
      query.where('customer_id', '=', customerId);
      query.limit(0, 1);
      const result = await query.load(pool);
      if (!result) return null;
      return camelCase(result);
    },
    roundStartDateTime: ({roundStartDateTime}) =>{
      const date = new Date(roundStartDateTime);
      if(!date) return null;
      return date.toLocaleDateString();
    }
  },
  Query: {
    rewardRound: async (_, { id }, { pool }) => {
      const query = await getOngoingRewardRoundsBaseQuery();
      query.where('reward_round.round_id', '=', id);
      query.limit(0, 1);
      const result = await query.load(pool);
      if (!result) {
        return null;
      } else {
        return camelCase(result);
      }
    },
    rewardRounds: async (_, { filters = [] }, { user }) => {
      const query = await getOngoingRewardRoundsBaseQuery()
      const root = new OngoingRewardRoundCollection(query);
      await root.init({}, { filters }, { user });
      return root;
    }
  }
};
