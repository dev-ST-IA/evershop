import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function BannerEditPageHeading({ backUrl, banner }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={banner ? `Editing ${banner.name}` : 'Create A New banner'}
    />
  );
}

BannerEditPageHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  banner: PropTypes.shape({
    name: PropTypes.string
  })
};

BannerEditPageHeading.defaultProps = {
  banner: {}
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    banner(id: getContextValue("cmsBannerId", null)) {
      name
    }
    backUrl: url(routeId: "bannerGrid")
  }
`;
