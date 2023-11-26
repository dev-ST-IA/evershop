import PropTypes from 'prop-types';
import React from 'react';

export default function RewardRoundIdRow({ name, url }) {
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

RewardRoundIdRow.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired.isRequired
};
