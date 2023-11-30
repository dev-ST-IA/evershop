const { select } = require('@evershop/postgres-query-builder');

module.exports.getProductSalesQuery = (productId) => {
    const query = select('COALESCE(SUM(order_item.qty), 0)').from('order_item');
    query
        .innerJoin('order')
        .on(
            'order_item.order_item_order_id',
            '=',
            '"order".order_id'
        );
    query
        .innerJoin('product')
        .on(
            'order_item.product_id',
            '=',
            'product.product_id'
        );
    query.where('"order".payment_status', '=', 'paid');
    query.andWhere('product.product_id','=',productId);
    query.limit(0,1);
    return query;
};
