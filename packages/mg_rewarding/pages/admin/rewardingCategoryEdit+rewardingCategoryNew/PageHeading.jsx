import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function RewardCategoryEditPageHeading({ backUrl, rewardCategory }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={rewardCategory ? `Editing ${rewardCategory.categoryName}` : 'Create A New Rewarding Category'}
    />
  );
}

RewardCategoryEditPageHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  rewardCategory: PropTypes.shape({
    categoryName: PropTypes.string.isRequired
  })
};

RewardCategoryEditPageHeading.defaultProps = {
  rewardCategory: null
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    rewardCategory(id: getContextValue("categoryId", null)) {
      categoryName
    }
    backUrl: url(routeId: "rewardingSystemGrid")
  }
`;
