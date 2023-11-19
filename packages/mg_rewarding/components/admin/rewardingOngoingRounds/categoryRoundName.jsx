import PropTypes from 'prop-types';
import React from 'react';

export default function CategoryRoundName({ rewardRound : {categoryName, viewRoundApi = ""} }) {
  return (
    <td>
      <div>
        <a className="hover:underline font-semibold" href={viewRoundApi}>
          {categoryName}
        </a>
      </div>
    </td>
  );
}

CategoryRoundName.propTypes = {
  rewardRound: PropTypes.shape({
    viewRoundApi: PropTypes.string,
    categoryName: PropTypes.string.isRequired
  }).isRequired
};
