/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import Badge from '@components/common/Badge';
import './winnerStatus.scss'

export default function Status({ status, label, ...props }) {
  return (
    <div className='winner-status-container' {...props}>
      <span className='winner-status-label'>{label}</span>
      <Badge
        title={status.title}
        variant={status.badge}
        progress={status.progress}
      />
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.shape({
    title: PropTypes.string,
    badge: PropTypes.string,
    progress: PropTypes.string
  }),
  label: PropTypes.string
};

Status.defaultProps = {
  status: {
    title: 'Unknown',
    badge: 'default',
    progress: 'incomplete'
  },
  label: 'Status'
};
