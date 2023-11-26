const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { select } = require('@evershop/postgres-query-builder');
const { DateTime } = require('luxon')

module.exports = {
    CustomerRewardHistory: {
        round: async ({ roundId },_,  { pool }) => {
            if (!roundId) return null;
            const query = await select().from('reward_round');
            query.where('round_id', '=', roundId);
            query.limit(0, 1);
            const result = await query.load(pool);
            if (!result) return null;
            return camelCase(result);
        },
        order: async ({ orderId },_,  { pool }) => {
            if (!orderId) return null;
            const query = await select().from('order');
            query.where('order_id', '=', orderId);
            query.limit(0, 1);
            const result = await query.load(pool);
            if (!result) return null;
            return camelCase(result);
        },
        orderItem: async ({ orderItemId },_,  { pool }) => {
            if (!orderItemId) return null;
            const query = await select().from('order_item');
            query.where('order_item_id', '=', orderItemId);
            const result = await query.load(pool);
            if (!result) return null;
            return camelCase(result);
        },
        customer: async ({ userId},_,  { pool }) => {
            if (!userId) return null;
            const query = await select().from('customer');
            query.where('customer_id', '=', userId);
            const result = await query.load(pool);
            if (!result) return null;
            return camelCase(result);
        },
        rewardStatus: ({ rewardSent, rewardReceived, rewardExpiry }) => {
            const statusList = getConfig('mg_rewarding.round.customerRewardStatus', {});
            let curStatus = 'na'
            if(rewardReceived && rewardSent){
                curStatus = 'received'
            }else if(rewardSent){
                curStatus = 'sent'
            }else if(rewardExpiry){
                const { value } = rewardExpiry
                const expiry = DateTime.fromJSDate(new Date(value))
                if(DateTime.now() > expiry){
                    curStatus = 'expired';
                }       
            }
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
        isExpired: ({ rewardExpiry }) => {
            if(rewardExpiry){
                const { value } = rewardExpiry
                const expiry = DateTime.fromJSDate(new Date(value))
                if(DateTime.now() > expiry){
                    return true
                }       
            }
            return false;
        },
        isCompleted: ({ rewardSent, rewardReceived }) => rewardSent && rewardReceived,
        updateRewardStatusApi: ({roundId}) => buildUrl('updateCustomerRewardStatus',{id:roundId})
    },
    Query: {
        customerRewardHistory: async (_, { roundId }, { pool }) => {
            const customerRewardHistory = await select()
                .from('customer_reward_history')
                .where('round_id', '=', roundId).load(pool);

            if (!customerRewardHistory) {
                return {};
            }
            return camelCase(customerRewardHistory);
        }
    }
};
