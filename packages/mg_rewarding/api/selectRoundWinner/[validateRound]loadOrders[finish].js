const { select } = require('@evershop/postgres-query-builder');
const {
    INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');

module.exports = async (request, response, delegate, next) => {
    const connection = await delegate.getConnection;
    const round_id = request.params.id;
    const totalCount = request.reward_round.totalOrdersCount;

    const randomLimit = getRandomLimit(totalCount);

    const order_round_mapping_query = select().from('order_round_mapping');
    order_round_mapping_query.leftJoin('order_item').on('order_round_mapping.order_item_id', '=', 'order_item.order_item_id');
    order_round_mapping_query.where('order_round_mapping.round_id', '=', round_id).andWhere('order_round_mapping.active', '=', '1');
    order_round_mapping_query.orderBy('order_item.qty');
    order_round_mapping_query.limit(0, randomLimit);
    const order_round_mappings = await order_round_mapping_query.execute(connection);

    if (!order_round_mappings) {
        const errorRes = {}
        errorRes.status = INTERNAL_SERVER_ERROR;
        errorRes.message = 'Cannot select winner';
        response.status(INTERNAL_SERVER_ERROR);
        response.json({ error: errorRes })
        throw new Error(errorRes.message);
    }

    request.order_round_mappings = order_round_mappings;

    return next();
};

const getRandomLimit = (totalCount) => {
    let limit = totalCount;
    let tally = 0;
    while (limit > (totalCount * 0.2)
        && limit > 100 && tally < 100) {
        const ran = Math.random();
        limit = Math.floor(limit * ran);
        tally += 1;
    }
    if (limit < 100)
        limit = 100;

    return limit;
}
