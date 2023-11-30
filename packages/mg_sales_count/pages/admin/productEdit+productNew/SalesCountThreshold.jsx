import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function SalesCountThreshold({ product }) {
  const inventory = product?.saleCountThreshold || {};
  return (
    <Card title="Sales Count Threshold" subdued>
      <Card.Session>
        <Field
          id="salesCountThres"
          name="salesCountThres"
          value={inventory.salesCountThres}
          placeholder="Minimum Sales Count To Display"
          label="Min Sales Count To Display"
          type="text"
          validationRules={['notEmpty','number', 'positiveNumber']}
        />
      </Card.Session>
    </Card>
  );
}

SalesCountThreshold.propTypes = {
  product: PropTypes.shape({
    saleCountThreshold: PropTypes.shape({
      salesCountThres: PropTypes.number
    })
  })
};

SalesCountThreshold.defaultProps = {
  product: {
    saleCountThreshold: {
      salesCountThres: 10
    }
  }
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 16
};

export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      saleCountThreshold {
        salesCountThres
      }
    }
  }
`;
