import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';

export default function NewBannerButton({ newBannerUrl }) {
  return <Button url={newBannerUrl} title="New Banner" />;
}

NewBannerButton.propTypes = {
  newBannerUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'pageHeadingRight',
  sortOrder: 10
};

export const query = `
  query Query {
    newBannerUrl: url(routeId: "bannerNew")
  }
`;
