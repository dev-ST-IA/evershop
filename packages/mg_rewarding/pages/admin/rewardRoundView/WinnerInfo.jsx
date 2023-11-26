/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from '@components/admin/cms/Card';
import Area from '@components/common/Area';
import { Input } from '@components/common/form/fields/Input';
import { Hidden } from '@components/common/form/fields/Hidden';
import StatusComponent from '../../../components/admin/rewardRoundView/statusBadge';
import WinnerAddress from '../../../components/admin/rewardRoundView/winnerAddress';

export default function Winner({ rewardRound, customerRewardHistory }) {
  return (
    <Card title="Winner Details" subdued>
      <Card.Session>
        <Area
          id="rewardRoundViewWinnerInfo"
          coreComponents={[
            {
              component: { default: StatusComponent },
              props: {
                id: 'round_winner_status',
                name: 'round_winner_status',
                label: 'Status',
                validationRules: ['notEmpty'],
                type: 'text',
                disabled: true,
                status: rewardRound?.winnerSelected
              },
              sortOrder: 5,
              id: 'round_winner_status'
            },
            {
              component: {
                default:
                  customerRewardHistory?.customer?.fullName ? Input:Hidden
              },
              props: {
                id: 'round_winner_name',
                name: 'round_winner_name',
                value: customerRewardHistory?.customer?.fullName,
                label: 'Name',
                type: 'text',
                disabled: true
              },
              sortOrder: 5,
              id: 'round_winner_name'
            },
            {
              component: {
                default: customerRewardHistory?.customer?.email  ? Input:Hidden
              },
              props: {
                id: 'round_winner_email',
                name: 'round_winner_email',
                label: 'Email',
                value: customerRewardHistory?.customer?.email,
                validationRules: ['notEmpty', 'email'],
                type: 'text',
                disabled: true
              },
              sortOrder: 5,
              id: 'round_winner_email'
            },
            {
              component: {
                default:  customerRewardHistory?.order? WinnerAddress:Hidden
              },
              props: {
                id: 'round_winner_bill_address',
                name: 'round_winner_bill_address',
                title: 'Billing Address',
                address: customerRewardHistory?.order?.billingAddress,
                disabled: true
              },
              sortOrder: 5,
              id: 'round_winner_bill_address'
            },
            {
              component: {
                default: customerRewardHistory?.order? WinnerAddress:Hidden
              },
              props: {
                id: 'round_winner_ship_address',
                name: 'round_winner_ship_address',
                title: 'Shipping Address',
                address: customerRewardHistory?.order?.shippingAddress,
                disabled: true
              },
              sortOrder: 5,
              id: 'round_winner_ship_address'
            },
            {
              component: { default: StatusComponent },
              props: {
                id: 'round_reward_status',
                name: 'round_reward_status',
                label: 'Reward Status',
                type: 'text',
                disabled: true,
                status: customerRewardHistory?.rewardStatus
              },
              sortOrder: 5,
              id: 'round_winner_status'
            },
            {
              component: {
                default:
                  customerRewardHistory?.remindersCount ? Input:Hidden
              },
              props: {
                id: 'round_reward_reminder_count',
                name: 'round_reward_reminder_count',
                value: customerRewardHistory?.remindersCount,
                label: 'Customer Reminders Left',
                type: 'text',
                disabled: true
              },
              sortOrder: 5,
              id: 'round_reward_reminder_count'
            },
            {
              component: {
                default:
                  customerRewardHistory?.rewardExpiry?.text? Input:Hidden
              },
              props: {
                id: 'round_reward_expiry',
                name: 'round_reward_expiry',
                value: customerRewardHistory?.rewardExpiry?.text,
                label: 'Reward Expiry',
                type: 'text',
                disabled: true
              },
              sortOrder: 5,
              id: 'round_reward_expiry'
            }
          ]}
        />
      </Card.Session>
      <Card.Session>
        <Area id="rewardRoundViewWinnerActions" />
      </Card.Session>
    </Card>
  );
}

