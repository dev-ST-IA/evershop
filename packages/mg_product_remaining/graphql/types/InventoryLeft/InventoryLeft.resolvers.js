const { getProductsBaseQuery } = require("@evershop/evershop/src/modules/catalog/services/getProductsBaseQuery");

module.exports = {
  Product: {
    inventoryLeftThreshold: async (product, _, { pool }) => ({
      ...product,
      inventoryLeft: async () => {
        const query = getProductsBaseQuery();
        query.where('product.product_id', '=', product.productId);
        query.andWhere('product.uuid', '=', product.uuid);
        query.limit(0,1);
        const { qty } = await query.load(pool);
        if (!qty) return 0;
        return Number(qty);
      },
      inventoryLeftThres: parseInt(product.inventoryLeftThres, 10),
      canShowInventoryLeftCount:  () => {
        const inventoryLeftThres = product?.inventoryLeftThres;
        const inventoryLeftCount = product?.inventoryLeftCount;
        return inventoryLeftCount <= inventoryLeftThres;
      }
    })
  }
};
