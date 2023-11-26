const { select } = require('@evershop/postgres-query-builder');
const {
    INVALID_PAYLOAD,
    UNPROCESSABLE_ENTITY
} = require('@evershop/evershop/src/lib/util/httpStatus');

module.exports = async (request, response, delegate,next) => {
    const connection = await delegate.getConnection;
    const round = await select()
        .from('reward_round')
        .where('round_id', '=', parseInt(request.params.id,10))
        .andWhere('reward_round.winner_id', 'IS NULL', '')
        .load(connection);

    const errorRes = {}
    if (!round) {
        response.status(INVALID_PAYLOAD);
        errorRes.message = 'Invalid round id'
        errorRes.status = INVALID_PAYLOAD;
        response.json({error:errorRes})
        throw new Error(errorRes.message);
    }

    const { count } = await select('COUNT(mapping_id)').from('order_round_mapping')
        .where('round_id', '=', round.round_id)
        .andWhere('active', '=', '1')
        .load(connection);

    if (!count || count <= 0) {
        errorRes.status = UNPROCESSABLE_ENTITY;
        errorRes.message = 'Not enough orders to select winner';
        response.status(errorRes.status);
        response.json({error:errorRes})
        throw new Error(errorRes.message);
    }
    request.reward_round = round;
    request.reward_round.totalOrdersCount = count;

    return next();
};
