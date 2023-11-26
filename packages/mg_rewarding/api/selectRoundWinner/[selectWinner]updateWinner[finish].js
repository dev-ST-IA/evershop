const { select, insert, update,
    rollback } = require('@evershop/postgres-query-builder');
const {
    INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');

module.exports = async (request, response, delegate) => {
    const connection = await delegate.getConnection;
    const round_id = request.params.id;
    const { selectedOrderRound, reward_round } = request;

    try {
        const orderId = selectedOrderRound.order_item_order_id;
        const order = await select().from('order').where('order_id', '=', orderId).load(connection);

        const customer_reward_history = buildUserRewardsHistory(reward_round, order, selectedOrderRound);

        const customer_reward_history_response = await insert('customer_reward_history').given({ ...customer_reward_history }).execute(connection);

        const updated_reward_round = await update('reward_round')
            .given({ winner_id: order.customer_id, winner_selection_date_time: 'NOW()' })
            .where('round_id', '=', round_id)
            .execute(connection);

        const update_round_history = await insert('reward_round_history')
            .given({
                round_id,
                description: 'Winner Selected'
            }).execute(connection);

        if (customer_reward_history_response && updated_reward_round && update_round_history) {
            // eslint-disable-next-line no-param-reassign
            request = {
                ...request,
                user_rewards_history: customer_reward_history_response,
                reward_round: updated_reward_round,
                reward_round_history: update_round_history
            }
            return {
                user_rewards_history: customer_reward_history_response,
                reward_round: updated_reward_round,
                reward_round_history: update_round_history
            };
        } else {
            throw new Error(INTERNAL_SERVER_ERROR);
        }

    } catch (error) {
        rollback(connection);
        const errorRes = {}
        errorRes.status = INTERNAL_SERVER_ERROR;
        errorRes.message = 'Cannot select winner';
        response.status(INTERNAL_SERVER_ERROR);
        response.json({ error: errorRes })
        throw new Error(errorRes.message);
    }
};

const buildUserRewardsHistory = (rewardRound, order, orderRound) => ({
    round_id: rewardRound.round_id,
    order_id: order.order_id,
    order_item_id: orderRound.order_item_id,
    user_id: order.customer_id,
    reward_details: rewardRound.reward_details
})

