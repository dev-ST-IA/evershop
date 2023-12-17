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
import StatusRow from '@components/common/grid/rows/StatusRow';
import BannerGridActions from './actions/Actions';
import NameRow from './NameRow';

export default function BannerGrid({
  banners: { items: banners, total, currentFilters = [] }
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
                    setSelectedRows(banners.map((c) => c.uuid));
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
                        title="Banner Name"
                        id="name"
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
                        title="Status"
                        currentFilters={currentFilters}
                        options={[
                          { value: 1, text: 'Enabled' },
                          { value: 0, text: 'Disabled' }
                        ]}
                      />
                    )
                  },
                  sortOrder: 25
                }
              ]}
            />
          </tr>
        </thead>
        <tbody>
          <BannerGridActions
            banners={banners}
            selectedIds={selectedRows}
          />
          {banners.map((c) => (
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
                      default: () => <NameRow id="name" row={c} />
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <StatusRow id="active" areaProps={areaProps} />
                      )
                    },
                    sortOrder: 25
                  }
                ]}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {banners.length === 0 && (
        <div className="flex w-full justify-center">
          There is no category to display
        </div>
      )}
      <Pagination total={total} limit={limit} page={page} />
    </Card>
  );
}

BannerGrid.propTypes = {
  banners: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.number.isRequired,
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        includeInNav: PropTypes.number.isRequired,
        editUrl: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired,
        path: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired
          })
        )
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
    banners (filters: $filters) {
      items {
        cmsBannerId
        uuid
        name
        active
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
  }
`;

export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
