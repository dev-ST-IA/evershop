import PropTypes from 'prop-types';
import React from 'react';

export default function RewardCategoryNameRow({ name, url }) {
  return (
    <td>
      <div>
        <a className="hover:underline font-semibold" href={url}>
          {name}
        </a>
      </div>
    </td>
  );
}

RewardCategoryNameRow.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired.isRequired
};
