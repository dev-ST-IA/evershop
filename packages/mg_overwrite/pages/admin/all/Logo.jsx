import React from 'react';
import PropTypes from 'prop-types';
import './Logo.scss';

export default function Logo({
  themeConfig: {
    logo: { src, alt = 'Evershop'}
  },
  dashboardUrl
}) {
  return (
    <div className="logo">
      {src && (
        <a href={dashboardUrl} className="logo-icon">
          <img src={src} alt={alt} width={40} height={40} />
          <span className="font-bold">MG STORE</span>
        </a>
      )}
    </div>
  );
}

Logo.propTypes = {
  themeConfig: PropTypes.shape({
    logo: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    })
  }),
  dashboardUrl: PropTypes.string.isRequired
};

Logo.defaultProps = {
  themeConfig: {
    logo: {
      src: '',
      alt: 'MG Store LK',
      width: '128',
      height: '146'
    }
  }
};

export const layout = {
  areaId: 'header',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      logo {
        src
        alt
        width
        height
      }
    }
    dashboardUrl: url(routeId:"dashboard")
  }
`;
