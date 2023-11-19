const { select } = require('@evershop/postgres-query-builder');

module.exports.getOrderRewardBaseQuery = (orderId, roundStatus) => {
    const query = select("*").from('order_item');
    query.innerJoin('product').on('product.product_id', '=', 'order_item.product_id');
    query.innerJoin('reward_category').on('reward_category.category_id', '=', 'product.reward_category_id');
    query.innerJoin('reward_round').on('reward_round.category_id', '=', 'reward_category.category_id');
    query.where('order_item.order_item_order_id', '=', orderId);
    query.andWhere('reward_round.round_status', '=', roundStatus);

    return query;
};
