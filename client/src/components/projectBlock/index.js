import React from 'react';
import { useHistory } from 'react-router-dom';

import './projectBlock.scss';

/**
 * 
 * @param {*} param0 
 * @returns project block hmtl section
 */
const ProjectBlock = ({ data }) => {
  let history = useHistory();

  const hexToRGB = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (opacity) {
      return `rgba(${r},${g},${b},${opacity})`;
    } else {
      return `rgba(${r},${g},${b})`;
    }
  };

  return (
    <div className="block-wrapper">
      <div
        className="project-border"
        style={{ backgroundColor: hexToRGB(data?.theme, 0.2) }}
        onClick={() => history.push(`/projects/${data?._id}`)}
      >
        <div>
          <div className="project-name-text">{data?.name}</div>
          <div className="project-description-text">
            {data?.description.length > 100
              ? data?.description?.substring(0, 100) + ' ...'
              : data?.description}
          </div>
        </div>
        <div>
          <div className="project-description-text">
            {data?.team.slice(0, 5).map((team) => (
              <img src={team.profilePic} alt="profile" />
            ))}
          </div>
          <div className="project-owner-details">
            <img src={data?.owner?.profilePic} alt={'profile'} />
            <div className="project-owner">
              {data?.owner?.firstName} {data?.owner?.lastName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBlock;
