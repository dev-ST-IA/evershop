import React from 'react';
import Area from '@components/common/Area';
import './ViewContent.scss';

export default function ViewContent() {
  return (
    <div className="grid grid-cols-3 gap-x-2 grid-flow-row ">
        <div className="col-span-2 grid grid-cols-1 gap-2 auto-rows-max">
          <Area id="roundView-leftSide" noOuter />
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-2 auto-rows-max">
          <Area id="roundView-rightSide" noOuter />
        </div>
      </div>
  );
}

ViewContent.propTypes = {
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

