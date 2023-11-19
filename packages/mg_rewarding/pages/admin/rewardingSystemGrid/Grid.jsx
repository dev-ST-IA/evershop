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
import DropdownColumnHeader from '@components/common/grid/headers/Dropdown';
import BasicRow from '@components/common/grid/rows/BasicRow';
import RewardCategoryNameRow from '../../../components/admin/rewardingSystemGrid/rewardCategoryName';
import RewardCategoryActive from '../../../components/admin/rewardingSystemGrid/rewardCategoryActive';
import RewardingSystemGridActions from './actions/Actions.jsx'

export default function CategoryGrid({
  rewardCategories: { items: categories, total, currentFilters = [] },
  createRewardRoundsApi
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
                    setSelectedRows(categories.map((c) => c.uuid));
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
                      <DropdownColumnHeader
                        id="active"
                        title="Active"
                        currentFilters={currentFilters}
                        options={[
                          { value: 1, text: 'Active' },
                          { value: 0, text: 'Inactive' }
                        ]}
                      />
                    )
                  },
                  sortOrder: 25
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
                }
              ]}
            />
          </tr>
        </thead>
        <tbody>
          <RewardingSystemGridActions
            rewardCategories={categories}
            selectedIds={selectedRows}
            setSelectedRows={setSelectedRows}
            actions={{createRewardRoundsApi}}
          />
          {categories.map((c) => (
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
                id="categoryGridRow"
                row={c}
                noOuter
                coreComponents={[
                  {
                    component: {
                      default: () => <RewardCategoryNameRow id="categoryName" rewardCategory={c} />
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: () => (
                        <RewardCategoryActive id="active" rewardCategory={c} />
                      )
                    },
                    sortOrder: 25
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <BasicRow id="categoryLimit" areaProps={areaProps} />
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
      {categories.length === 0 && (
        <div className="flex w-full justify-center">
          There is no category to display
        </div>
      )}
      <Pagination total={total} limit={limit} page={page} />
    </Card>
  );
}

CategoryGrid.propTypes = {
  rewardCategories: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.number.isRequired,
        uuid: PropTypes.string.isRequired,
        rewardDetails: PropTypes.string,
        categoryName: PropTypes.string,
        categoryLimit: PropTypes.string,
        autoRestart: PropTypes.bool,
        active: PropTypes.bool,
        editUrl: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired
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
  }).isRequired,
  createRewardRoundsApi : PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 20
};

export const query = `
  query Query($filters: [FilterInput]) {
    rewardCategories (filters: $filters) {
      items {
        categoryId
        categoryName
        categoryLimit
        rewardDetails
        active
        autoRestart
        uuid
        editUrl
        deleteApi
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
    createRewardRoundsApi : url(routeId : "createRewardRounds")
  }
`;

export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
