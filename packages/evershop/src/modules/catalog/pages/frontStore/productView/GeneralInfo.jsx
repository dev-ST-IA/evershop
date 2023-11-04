import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import './GeneralInfo.scss';
import { Name } from '@components/frontStore/catalog/product/single/Name';
import { Price } from '@components/frontStore/catalog/product/single/Price';
import { Sku } from '@components/frontStore/catalog/product/single/Sku';
import { MgInventoryLeft } from '@components/frontStore/catalog/product/single/MgInventoryLeft';

export default function GeneralInfo({ product }) {
  return (
    <Area
      id="productViewGeneralInfo"
      className="flex flex-col gap-1"
      coreComponents={[
        {
          component: { default: Name },
          props: {
            name: product.name
          },
          sortOrder: 10,
          id: 'productSingleName'
        },
        {
          component: { default: Price },
          props: {
            regular: product.price.regular,
            special: product.price.special
          },
          sortOrder: 10,
          id: 'productSinglePrice'
        },
        {
          component: { default: Sku },
          props: {
            sku: product.sku
          },
          sortOrder: 20,
          id: 'productSingleSku'
        },
        {
          component: {default: MgInventoryLeft},
          props: {
            inventoryLeft: product.thresholds.inventoryLeft,
            inventoryLeftThres: product.thresholds.inventoryLeftThres
          },
          sortOrder: 100,
          id: 'productSingleInventoryLeft'
        }
      ]}
    />
  );
}

GeneralInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    price: PropTypes.shape({
      regular: PropTypes.shape({
        value: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
      }),
      special: PropTypes.shape({
        value: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
      })
    }),
    thresholds: PropTypes.shape({
      inventoryLeft:PropTypes.number,
      inventoryLeftThres: PropTypes.number
    })
  }).isRequired
};

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 10
};

export const query = `
  query Query {
    product (id: getContextValue('productId')) {
      name
      sku
      price {
        regular {
          value
          text
        }
        special {
          value
          text
        }
      }
      thresholds{
        inventoryLeft
        inventoryLeftThres
      }
    }
  }`;
