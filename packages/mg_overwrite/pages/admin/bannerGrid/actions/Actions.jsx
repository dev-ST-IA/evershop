import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useAlertContext } from '@components/common/modal/Alert';

export default function BannerGridActions({ banners = [], selectedIds = []}) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
  
    const deleteBanners = async () => {
      setIsLoading(true);
      const promises = banners
      .filter((banner) => selectedIds.includes(banner.uuid))
      .map((banner) => axios.delete(banner.deleteApi));
      await Promise.all(promises);
      setIsLoading(false);
      // Refresh the page
      window.location.reload();
    };

  
    const actionsList = [
      {
        name: 'Delete',
        onAction: () => {
          openAlert({
            heading: `Delete ${selectedIds.length} banners`,
            content: <div>Can&apos;t be undone</div>,
            primaryAction: {
              title: 'Cancel',
              onAction: closeAlert,
              variant: 'primary'
            },
            secondaryAction: {
              title: 'Delete',
              onAction: async () => {
                await deleteBanners();
              },
              variant: 'critical',
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
  
  BannerGridActions.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    banners: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string.isRequired
      })
    ).isRequired
  };