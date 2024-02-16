import React from 'react';
import DeleteIcon from '../../assets/icons/delete-icon';
import './teamMemberBlock.scss';

/**
 * 
 * @param {*} param0 
 * @returns team member html section
 */
const TeamMemberBlock = ({ data, deleteHandler }) => {
  return (
    <div className="member-block">
      <div className="member-details">
        <div className="member-all-details">
          <img src={data?.profilePic} alt="profilePicture" />
          <div className="member-detail">
            <div className="member-name">
              {data?.firstName} {data?.lastName}
            </div>
          </div>
        </div>
        <div className="delete-icon" onClick={() => deleteHandler(data?._id)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberBlock;
