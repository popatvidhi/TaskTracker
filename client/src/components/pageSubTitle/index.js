import React from 'react';
import './pageSubTitle.scss';

/**
 * 
 * @param {*} param0 
 * @returns page subtitle html section
 */
const PageSubTitleTitle = ({ title, ...props }) => {
  return (
    <div className="page-subtitle" {...{ props }}>
      {title}
    </div>
  );
};

export default PageSubTitleTitle;
