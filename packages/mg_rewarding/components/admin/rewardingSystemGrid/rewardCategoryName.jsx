import PropTypes from 'prop-types';
import React from 'react';

export default function RewardCategoryNameRow({ rewardCategory }) {
  return (
    <td>
      <div>
        <a className="hover:underline font-semibold" href={rewardCategory.editUrl}>
          {rewardCategory.categoryName}
        </a>
      </div>
    </td>
  );
}

RewardCategoryNameRow.propTypes = {
    rewardCategory: PropTypes.shape({
    editUrl: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired
  }).isRequired
};
