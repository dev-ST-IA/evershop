import PropTypes from 'prop-types';
import React from 'react';
import Badge from '@components/common/Badge';

export default function RoundWinnerSelected({ status }) {
  return (
    <td>
      <Badge
        title={status.title}
        variant={status.badge}
        progress={status.progress}
      />
    </td>
  );
}

RoundWinnerSelected.propTypes = {
  status: PropTypes.shape({
    title: PropTypes.string,
    badge: PropTypes.string,
    progress: PropTypes.string
  })
};

RoundWinnerSelected.defaultProps = {
  status: {
    title: 'Unknown',
    badge: 'default',
    progress: 'incomplete'
  }
};
