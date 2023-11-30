import React from 'react';
import PropTypes from 'prop-types';
import './MgSalesCount.scss'

export default function MgSalesCount({ areaProps : { product: { saleCountThreshold: { salesCount, salesCountThres } } }}) {

  const formatSalesCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  if(!salesCount || !salesCountThres){
    return null
  }
  
  if(salesCount < salesCountThres) return null;
  return (
    <div className="mg-sales-count">{formatSalesCount(salesCount)} sold</div>
  );
}

MgSalesCount.propTypes = {
    areaProps: PropTypes.shape({
      product: PropTypes.shape({
        saleCountThreshold: PropTypes.shape({
            salesCount: PropTypes.number,
            salesCountThres: PropTypes.number
          })
        })
      })  
};

MgSalesCount.defaultProps = {
  areaProps: {
    product: {
      saleCountThreshold: {
          salesCount: 0,
          salesCountThres: 10
        }
      }
    }
};

export const layout = {
  areaId: 'productListingItem',
  sortOrder: 40
};

export const fragments = `
  fragment Product on Product {
    saleCountThreshold{
      salesCount
      salesCountThres
    }
  }
`;