Winner.propTypes = {
  customerRewardHistory: PropTypes.shape({
    customer: PropTypes.shape({
      customerId: PropTypes.string,
      fullName: PropTypes.string,
      email: PropTypes.string
    }),
    orderItem: PropTypes.shape({
      orderItemId: PropTypes.string,
      total: PropTypes.shape({
        text: PropTypes.string
      }),
      productName: PropTypes.string,
      qty: PropTypes.string
    }),
    order: PropTypes.shape({
      billingAddress: PropTypes.shape({
        address1: PropTypes.string,
        address2: PropTypes.string,
        country: PropTypes.shape({
          name: PropTypes.string,
          code: PropTypes.string,
          provinces: PropTypes.instanceOf(Array)
        }),
        province: PropTypes.string,
        city: PropTypes.string,
        telephone: PropTypes.string
      }),
      shippingAddress: PropTypes.shape({
        address1: PropTypes.string,
        address2: PropTypes.string,
        country: PropTypes.shape({
          name: PropTypes.string,
          code: PropTypes.string,
          provinces: PropTypes.instanceOf(Array)
        }),
        province: PropTypes.string,
        city: PropTypes.string,
        telephone: PropTypes.string
      }),
      orderId: PropTypes.string
    }),
    rewardStatus: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      badge: PropTypes.string,
      progress: PropTypes.string
    }),
    remindersCount: PropTypes.number,
    rewardExpiry: PropTypes.shape({
      text: PropTypes.string
    }),
    rewardDetails: PropTypes.string,
    orderId: PropTypes.string,
    orderItemId: PropTypes.string
  }),
  rewardRound: PropTypes.shape({
    winnerSelected: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      badge: PropTypes.string,
      progress: PropTypes.string
    }),
    winner: PropTypes.shape({
      customerId: PropTypes.string,
      fullName: PropTypes.string,
      email: PropTypes.string
    })
  })
};

Winner.defaultProps = {
  customerRewardHistory: {
    customer: {
      customerId: '',
      fullName: '',
      email: ''
    },
    orderItem: {
      orderItemId: '',
      total: {
        text: ''
      },
      productName: '',
      qty: ''
    },
    order: {
      billingAddress: {
        address1: '',
        address2: '',
        country: '',
        province: '',
        city: '',
        telephone: ''
      },
      shippingAddress: {
        address1: '',
        address2: '',
        country: '',
        province: '',
        city: '',
        telephone: ''
      },
      orderId: ''
    },
    rewardStatus: {
      title: 'Unknown',
      code: 'unselected',
      badge: 'default',
      progress: 'incomplete'
    },
    remindersCount: 0,
    rewardExpiry: {
      text: ''
    },
    rewardDetails: '',
    orderId: '',
    orderItemId: ''
  },
  rewardRound: {
    winnerSelected: {
      title: 'Unknown',
      code: 'unselected',
      badge: 'default',
      progress: 'incomplete'
    }
  }
};

export const layout = {
  areaId: 'roundView-rightSide',
  sortOrder: 16
};

export const query = `
  query Query {
    rewardRound(id: getContextValue("roundId", null)) {
      roundId
      uuid
      winnerSelected {
        title
        value: code
        badge
        progress
      }
      selectWinnerApi
      winner{
        customerId
        fullName
        email
      }
    },
    customerRewardHistory(roundId: getContextValue("roundId", null)) {
      historyId
      uuid
      customer{
        customerId
        fullName
        email
      }
      order {
        billingAddress {
          address1
          address2
          country {
            name
            code
            provinces{
              name
              code
              countryCode
            }
          }
          province{
            name
            code
            countryCode
          }
          city
          telephone
        }
        shippingAddress {
          address1
          address2
          country {
            name
            code
            provinces{
              name
              code
              countryCode
            }
          }
          province{
            name
            code
            countryCode
          }
          city
          telephone
        }
        orderId
      }
      orderItem {
        orderItemId
        total {
          text
        }
        productName
        qty
      }
      round {
        roundId
        uuid
        winnerSelected {
          title
          value: code
          badge
          progress
        }
        selectWinnerApi
      }
      rewardStatus {
        title
        value: code
        badge
        progress
      }
      remindersCount
      rewardExpiry{
        text
      }
      rewardDetails
      orderId
      orderItemId
    }
  }
`;
