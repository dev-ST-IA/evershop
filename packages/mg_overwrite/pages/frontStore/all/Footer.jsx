import React from 'react';
import PropTypes from 'prop-types';

function Footer({ themeConfig: { copyRight } }) {
  return (
    <div className="footer__default">
      <div className="page-width flex justify-center">
        <div className="flex-1 text-center text-textSubdued">
          <span>{copyRight}</span>
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
export default Footer;