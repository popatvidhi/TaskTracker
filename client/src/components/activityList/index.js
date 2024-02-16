import React, { Fragment } from 'react';
import moment from 'moment';

import './activityList.scss';

/**
 *
 * @returns dynamic activity html page
 */
const ActivityList = ({ logsData }) => {
  return (
    <div className="activity-list">
      {logsData &&
        logsData.slice(0, 10).map((item, index) => (
          <Fragment key={'activity-list ' + index}>
            <div className="activity-item">
              <div className="activity-details">
                <img src={item?.updatedBy?.profilePic} alt="icon" />
                <div className="activity-detail">
                  <div className="activity-project-name">{item?.project?.name.slice(0, 50)}</div>
                  <div className="activity-project-details">
                    <b>
                      {item?.updatedBy?.firstName} {item?.updatedBy?.lastName}
                    </b>{' '}
                    moved {item?.task?.name.slice(0, 50)} to <b>{item?.task?.status}</b>.
                  </div>
                </div>
              </div>
              <div className="activity-time">{moment(item?.udpatedAt).fromNow()}</div>
            </div>
            <div className="activity-divider" />
          </Fragment>
        ))}
    </div>
  );
};

export default ActivityList;
