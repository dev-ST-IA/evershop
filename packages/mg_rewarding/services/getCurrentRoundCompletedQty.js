const { select } = require('@evershop/postgres-query-builder');

module.exports.getCurrentRoundCompletedQty = (roundId) => {
    const query = select("SUM(order_item.qty)").from('order_round_mapping');
    query.innerJoin('order_item').on('order_round_mapping.order_item_id', '=', 'order_item.order_item_id');
    query.where('order_round_mapping.round_id', '=', roundId);
    query.andWhere('order_round_mapping.active', '=', '1');

    return query;
};
