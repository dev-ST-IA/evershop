import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function InventoryLeftThreshold({ product }) {
  const inventory = product?.inventoryLeftThreshold || {};
  return (
    <Card title="Inventory Left Threshold" subdued>
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

InventoryLeftThreshold.propTypes = {
  product: PropTypes.shape({
    inventoryLeftThreshold: PropTypes.shape({
      inventoryLeftThres: PropTypes.number
    })
  })
};

InventoryLeftThreshold.defaultProps = {
  product: {
    inventoryLeftThreshold: {
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
      inventoryLeftThreshold {
        inventoryLeftThres
      }
    }
  }
`;
