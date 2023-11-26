import React, { useState } from 'react';
import Button from '@components/common/form/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { get } from '@evershop/evershop/src/lib/util/get';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function SelectWinner({ rewardRound: {selectWinnerApi, isWinnerSelected} }) {
  const [isLoading, setIsLoading] = useState(false);

  const selectWinnerAction = async () => {
    setIsLoading(true)
    try {
      // eslint-disable-next-line no-unused-vars
      const {data:response} = await axios.post(selectWinnerApi);
      toast.success("Rewarding Round/s started successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(
        get(
          error,
          "response.data.error.message",
          "Something wrong. Please reload the page!"
        )
      );
    }
    setIsLoading(false);
  }

  return (
    !isWinnerSelected && (
      <div className="form-submit-button flex justify-center">
        <Button title="Select Winner" 
          isLoading={isLoading}
          onAction={()=>selectWinnerAction()}
        />
      </div>
    )
  );
}

SelectWinner.propTypes = {
  rewardRound: PropTypes.shape({
    selectWinnerApi: PropTypes.string,
    isWinnerSelected: PropTypes.bool
  })
};

SelectWinner.defaultProps = {
  rewardRound:{
    selectWinnerApi: "",
    isWinnerSelected: false
  }
};

export const layout = {
  areaId: "rewardRoundViewWinnerActions",
  sortOrder: 10
};

export const query = `
  query Query {
    rewardRound(id: getContextValue("roundId", null)) {
      selectWinnerApi
      isWinnerSelected
    }
  }
`;
