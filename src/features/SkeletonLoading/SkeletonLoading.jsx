import React from 'react';
import './SkeletonLoading.css'; // Import your CSS file for styling

const SkeletonLoading = () => {
  return (
    <div className="skeleton-loading">
      
      <div className="skeleton-loading__content">
        <div className="skeleton-loading__title"></div>
        <div className="skeleton-loading__text"></div>
        <div className="skeleton-loading__text"></div>
        <div className="skeleton-loading__text"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
