import React from 'react';
import Area from '@components/common/Area';
import LoadingBar from '@components/common/LoadingBar';
import './Layout.scss';
import './tailwind.scss';
import Logo from './Logo';

export default function Layout() {
  return (
    <>
      <LoadingBar />
      <div className="header-2 flex justify-between">
        <Area
          id="header-2"
          noOuter
          coreComponents={[
            {
              component: { default: Area },
              props: {
                id: 'icon-wrapper',
                className: 'icon-wrapper flex justify-between space-x-1'
              },
              sortOrder: 20
            }
          ]}
        />
      </div>
      {/* <div className="header flex justify-center">
        <Area
          id="header"
          noOuter
          coreComponents={[]}
        />
      </div> */}
      <main className="content">
        <Area id="content" className="" noOuter />
      </main>
      <div className="footer">
        <div className="footer-2 flex items-center mb-2">
          <div className="logo-container flex-none">
            <Logo
              themeConfig={{
                  logo: { width: '80rem', height: '80rem', src:'./logo/logo_bg_black.png' }
                }
              }
            />
          </div>
          <div className="footer-quick-links flex justify-center self-start gap-1 ml-8 flex-wrap">
            <Area id="footer-quick-links" noOuter coreComponents={[]} />
          </div>
        </div>
        <Area id="footer" noOuter coreComponents={[]} />
      </div>
    </>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 1
};