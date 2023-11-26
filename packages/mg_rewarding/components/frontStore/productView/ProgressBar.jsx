import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.scss';

export default function ProgressBar({ value, limit }) {
  
  const getProgress = () => {
    if (!value || !limit) return 0;
    if (value >= limit) return 100;
    const progress = Math.floor(Number(value / limit) * 100);
    return progress;
  };
  const getColor = () => {
    if (getProgress() >= 70) {
      return 'red'; 
    }
    return 'green'; 
  };

  const getIntensity = () => {
    if (getProgress() >= 70) {
      return 'high'; 
    }
    return 'normal'; 
  };

  const getWidth = () =>{
    const currentProgress = getProgress()
    if(currentProgress > 0 && currentProgress < 10){
      return 10
    }
    return currentProgress
  }

  return (
    <div className={`progress-bar ${getColor()} ${getIntensity()}`}>
      <div className="fill" style={{ width: `${getWidth()}%` }} >
        <span className="percentage">{`${getProgress()}%`}</span>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  limit: PropTypes.number
};

ProgressBar.defaultProps = {
  value: 0,
  limit: 0
};
