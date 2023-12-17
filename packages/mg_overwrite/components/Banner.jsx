import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';


// eslint-disable-next-line no-unused-vars
export default function Banner({ image : { url }, description }) {
  return (
    <div
      className={`main-banner-home flex items-center'}`}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}

Banner.propTypes = {
  image: PropTypes.shape({
    path:PropTypes.string,
    url:PropTypes.string
  }).isRequired,
  description: PropTypes.string.isRequired
};

Banner.defaultProps = {
};
