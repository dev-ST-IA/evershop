import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function Inventory({ product }) {
  const inventory = product?.thresholds || {};
  return (
    <Card title="Inventory Threshold" subdued>
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
      <Card.Session>
        <Field
          id="inventoryLeftThres"
          name="inventoryLeftThres"
          value={inventory.inventoryLeftThres}
          placeholder="Maximum Inventory Remaining To Display"
          label="Max Inventory Remaining To Display"
          type="text"
          validationRules={['notEmpty','number','positiveNumber']}
        />
      </Card.Session>
    </Card>
  );
}

Inventory.propTypes = {
  product: PropTypes.shape({
    thresholds: PropTypes.shape({
      salesCountThres: PropTypes.number,
      inventoryLeftThres: PropTypes.number
    })
  })
};

Inventory.defaultProps = {
  product: {
    thresholds: {
      salesCountThres: 10,
      inventoryLeftThres: 50
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
      thresholds {
        salesCountThres
        inventoryLeftThres
      }
    }
  }
`;
