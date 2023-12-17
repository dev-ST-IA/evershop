import React from 'react';
import Area from '@components/common/Area';

export default function SearchBoxAndMenu() {
  return <div className='flex flex-row w-full gap-0 justify-center'>
    <Area id="search-and-menu" noOuter coreComponents={[]} />
  </div>;
}

export const layout = {
  areaId: 'header-2',
  sortOrder: 5
};