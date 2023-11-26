const { select } = require('@evershop/postgres-query-builder');
const { mgconstants } = require('../helpers/constants');

module.exports.getCompletedRewardRoundsBaseQuery = () => {
    const query = select().from('reward_round');
    query
        .leftJoin('reward_category')
        .on(
            'reward_round.category_id',
            '=',
            'reward_category.category_id'
        );

    query.andWhere('reward_round.round_status', '=', mgconstants.reward_rounds.status.COMPLETED)

    return query;
};
