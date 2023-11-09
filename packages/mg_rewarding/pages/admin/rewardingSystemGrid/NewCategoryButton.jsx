import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';

export default function NewCategoryButton({ newRewardCategoryUrl }) {
  return <Button url={newRewardCategoryUrl} title="New Reward Category" />;
}

NewCategoryButton.propTypes = {
  newRewardCategoryUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'pageHeadingRight',
  sortOrder: 10
};

export const query = `
  query Query {
    newRewardCategoryUrl: url(routeId: "rewardingCategoryNew")
  }
`;
