/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';

const getRewardCategory = (categories = [], categoryId = null) => 
  categories.find(
    (category) => parseInt(category.categoryId, 10) === parseInt(categoryId, 10)
  ) || null;

export default function RewardingCategoryOptions({
  product,
  rewardCategories: { items }
}) {
  const categoryId = product?.rewardCategory?.categoryId || undefined;
  const [category, setCategory] = React.useState(
    getRewardCategory(items, categoryId) || {}
  );

  const handleCategoryChange = (e) => {
    setCategory(getRewardCategory(items, e.target.value));
  };

  return (
    <div>
      <Field
        name="reward_category_id"
        value={category?.categoryId?? null}
        onChange={(e) => handleCategoryChange(e)}
        options={(() =>
            items.map((g) => ({
                value: parseInt(g.categoryId, 10),
                text: g.categoryName
              }))
          )()}
        type="select"
        label="Reward Category"
        disableDefaultOption={false}
      />
    </div>
  );
}

RewardingCategoryOptions.propTypes = {
  rewardCategories: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.number,
        categoryName: PropTypes.string
      })
    )
  }),
  product: PropTypes.shape({
    rewardCategory : PropTypes.shape({
        categoryId: PropTypes.number
    })
  })
};

RewardingCategoryOptions.defaultProps = {
  rewardCategories: {},
  product: {}
};

export const layout = {
  areaId: 'productEditGeneral',
  sortOrder: 23
};

export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
        rewardCategory{
            categoryName
            categoryId
        }
    },
    rewardCategories {
      items {
        categoryName
        categoryId
      }
    }
  }
`;
