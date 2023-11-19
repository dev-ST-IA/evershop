import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useAlertContext } from '@components/common/modal/Alert';
import { toast } from 'react-toastify';
import { get } from '@evershop/evershop/src/lib/util/get';

export default function RewardingSystemGridActions({ rewardCategories = [], selectedIds = [], actions}) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
  
    const deleteCategories = async () => {
      setIsLoading(true);
      const promises = rewardCategories
      .filter((category) => selectedIds.includes(category.uuid))
      .map((category) => axios.delete(category.deleteApi));
      await Promise.all(promises);
      setIsLoading(false);
      // Refresh the page
      window.location.reload();
    };

    const startRounds = async () => {
      setIsLoading(true)
      const parsedIds = rewardCategories
      .filter(category => selectedIds.includes(category.uuid))
      .map(c => parseInt(c.categoryId,10))
      try {
        const {data:response} = await axios.post(actions.createRewardRoundsApi,{selectedIds:parsedIds});
        // eslint-disable-next-line no-console
        toast.success('Rewarding Round/s started successfully!');
        // Wait for 2 seconds to show the success message
        setTimeout(() => {
          // Redirect to the edit page
          const editUrl = response?.data?.links?.find(
            (link) => link.rel === 'rewardingOngoingRounds'
          ).href;
          window.location.href = editUrl;
        }, 1500);
      } catch (error) {
        toast.error(
          get(
            error,
            'response.data.error.message',
            'Something wrong. Please reload the page!'
          )
        );
      }
      setIsLoading(false);
    }
  
    const actionsList = [
      {
        name: 'Delete',
        onAction: () => {
          openAlert({
            heading: `Delete ${selectedIds.length} categories`,
            content: <div>Can&apos;t be undone</div>,
            primaryAction: {
              title: 'Cancel',
              onAction: closeAlert,
              variant: 'primary'
            },
            secondaryAction: {
              title: 'Delete',
              onAction: async () => {
                await deleteCategories();
              },
              variant: 'critical',
              isLoading
            }
          });
        }
      },
      {
        name: `Start Reward Round${selectedIds.length>1? 's':''}`,
        onAction: () => {
          openAlert({
            heading: `Start Reward Round${selectedIds.length>1? 's':''}`,
            content: <div>Are you sure to start rewarding round{`${selectedIds.length>1? 's':''}`}?</div>,
            primaryAction: {
              title: 'Cancel',
              onAction: closeAlert,
              variant: 'critical'
            },
            secondaryAction: {
              title: 'Start',
              onAction: async () => {
                await startRounds();
              },
              variant: 'primary',
              isLoading
            }
          });
        }
      }
    ];
    
    return (
      <tr>
        {selectedIds.length === 0 && null}
        {selectedIds.length > 0 && (
          <td style={{ borderTop: 0 }} colSpan="100">
            <div className="inline-flex border border-divider rounded justify-items-start">
              <a href="#" className="font-semibold pt-075 pb-075 pl-15 pr-15">
                {selectedIds.length} selected
              </a>
              {actionsList.map((action, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    action.onAction();
                  }}
                  className="font-semibold pt-075 pb-075 pl-15 pr-15 block border-l border-divider self-center"
                >
                  <span>{action.name}</span>
                </a>
              ))}
            </div>
          </td>
        )}
      </tr>
    );
  }
  
  RewardingSystemGridActions.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    rewardCategories: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string.isRequired
      })
    ).isRequired,
    actions : PropTypes.shape({
      createRewardRoundsApi : PropTypes.string
    }).isRequired
  };