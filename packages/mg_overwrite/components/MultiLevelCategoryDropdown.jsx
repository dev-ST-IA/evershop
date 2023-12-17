import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MultiLevelCategoryDropdown.scss';

function MultiLevelCategoryDropdown({ categories }) {
  const [categoryHierarchy, setCategoryHierarchy] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    // Process flat category data into a hierarchical structure
    const buildCategoryHierarchy = (flatCategories, parentId = null) =>
      flatCategories
        .filter((category) => category.parentId === parentId)
        .map((category) => ({
          ...category,
          subcategories: buildCategoryHierarchy(
            flatCategories,
            category.categoryId
          )
        }));

    const hierarchy = buildCategoryHierarchy(categories);
    setCategoryHierarchy(hierarchy);
  }, [categories]);

  const isCategoryExpanded = (categoryId) =>
    expandedCategories.includes(categoryId);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });

    // Add/remove the 'visible' class based on whether there are expanded subcategories
    const hasExpandedSubcategories = categoryHierarchy
      .find((category) => category.categoryId === categoryId)
      ?.subcategories.some((subCategory) =>
        isCategoryExpanded(subCategory.categoryId)
      );

    const navElement = document.querySelector('.nav');
    if (navElement) {
      if (hasExpandedSubcategories) {
        navElement.classList.add('visible');
      } else {
        navElement.classList.remove('visible');
      }
    }
  };

  const renderCategories = (categoryList) =>
    categoryList.map((category, index) => (
      <>
        <li key={index} className="nav-item">
          <a href={category.url} className="nav-link">
            {category.name}
          </a>
          {category.subcategories.length > 0 && (
            <div
              className={`subcategories ${
                isCategoryExpanded(category.categoryId)
                  ? 'expanded'
                  : 'collapsed'
              }`}
            >
              <a
                className="toggle-btn"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleCategory(category.categoryId);
                }}
              >
                <span className="toggle-icon">
                  {isCategoryExpanded(category.categoryId) ? (
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
              </a>
            </div>
          )}
        </li>
        {isCategoryExpanded(category.categoryId) &&
          renderCategories(category.subcategories)}
      </>
    ));

  return (
    <div className="category-component">
      <ul className="nav justify-content-center">
        {renderCategories(categoryHierarchy)}
      </ul>
    </div>
  );
}

MultiLevelCategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      parentId: PropTypes.string
    })
  ).isRequired
};

export default MultiLevelCategoryDropdown;
