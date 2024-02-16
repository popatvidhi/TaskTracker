import React from 'react';
import { CloseModalIcon } from '../../assets/icons/close-modal-icon';
import './modalWrapper.scss';

/**
 * 
 * @param {*} param0 
 * @returns modal html page
 */
const ModalWrapper = ({ children, onCancelHandler }) => {
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <div className="modal-close-button" onClick={onCancelHandler}>
          <CloseModalIcon />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
