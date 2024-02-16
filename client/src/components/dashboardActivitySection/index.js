import React from 'react';
import ActivityList from '../activityList';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import SectionDivider from '../sectionDivider';
import './dashboardActivitySection.scss';

/**
 *
 * @returns Activity log html
 */
const DashboardActivitySection = ({ logsData }) => {
  return (
    <div className="section-upcoming-tasks">
      <PageSectionTitle title={'Activity Logs'} />
      <PageSubTitleTitle
        title={'Below is the list of all the activity logs of your registered project.'}
      />
      <SectionDivider />
      <ActivityList {...{ logsData }} />
    </div>
  );
};

export default DashboardActivitySection;
