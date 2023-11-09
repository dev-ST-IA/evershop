import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form';
import { get } from '@evershop/evershop/src/lib/util/get';

export default function RewardingCategoryEditForm({ action }) {
  const id = 'rewardCategoryForm';
  return (
    <Form
      method="PATCH"
      action={action}
      dataFilter={(formData) => {
        if (formData.tax_class === '') {
          // eslint-disable-next-line no-param-reassign
          formData.tax_class = null;
        }
        return formData;
      }}
      onError={() => {
        toast.error('Something wrong. Please reload the page!');
      }}
      onSuccess={(response) => {
        if (response.error) {
          toast.error(
            get(
              response,
              'error.message',
              'Something wrong. Please reload the page!'
            )
          );
        } else {
          toast.success('Product saved successfully!');
        }
      }}
      submitBtn={false}
      id={id}
    >
      <Area id={id} noOuter />
    </Form>
  );
}

RewardingCategoryEditForm.propTypes = {
  action: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    action: url(routeId: "updateRewardCategory", params: [{key: "id", value: getContextValue("categoryUuid")}]),
    gridUrl: url(routeId: "rewardingSystemGrid")
  }
`;
