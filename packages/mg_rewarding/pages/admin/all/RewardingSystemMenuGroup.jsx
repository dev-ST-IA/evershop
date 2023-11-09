import React from 'react';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';
import { GiftIcon, TagIcon } from '@heroicons/react/solid/esm/';
import PropTypes from 'prop-types';

export default function RewardingSystemMenuGroup({rewardingCategoryNew,rewardingSystemGrid}) {
  return (
    <NavigationItemGroup
      id="rewardingSystemMenuGroup"
      name="Rewarding System"
      items={[
        {
          Icon: GiftIcon,
          url: rewardingCategoryNew,
          title: 'New Reward Category'
        },
        {
          Icon: TagIcon,
          url: rewardingSystemGrid,
          title: 'Reward Categories'
        }
      ]}
    />
  );
}

RewardingSystemMenuGroup.propTypes = {
  rewardingCategoryNew: PropTypes.string.isRequired,
  rewardingSystemGrid: PropTypes.string.isRequired
};


export const layout = {
  areaId: 'adminMenu',
  sortOrder: 45
};

export const query = `
  query Query {
    rewardingCategoryNew: url(routeId:"rewardingCategoryNew")
    rewardingSystemGrid: url(routeId:"rewardingSystemGrid")
  }
`;
