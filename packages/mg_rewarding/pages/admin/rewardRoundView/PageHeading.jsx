import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function RoundViewPageHeading({ backUrl, rewardRound }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={rewardRound? `${rewardRound?.roundId} - ${rewardRound?.category?.categoryName} - Round Details` : 'Rewarding Round Details'}
    />
  );
}

RoundViewPageHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  rewardRound: PropTypes.shape({
    category: PropTypes.shape({
      categoryName: PropTypes.string.isRequired
    }),
    roundId: PropTypes.string.isRequired
  })
};

RoundViewPageHeading.defaultProps = {
  rewardRound: null
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    rewardRound(id: getContextValue("roundId", null)) {
      roundId
      category {
        categoryName
      }
    }
    backUrl: url(routeId: "rewardingCompletedRounds")
  }
`;
