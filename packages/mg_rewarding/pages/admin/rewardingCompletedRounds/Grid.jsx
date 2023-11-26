/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Area from '@components/common/Area';
import Pagination from '@components/common/grid/Pagination';
import { Checkbox } from '@components/common/form/fields/Checkbox';
import { Card } from '@components/admin/cms/Card';
import BasicColumnHeader from '@components/common/grid/headers/Basic';
import BasicRow from '@components/common/grid/rows/BasicRow';
import FromToColumnHeader from '@components/common/grid/headers/FromTo';
import DummyColumnHeader from '@components/common/grid/headers/Dummy';
import DropdownColumnHeader from '@components/common/grid/headers/Dropdown';
import CategoryRoundName from '../../../components/admin/rewardingOngoingRounds/categoryRoundName';
import RoundWinnerSelected from '../../../components/admin/rewardingCompletedRounds/rewardRoundBadge';
import RewardRoundIdRow from '../../../components/admin/rewardingCompletedRounds/rewardRoundIdRow';


export default function CategoryGrid({
  rewardRoundsCompleted: { items: rounds, total, currentFilters = [] }
}) {
  const page = currentFilters.find((filter) => filter.key === 'page')
    ? currentFilters.find((filter) => filter.key === 'page').value
    : 1;
  const limit = currentFilters.find((filter) => filter.key === 'limit')
    ? currentFilters.find((filter) => filter.key === 'limit').value
    : 20;
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <Card>
      <table className="listing sticky">
        <thead>
          <tr>
            <th className="align-bottom">
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(rounds.map((c) => c.uuid));
                  } else {
                    setSelectedRows([]);
                  }
                }}
              />
            </th>
            <Area
              className=""
              id="categoryGridHeader"
              noOuter
              coreComponents={[
                {
                  component: {
                    default: () => (
                      <DummyColumnHeader
                        title="Round Id"
                        id="round_id"
                      />
                    )
                  },
                  sortOrder: 10
                },
                {
                  component: {
                    default: () => (
                      <BasicColumnHeader
                        title="Reward Category Name"
                        id="category_name"
                        currentFilters={currentFilters}
                      />
                    )
                  },
                  sortOrder: 10
                },
                {
                  component: {
                    default: () => (
                      <BasicColumnHeader
                        id="category_limit"
                        title="Category Limit"
                        currentFilters={currentFilters}
                      />
                    )
                  },
                  sortOrder: 30
                },
                {
                  component: {
                    default: () => (
                      <BasicColumnHeader
                        id="current_completed_quantity"
                        title="Quantity Completed"
                        currentFilters={currentFilters}
                      />
                    )
                  },
                  sortOrder: 30
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => (
                      <FromToColumnHeader
                        title="State Date"
                        id="round_start_date_time"
                        currentFilter={currentFilters.find(
                          (f) => f.key === 'round_start_date_time'
                        )}
                      />
                    )
                  },
                  sortOrder: 30
                },
                {
                  // eslint-disable-next-line react/no-unstable-nested-components
                  component: {
                    default: () => (
                      <FromToColumnHeader
                        title="End Date"
                        id="round_end_date_time"
                        currentFilter={currentFilters.find(
                          (f) => f.key === 'round_end_date_time'
                        )}
                      />
                    )
                  },
                  sortOrder: 30
                },
                {
                  component: {
                    default: () => (
                      <DropdownColumnHeader
                        id="winner_status"
                        title="Winner Status"
                        currentFilters={currentFilters}
                        options={[
                          { value: 1, text: 'Selected' },
                          { value: 0, text: 'Not Selected' }
                        ]}
                      />
                    )
                  },
                  sortOrder: 30
                }
              ]}
            />
          </tr>
        </thead>
        <tbody>
          {rounds.map((c) => (
            <tr key={c.categoryId}>
              <td style={{ width: '2rem' }}>
                <Checkbox
                  isChecked={selectedRows.includes(c.uuid)}
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelectedRows(selectedRows.concat([c.uuid]));
                    else
                      setSelectedRows(selectedRows.filter((r) => r !== c.uuid));
                  }}
                />
              </td>
              <Area
                className=""
                id="roundCategoryGridRow"
                row={c}
                noOuter
                coreComponents={[
                  {
                    component: {
                      default: () => (
                        <RewardRoundIdRow id="roundId" url={c.viewRoundApi} name={c.roundId}/>
                      )
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: () => <CategoryRoundName id="categoryName" rewardRound={c?.category} />
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <BasicRow id="categoryLimit" areaProps={areaProps} />
                      )
                    },
                    sortOrder: 30
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <BasicRow id="currentCompletedQuantity" areaProps={areaProps} />
                      )
                    },
                    sortOrder: 30
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <BasicRow id="roundStartDateTime" areaProps={areaProps} />
                      )
                    },
                    sortOrder: 30
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <BasicRow id="roundEndDateTime" areaProps={areaProps} />
                      )
                    },
                    sortOrder: 30
                  },
                  {
                    component: {
                      default: () => (
                        <RoundWinnerSelected id="winner_selected" status={c?.winnerSelected} />
                      )
                    },
                    sortOrder: 30
                  }
                  
                ]}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {rounds.length === 0 && (
        <div className="flex w-full justify-center">
          There are no on-going rewarding rounds to display
        </div>
      )}
      <Pagination total={total} limit={limit} page={page} />
    </Card>
  );
}

CategoryGrid.propTypes = {
  rewardRoundsCompleted: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        roundID: PropTypes.number.isRequired,
        uuid: PropTypes.string.isRequired,
        rewardDetails: PropTypes.string,
        category: PropTypes.shape({
          categoryName: PropTypes.string.isRequired
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
        deleteApi: PropTypes.string.isRequired,
        viewRoundApi: PropTypes.string.isRequired,
        selectWinnerApi: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    currentFilters: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        operation: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 20
};

export const query = `
  query Query($filters: [FilterInput]) {
    rewardRoundsCompleted (filters: $filters) {
      items {
        roundId
        uuid
        category {
          categoryName
        }
        roundStatus
        roundStartDateTime
        roundEndDateTime
        currentCompletedQuantity
        categoryLimit
        winner {
          fullName
        }
        winnerSelectionDateTime
        winnerSelected {
          title
          value: code
          badge
          progress
        }
        isOngoing
        isCompleted
        viewRoundApi
        selectWinnerApi
        deleteApi
        updateApi
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }
`;

export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
