/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

function FooterLink({ name, url }) {
  return (
    <a href={url} className="flex-1 text-center text-textSubdued">
      <span>{name}</span>
    </a>
  );
}

FooterLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

FooterLink.defaultProps = {
  url: ''
};

export default function FooterQuickLinks({ cmsFooterLinks}) {
  return (
    <div className="footer__default">
      <div className="page-width flex justify-center gap-2">
        {cmsFooterLinks.map(e => <FooterLink {...e} />)}
      </div>
    </div>
  );
}

FooterQuickLinks.propTypes = {
    cmsFooterLinks: PropTypes.arrayOf(
        PropTypes.shape({
            name:PropTypes.string,
            url:PropTypes.string
        })
    )
};

FooterQuickLinks.defaultProps = {
    cmsFooterLinks: []
}

export const layout = {
  areaId: 'footer-quick-links',
  sortOrder: 10
};
export const query = `
  query query {
    cmsFooterLinks {
      name
      url
    }
  }
`;