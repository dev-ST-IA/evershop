const { getProductSalesQuery } = require("../../../services/getProductSalesQuery");

module.exports = {
  Product: {
    saleCountThreshold: async (product, _, { pool }) => ({
      ...product,
      salesCount: async () => {
        const salesQuery = getProductSalesQuery(product.productId);
        const { coalesce } = await salesQuery.load(pool);
        if (!coalesce) return 0;
        return Number(coalesce);
      },
      salesCountThres: parseInt(product.salesCountThres, 10),
      canShowSalesCount:  () => {
        const salesCountThres = product?.salesCountThres;
        const salesCount = product?.salesCount;
        return salesCount >= salesCountThres;
      }
    })
  }
};
