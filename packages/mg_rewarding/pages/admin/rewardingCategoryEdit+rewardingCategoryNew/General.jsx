import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';
import CkeditorField from '@components/common/form/fields/Ckeditor';

export default function General({
  rewardCategory
}) {
  return (
    <Card title="General">
      <Card.Session>
        <Area
          id="rewardCategoryEditGeneral"
          coreComponents={[
            {
              component: { default: Field },
              props: {
                id: 'category_name',
                name: 'category_name',
                label: 'Category Name',
                value: rewardCategory?.categoryName,
                validationRules: ['notEmpty'],
                type: 'text',
                placeholder: 'Category Name'
              },
              sortOrder: 10,
              id: 'category_name'
            },
            {
              component: { default: Field },
              props: {
                id: 'category_id',
                name: 'category_id',
                value: rewardCategory?.categoryId,
                type: 'hidden'
              },
              sortOrder: 10,
              id: 'category_id'
            },
            {
              component: { default: Field },
              props: {
                id: 'category_limit',
                name: 'category_limit',
                label: 'Category Limit',
                value: rewardCategory?.categoryLimit,
                validationRules: ['notEmpty','number','positiveNumber'],
                type: 'text',
                placeholder: 'Max quantity'
              },
              sortOrder: 10,
              id: 'category_limit'
            },
            {
              component: { default: Field },
              props: {
                id: 'auto_restart',
                name: 'auto_restart',
                label: 'Auto-Restart?',
                value: rewardCategory?.autoRestart,
                type: 'radio',
                options : [
                  { value: 0, text: 'No' },
                  { value: 1, text: 'Yes' }
                ]
              },
              sortOrder: 10,
              id: 'auto_restart'
            },
            {
              component: { default: Field },
              props: {
                id: 'active',
                name: 'active',
                label: 'Active',
                value: rewardCategory?.active,
                type: 'radio',
                options : [
                  { value: 0, text: 'No' },
                  { value: 1, text: 'Yes' }
                ]
              },
              sortOrder: 10,
              id: 'active'
            },
            {
              component: { default: CkeditorField },
              props: {
                id: 'reward_details',
                name: 'reward_details',
                label: 'Reward Details',
                value: rewardCategory?.rewardDetails
              },
              sortOrder: 30,
              id: 'reward_details'
            }
          ]}
        />
      </Card.Session>
    </Card>
  );
}

General.propTypes = {
  rewardCategory: PropTypes.shape({
    rewardDetails: PropTypes.string,
    categoryName: PropTypes.string,
    categoryId: PropTypes.string,
    categoryLimit: PropTypes.string,
    autoRestart: PropTypes.bool,
    active: PropTypes.bool
  })
};

General.defaultProps = {
  rewardCategory: undefined
};

export const layout = {
  areaId: 'rc-leftSide',
  sortOrder: 10
};

export const query = `
  query Query {
    rewardCategory(id: getContextValue("categoryId", null)) {
      categoryId
      categoryName
      categoryLimit
      rewardDetails
      active
      autoRestart
    }
  }
`;
