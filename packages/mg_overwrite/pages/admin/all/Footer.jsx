import React from 'react';
import PropTypes from 'prop-types';

function Footer({ themeConfig: { copyRight } }) {
  return (
    <div className="footer__default">
      <div className="page-width grid grid-cols-1 md:grid-cols-2 gap-2 justify-between">
        <div className="self-center">
          <div className="copyright text-center md:text-right text-textSubdued">
            <span>{copyRight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  themeConfig: PropTypes.shape({
    copyRight: PropTypes.string
  })
};

Footer.defaultProps = {
  themeConfig: {
    copyRight: '© 2023 MG Store Sri Lanka. All Rights Reserved.'
  }
};

export default Footer;

export const layout = {
  areaId: 'footer',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
