import PropTypes from 'prop-types';
import React from 'react';
import Dot from '@components/common/Dot';

export default function RewardCategoryActive({ rewardCategory: { active } }) {
  return (
    <td>
      <div className="flex justify-center">
        {!active && <Dot variant="critical" size="1.2rem" />}
        {active && <Dot variant="success" size="1.2rem" />}
      </div>
    </td>
  );
}

RewardCategoryActive.propTypes = {
  rewardCategory: PropTypes.shape({
    active: PropTypes.bool.isRequired
  }).isRequired
};
