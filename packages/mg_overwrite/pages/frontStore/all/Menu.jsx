import PropTypes from 'prop-types';
import React from 'react';
import './Menu.scss';
import MultiLevelCategoryDropdown from '../../../components/MultiLevelCategoryDropdown';

export default function Menu({ allMenu: { items } }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="menu-button w-1/6">
      <button className="menu-toggle-btn" type='button' onClick={handleToggleDropdown}>
        <span>Category </span>
        <span className="toggle-icon">
                  {isDropdownOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="toggle-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="toggle-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </span>
      </button>
      {isDropdownOpen && <MultiLevelCategoryDropdown categories={items} />}
    </div>
  );
}

Menu.propTypes = {
  allMenu: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        categoryId: PropTypes.string,
        parentId: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export const layout = {
  areaId: 'search-and-menu',
  sortOrder: 5
};


export const query = `
  query {
    allMenu {
      items {
        name
        url
        parentId
        categoryId
      }
    }
}`;