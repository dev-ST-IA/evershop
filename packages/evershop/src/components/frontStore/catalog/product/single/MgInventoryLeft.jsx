import PropTypes from 'prop-types';
import React from 'react';

function MgInventoryLeft({ inventoryLeft, inventoryLeftThres }) {
  if (inventoryLeft > inventoryLeftThres) return null;

  return (
    <div className="product-inventory-left">
      <div className="mg-sales-count">{inventoryLeft} Remaining!</div>
    </div>
  );
}

MgInventoryLeft.propTypes = {
    inventoryLeft: PropTypes.number,
    inventoryLeftThres: PropTypes.number
};

MgInventoryLeft.defaultProps = {
  inventoryLeft: 0,
  inventoryLeftThres: 0
};

export { MgInventoryLeft };
