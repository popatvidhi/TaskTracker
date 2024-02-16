import React from 'react';
import AddIcon from '../../assets/icons/add-icon';
import './addProjectBlock.scss';

/**
 * 
 * @param {Event} param0 
 * @returns dyanmic add project html page
 */
const AddProjectBlock = ({ addHandler }) => {
  return (
    <div className="block-wrapper">
      <div className="add-project-border" onClick={addHandler}>
        <AddIcon />
        <div className="add-text">Click to add a project.</div>
      </div>
    </div>
  );
};

export default AddProjectBlock;
