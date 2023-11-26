/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { Card } from '@components/admin/cms/Card';
import { Input } from '@components/common/form/fields/Input';

export default function General({ rewardRound }) {

  return (
    <Card title="General">
      <Card.Session>
        <Area
          id="rewardRoundViewGeneral"
          coreComponents={[
            {
              component: { default: Input },
              props: {
                id: 'category_name',
                name: 'category_name',
                label: 'Category Name',
                value: rewardRound?.category?.categoryName,
                validationRules: ['notEmpty'],
                type: 'text',
                disabled: true,
                placeholder: 'Category Name'
              },
              sortOrder: 10,
              id: 'category_name'
            },
            {
              component: { default: Input },
              props: {
                id: 'current_completed_quantity',
                name: 'current_completed_quantity',
                value: rewardRound?.currentCompletedQuantity,
                label: 'Completed Quantity',
                type: 'text',
                disabled:true
              },
              sortOrder: 10,
              id: 'current_completed_quantity'
            },
            {
              component: { default: Input },
              props: {
                id: 'category_limit',
                name: 'category_limit',
                label: 'Category Limit',
                value: rewardRound?.categoryLimit,
                validationRules: ['notEmpty', 'number', 'positiveNumber'],
                type: 'text',
                disabled: true,
                placeholder: 'Max quantity'
              },
              sortOrder: 10,
              id: 'category_limit'
            },
            {
              component: { default: Input },
              props: {
                id: 'reward_details',
                name: 'reward_details',
                label: 'Reward Details',
                value: rewardRound?.category?.rewardDetails,
                disabled:true
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
  rewardRound: PropTypes.shape({
    roundID: PropTypes.number.isRequired,
    uuid: PropTypes.string.isRequired,
    category: PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
      rewardDetails: PropTypes.string
    }),
    winner: PropTypes.shape({
      fullName: PropTypes.string
    }),
    categoryLimit: PropTypes.string,
    currentCompletedQuantity: PropTypes.string,
    roundStatus: PropTypes.string,
    roundStartDateTime: PropTypes.string,
    roundEndDateTime: PropTypes.string,
    isOngoing: PropTypes.bool,
    isCompleted: PropTypes.bool,
    selectWinnerApi: PropTypes.string.isRequired
  })
};

General.defaultProps = {
  rewardRound: undefined
};

export const layout = {
  areaId: 'roundView-leftSide',
  sortOrder: 10
};

export const query = `
  query Query {
    rewardRound(id: getContextValue("roundId", null)) {
      roundId
      uuid
      category {
        categoryName
        rewardDetails
      }
      roundStatus
      roundStartDateTime
      roundEndDateTime
      currentCompletedQuantity
      categoryLimit
      selectWinnerApi
    }
  }
`;
