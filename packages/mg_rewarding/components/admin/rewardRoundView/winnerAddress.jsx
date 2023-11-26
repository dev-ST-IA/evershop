/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { AddressSummary } from '@components/common/customer/address/AddressSummary';
import { Card } from '@components/admin/cms/Card';

export default function WinnerAddress({ title, ...props }) {
  
  return (
    <Card.Session title={title}>
        <AddressSummary {...props}/>
    </Card.Session>
  );
}

WinnerAddress.propTypes = {
    title: PropTypes.string
};

WinnerAddress.defaultProps = {
    title: ''
};
