/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from '@evershop/evershop/src/lib/util/get';
import { Field } from '@components/common/form/Field';

export default function ShowInHompage({
  collection
}) {
  const fields = [
    {
      component: { default: Field },
      props: {
        id: 'show_in_homepage',
        name: 'show_in_homepage',
        label: 'Show In Hompage',
        value: collection?.showInHomepage??0,
        type: 'checkbox',
        isChecked: parseInt(get(collection, 'showInHomepage'), 10) === 1
      },
      sortOrder: 101,
      id: 'show_in_homepage'
    }
  ].map((f) => {
    if (get(collection, `${f.props.id}`) !== undefined) {
      // eslint-disable-next-line no-param-reassign
      f.props.value = get(collection, `${f.props.id}`);
    }
    return <f.component.default  {...f.props} />;
  });

  return (
    fields
  );
}

ShowInHompage.propTypes = {
  collection: PropTypes.shape({
    showInHomepage: PropTypes.string
  })
};

ShowInHompage.defaultProps = {
  collection: {}
};

export const layout = {
  areaId: 'collectionEditGeneral',
  sortOrder: 100
};

export const query = `
  query Query {
    collection(code: getContextValue("collectionCode", null)) {
      collectionId
      showInHomepage
    }
  }
`;
