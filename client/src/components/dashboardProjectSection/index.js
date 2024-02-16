import React from 'react';
import AddProjectBlock from '../addProjectBlock';
import AddProjectModal from '../addProjectModal';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import ProjectBlock from '../projectBlock';
import SectionDivider from '../sectionDivider';
import './dashboardProjectSection.scss';

/**
 *
 * @param {*} param0
 * @returns dashboard project selection html page
 */
const DashboardProjectSection = ({
  data,
  setAddModalVisible,
  addModalVisible,
  createProjectHandler,
  userData,
  teamMembers,
  setTeamMembers,
}) => {
  return (
    <div className="section-project-list">
      <PageSectionTitle title={'Projects'} />
      <PageSubTitleTitle title={'Click below to create a new project or access a project.'} />
      <SectionDivider />
      <div className="project-block">
        <AddProjectBlock addHandler={() => setAddModalVisible(true)} />
        {data.map((item, index) => (
          <ProjectBlock key={`projectblock ${index}`} data={item} />
        ))}
      </div>
      {addModalVisible && (
        <AddProjectModal
          {...{ createProjectHandler }}
          {...{ userData }}
          {...{ teamMembers }}
          {...{ setTeamMembers }}
          cancleHandler={() => setAddModalVisible(false)}
        />
      )}
    </div>
  );
};

export default DashboardProjectSection;
