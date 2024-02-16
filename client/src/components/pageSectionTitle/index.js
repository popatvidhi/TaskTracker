import React from 'react';
import './pageSectionTitle.scss';

/**
 * 
 * @param {*} param0 
 * @returns page section tiile html section
 */
const PageSectionTitle = ({ title, ...props }) => {
  return (
    <div className="page-section-title" {...{ props }}>
      {title}
    </div>
  );
};

export default PageSectionTitle;
