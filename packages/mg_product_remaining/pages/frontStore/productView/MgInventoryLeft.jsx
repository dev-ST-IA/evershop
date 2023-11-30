import PropTypes from 'prop-types';
import React from 'react';
import './MgInventoryLeft.scss';

export default function MgInventoryLeft({ product: { inventoryLeftThreshold : { inventoryLeft, inventoryLeftThres } } }) {
  if (!inventoryLeft || !inventoryLeftThres || inventoryLeft > inventoryLeftThres) return null;
  
  return (
    <div className="product-inventory-left">
      <div className="mg-sales-count">{inventoryLeft} Remaining!</div>
    </div>
  );
}

MgInventoryLeft.propTypes = {
  product: PropTypes.shape({
    inventoryLeftThreshold: PropTypes.shape({
      inventoryLeft:PropTypes.number,
      inventoryLeftThres: PropTypes.number
    })
  })
};

MgInventoryLeft.defaultProps = {
  product: {
    inventoryLeftThreshold: {
      inventoryLeft: 0,
      inventoryLeftThres: 100 
    }
  }
};

export const layout = {
  areaId: 'productViewGeneralInfo',
  sortOrder: 40
};

export const query = `
  query Query {
    product (id: getContextValue('productId')) {
      inventoryLeftThreshold{
        inventoryLeft
        inventoryLeftThres
      }
    }
  }`;
