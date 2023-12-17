import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';
import { get } from '@evershop/evershop/src/lib/util/get';

export default function CMSQuickLinks({ cmsPage }) {
  return (
    <Card title="Quick Links">
      <Card.Session>
        <Field
          type="checkbox"
          name="show_in_footer"
          options={[
            { value: 0, text: 'Disabled' },
            { value: 1, text: 'Enabled' }
          ]}
          value={cmsPage?.showInFooter}
          isChecked ={parseInt(get(cmsPage, 'showInFooter'), 10) === 1}
          id="show_in_footer"
          label="Show In Footer"
        />
        <Field
          type="checkbox"
          name="show_in_header"
          options={[
            { value: 0, text: 'Disabled' },
            { value: 1, text: 'Enabled' }
          ]}
          value={cmsPage?.showInHeader}
          isChecked ={parseInt(get(cmsPage, 'showInHeader'), 10) === 1}
          id="show_in_header"
          label="Show In Header"
        />
        <Field
          type="checkbox"
          name="show_in_menu"
          options={[
            { value: 0, text: 'Disabled' },
            { value: 1, text: 'Enabled' }
          ]}
          value={cmsPage?.showInMenu}
          isChecked ={parseInt(get(cmsPage, 'showInMenu'), 10) === 1}
          id="show_in_menu"
          label="Show In User Menu"
        />
      </Card.Session>
    </Card>
  );
}

CMSQuickLinks.propTypes = {
  cmsPage: PropTypes.shape({
    showInFooter: PropTypes.number,
    showInHeader: PropTypes.number,
    showInMenu: PropTypes.number
  })
};

CMSQuickLinks.defaultProps = {
  cmsPage: null
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 100
};

export const query = `
  query Query {
    cmsPage(id: getContextValue("cmsPageId", null)) {
      showInFooter
      showInHeader
      showInMenu
    }
  }
`;
