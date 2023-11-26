/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@components/common/form/Button';
import { get } from '@evershop/evershop/src/lib/util/get';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mgconstants } from '../../../helpers/constants';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function RewardStatusAction({
  customerRewardHistory : { rewardStatus, updateRewardStatusApi, isCompleted, reminderSent }
}) {
  const [isLoading, setIsLoading] = useState(false);
  const currentCode = rewardStatus?.code?? 'na'

  const updateStatus = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { data: response } = await axios.patch(updateRewardStatusApi);
      toast.success('Reward status updated successfully!');
      window.location.reload();
    } catch (error) {
      console.log(error)
      toast.error(
        get(
          error,
          'response.data.error.message',
          'Something wrong. Please reload the page!'
        )
      );
    }
    setIsLoading(false);
  };

  const label = (currentStatus) =>{
    const current = currentStatus?? 'na'
    const statuses = mgconstants.customer_reward_history.status;
    switch(current){
      case statuses.NA:
        return 'Mark as Sent';
      case statuses.SENT:
        return 'Mark as Received';
      default:
        return 'Mark as Completed';
    }
  }

  return (
    !isCompleted && reminderSent &&(
      <div className="form-submit-button flex justify-center">
        <Button
          title={label(currentCode)}
          isLoading={isLoading}
          onAction={() => updateStatus()}
        />
      </div>
    )
  );
}

RewardStatusAction.propTypes = {
  customerRewardHistory: PropTypes.shape({
    updateRewardStatusApi: PropTypes.string,
    rewardStatus: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    isCompleted: PropTypes.bool,
    reminderSent: PropTypes.bool
  })
};

RewardStatusAction.defaultProps = {
  customerRewardHistory: {
    updateRewardStatusApi: '',
    rewardStatus: {
      code: 'na'
    },
    isCompleted: true,
    reminderSent: false
  }
};

export const layout = {
  areaId: 'rewardRoundViewWinnerActions',
  sortOrder: 10
};


export const query = `
  query Query {
    customerRewardHistory(roundId: getContextValue("roundId", null)) {
      updateRewardStatusApi
      isCompleted
      reminderSent
      rewardStatus {
        code
      }
    }
  }
`;
