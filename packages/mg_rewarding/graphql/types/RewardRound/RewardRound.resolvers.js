const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { select } = require('@evershop/postgres-query-builder');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getOngoingRewardRoundsBaseQuery } = require('../../../services/getOngoingRewardRoundsBaseQuery');
const { OngoingRewardRoundCollection } = require('../../../services/OngoingRewardRoundCollection');
const { CompletedRewardRoundCollection } = require('../../../services/CompletedRewardRoundCollection');
const { getCompletedRewardRoundsBaseQuery } = require('../../../services/getCompletedRewardRoundsBaseQuery');

// buildUrl('updateRewardRound', { id: round.uuid })
// buildUrl('deleteRewardRound', { id: round.uuid })
// buildUrl('viewRewardRound', { id: round.uuid }) 
// buildUrl('selectRoundWinner', { id: round.uuid })
// DateTime.fromSQL(areaProps.row[id], { zone: 'UTC' })
module.exports = {
  RewardRound: {
    updateApi: () => "",
    deleteApi: () => "",
    viewRoundApi: async ({ roundId, ...round }, _, {pool}) => {
      const query = select('uuid').from('reward_round').where('round_id','=',roundId);
      const {uuid} = await query.load(pool);
      if(!uuid) return '';
      // eslint-disable-next-line no-param-reassign
      round.uuid = uuid;
      return buildUrl('rewardRoundView', { id: uuid });
    },
    selectWinnerApi: ({roundId}) => buildUrl('selectRoundWinner', { id: roundId }),
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
    },
    roundEndDateTime: ({roundEndDateTime}) =>{
      const date = new Date(roundEndDateTime);
      if(!date) return null;
      return date.toLocaleDateString();
    },
    winnerSelected: ({ winnerId }) => {
      const statusList = getConfig('mg_rewarding.round.winnerSelected', {});
      const curStatus = winnerId? 'selected':'unselected'
      const status = statusList[curStatus] || {
        title: 'Unknown',
        code: curStatus,
        badge: 'default',
        progress: 'incomplete'
      };

      return {
        ...status,
        code: curStatus
      };
    },
    isWinnerSelected: ({winnerId}) => !!winnerId
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
    },
    rewardRoundsCompleted: async (_, { filters = [] }, { user }) => {
      const query = getCompletedRewardRoundsBaseQuery();
      const root = new CompletedRewardRoundCollection(query);
      await root.init({}, { filters }, { user });
      return root;
    },
    rewardRoundHistory: async (_, {id}, { pool }) =>{
      const history = await select().from('reward_round_history')
      .where('round_id','=',id).execute(pool);
      return (history?? []).map(t => camelCase(t));
    },
    ongoingRewardRoundByCategory: async (_, { categoryId }, { pool }) => {
      const query = await getOngoingRewardRoundsBaseQuery();
      query.where('reward_round.category_id', '=', categoryId);
      query.limit(0, 1);
      const result = await query.load(pool);
      if (!result) {
        return null;
      } else {
        return camelCase(result);
      }
    }
  }
};
