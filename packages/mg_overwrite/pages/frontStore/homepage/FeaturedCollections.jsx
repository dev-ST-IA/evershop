import PropTypes from 'prop-types';
import React from 'react';
import FeaturedCollectionProducts from '../../../components/FeaturedCollectionProducts';

export default function FeaturedCollections({ featuredCollections : { items} }) {
    if (!items) {
        return null;
    }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    items?.map((item, index) => <FeaturedCollectionProducts collection={item} key={index} id={item.collectionId+index} /> )
  );
}

FeaturedCollections.propTypes = {
  featuredCollections: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    )
  }).isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 15
};

export const query = `
  query query {
    featuredCollections {
      items {
        collectionId
        name
        products (filters: [{key: "limit", operation: "=", value: "4"}]) {
            items {
            productId
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
            image {
                alt
                url: listing
            }
            url
            }
        }
      }
    }
  }
`;