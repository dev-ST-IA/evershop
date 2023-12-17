import PropTypes from 'prop-types';
import React from 'react';
import ProductListingCarousel from './ProductListingCarousel';

function FeaturedCollectionProducts({ collection }) {

  if (!collection) {
    return null;
  }
  return (
    <div className="pt-3">
      <div className="page-width">
        <h3 className="mt-3 mb-3 text-center uppercase h2 tracking-widest">
          {collection.name}
        </h3>
        <ProductListingCarousel products={[...collection.products.items,...collection.products.items].concat([...collection.products.items].reverse())} />
      </div>
    </div>
  );
}

FeaturedCollectionProducts.propTypes = {
  collection: PropTypes.shape({
    collectionId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    products: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          productId: PropTypes.number.isRequired,
          sku: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.shape({
            regular: PropTypes.shape({
              value: PropTypes.number.isRequired,
              text: PropTypes.string.isRequired
            }).isRequired,
            special: PropTypes.shape({
              value: PropTypes.number.isRequired,
              text: PropTypes.string.isRequired
            }).isRequired
          }).isRequired,
          image: PropTypes.shape({
            alt: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
          }),
          url: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default FeaturedCollectionProducts