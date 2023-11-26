import PropTypes from 'prop-types';
import React from 'react';
import ProgressBar from '../../../components/frontStore/productView/ProgressBar';

export default function RewardRoundInfo({ ongoingRewardRoundByCategory }) {

  return (
    ongoingRewardRoundByCategory?.category?.categoryName && (
      <div>
        <h4 className='reward-category-heading'>Category: <span className='reward-category-name'>{ongoingRewardRoundByCategory?.category?.categoryName}</span></h4>
        <ProgressBar
          value={ongoingRewardRoundByCategory.currentCompletedQuantity}
          limit={ongoingRewardRoundByCategory.categoryLimit}
        />
      </div>
    )
  );
}

RewardRoundInfo.propTypes = {
  ongoingRewardRoundByCategory: PropTypes.shape({
    category: PropTypes.shape({
      categoryName: PropTypes.string
    }),
    roundStatus: PropTypes.string,
    currentCompletedQuantity: PropTypes.number,
    categoryLimit: PropTypes.number
  })
};

RewardRoundInfo.defaultProps = {
  ongoingRewardRoundByCategory: null
};

export const layout = {
  areaId: 'productViewGeneralInfo',
  sortOrder: 25
};

export const query = `
    query Query{
      ongoingRewardRoundByCategory( categoryId : getContextValue("rewardCategoryId")){
        category{
          categoryName
        }
        roundStatus
        currentCompletedQuantity
        categoryLimit
        isOngoing
        isCompleted
      }
    }
  `;
