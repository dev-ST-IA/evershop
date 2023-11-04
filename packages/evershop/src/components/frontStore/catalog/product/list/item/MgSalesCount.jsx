// MgSalesCount.js
import React from 'react';
import PropTypes from 'prop-types';
import './MgSalesCount.scss';

function MgSalesCount({ salesCount, salesCountThres }) {
  const formatSalesCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };
  
  if(salesCount < salesCountThres) return null;
  return (
    <div className="mg-sales-count">{formatSalesCount(salesCount)} sold</div>
  );
}

MgSalesCount.propTypes = {
  salesCount: PropTypes.number,
  salesCountThres: PropTypes.number
};

MgSalesCount.defaultProps = {
  salesCount: 0,
  salesCountThres: 10
};

export { MgSalesCount };
