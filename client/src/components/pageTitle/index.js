import React from 'react';
import './pageTitle.scss';

/**
 * 
 * @param {*} param0 
 * @returns page title html section
 */
const PageTitle = ({ title, ...props }) => {
  return (
    <div className="page-title" {...{ props }}>
      {title}
    </div>
  );
};

export default PageTitle;
