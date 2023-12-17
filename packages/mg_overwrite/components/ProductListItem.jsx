/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Name } from '@components/frontStore/catalog/product/list/item/Name';
import { Thumbnail } from '@components/frontStore/catalog/product/list/item/Thumbnail';
import { Price } from '@components/frontStore/catalog/product/list/item/Price';
import Area from '@components/common/Area';
import { get } from '@evershop/evershop/src/lib/util/get';
import './ProductListItem.scss'

export default function ProductListItem({ product }) {
  return (
    <Area
    id="productListingItem"
    className="featured-listing-item"
    product={product}
    coreComponents={[
      {
        component: { default: Thumbnail },
        props: { url: product?.url, imageUrl: get(product, 'image.url'), alt: product?.name },
        sortOrder: 10,
        id: 'thumbnail'
      },
      {
        component: { default: Name },
        props: { name: product.name, url: product?.url, id: product?.productId },
        sortOrder: 20,
        id: 'name'
      },
      {
        component: { default: Price },
        props: { ...product?.price },
        sortOrder: 30,
        id: 'price'
      }
    ]}
  />
  );
}

ProductListItem.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired
};
