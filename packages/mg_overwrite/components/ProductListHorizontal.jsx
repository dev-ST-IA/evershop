/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import './ProductListHorizontal.scss'
import ProductListItem from './ProductListItem';

export default function ProductListHorizontal({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="product-list" >
        <div className="text-center">{_('There is no product to display')}</div>
      </div>
    );
  }

  return (
      products.map((p,i) => (
        <ProductListItem product={p} key={i} />
      ))
  );
}

ProductListHorizontal.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sku: PropTypes.string,
      productId: PropTypes.number,
      url: PropTypes.string,
      price: PropTypes.shape({
        regular: PropTypes.shape({
          value: PropTypes.number,
          text: PropTypes.string
        }),
        special: PropTypes.shape({
          value: PropTypes.number,
          text: PropTypes.string
        })
      }),
      image: PropTypes.shape({
        alt: PropTypes.string,
        listing: PropTypes.string
      })
    })
  ).isRequired
};
