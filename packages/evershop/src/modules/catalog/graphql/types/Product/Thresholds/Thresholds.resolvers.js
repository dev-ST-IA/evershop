const { getProductSalesQuery } = require("../../../../services/getProductSalesQuery");
const { getProductsBaseQuery } = require("../../../../services/getProductsBaseQuery");

module.exports = {
  Product: {
    thresholds: async (product, _, { pool }) => ({
      ...product,
      salesCount: async () => {
        const salesQuery = getProductSalesQuery(product.productId);
        const { coalesce } = await salesQuery.load(pool);
        if (!coalesce) return 0;
        return Number(coalesce);
      },
      inventoryLeft: async () => {
        const query = getProductsBaseQuery();
        query.where('product.product_id', '=', product.productId);
        query.andWhere('product.uuid', '=', product.uuid);
        query.limit(0,1);
        const { qty } = await query.load(pool);
        if (!qty) return 0;
        return Number(qty);
      },
      salesCountThres: parseInt(product.salesCountThres, 10),
      inventoryLeftThres: parseInt(product.inventoryLeftThres, 10),
      canShowSalesCount:  () => {
        const salesCountThres = product?.salesCountThres;
        const salesCount = product?.salesCount;
        return salesCount >= salesCountThres;
      },
      canShowInventoryLeftCount:  () => {
        const inventoryLeftThres = product?.inventoryLeftThres;
        const inventoryLeftCount = product?.inventoryLeftCount;
        return inventoryLeftCount <= inventoryLeftThres;
      }
    })
  }
};
