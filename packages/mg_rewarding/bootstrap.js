const config = require('config');

module.exports = () => {
  // Default order status and carriers configuration
  const rewardConfig = {
    round: {
      winnerSelected: {
        unselected: {
          title: 'Not Selected',
          badge: 'default',
          progress: 'incomplete',
          isDefault: true
        },
        selected: {
          title: 'Selected',
          badge: 'success',
          progress: 'complete'
        }
      },
      roundStatus: {
        ongoing: {
          title: 'On Going',
          badge: 'default',
          progress: 'incomplete',
          isDefault: true
        },
        completed: {
          title: 'Completed',
          badge: 'success',
          progress: 'complete'
        }
      },
      customerRewardStatus: {
        na: {
          title: 'Not Initiated',
          badge: 'critical',
          progress: 'critical',
          isDefault: true
        },
        sent: {
          title: 'Reward Sent',
          badge: 'attention',
          progress: 'attention'
        },
        received: {
          title: 'Reward Received',
          badge: 'success',
          progress: 'complete'
        },
        expired: {
          title: 'Expired',
          badge: 'critical',
          progress: 'expired'
        }
      }
    }
  };
  config.util.setModuleDefaults('mg_rewarding', rewardConfig);
};
