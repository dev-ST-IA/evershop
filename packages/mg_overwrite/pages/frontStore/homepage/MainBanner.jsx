/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Banner from '../../../components/Banner';
import './MainBanner.scss';

// eslint-disable-next-line react/prop-types
function CustomLeftArrow({ onClick }) {
  return (
    <div className="customArrowBtn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="customArrowIcon left"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function CustomRightArrow({ onClick }) {
  return (
    <div className="customArrowBtn" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="customArrowIcon right"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}
export default function MainBanner({ banners: { items } }) {
  // if(banners?.length < 1) return null

  return (
    <div className="banner-carousel-container">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        autoPlay
        centerMode={false}
        className=""
        containerClass="carousel"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 1
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {items.map((banner, index) => (
          <Banner key={index} {...banner} />
        ))}
      </Carousel>
    </div>
  );
}

MainBanner.propTypes = {
  banners: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.shape({
          path: PropTypes.string,
          url: PropTypes.string
        }),
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

MainBanner.defaultProps = {};

export const layout = {
  areaId: 'content',
  sortOrder: 1
};

export const query = `
  query query {
    banners {
      items {
        cmsBannerId
        uuid
        name
        description
        active
        image {
          path
          url
        }
      }
      total
    }
  }
`;
