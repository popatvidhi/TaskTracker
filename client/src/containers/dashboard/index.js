import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardActivitySection from '../../components/dashboardActivitySection';
import DashboardProjectSection from '../../components/dashboardProjectSection';
import HeaderNavBar from '../../components/headerNavBar';
import PageSubTitleTitle from '../../components/pageSubTitle';
import PageTitle from '../../components/pageTitle';
import {
  createProjectsStateAction,
  getProjectsStateAction,
  getTeamMembersStateAction,
} from '../../store/actions/projectAction';
import { getAllLogsAction } from '../../store/actions/taskAction';
import {
  getAllProjectMembersrDataSelector,
  getAllProjectsrDataSelector,
} from '../../store/selectors/projectSelector';
import { getTasksLogsDataSelector, getUserDataSelector } from '../../store/selectors/userSelector';
import './dashboard.scss';

/**
 * 
 * @param {*} props 
 * @returns dashboard page html
 */
const DashBoardPage = (props) => {
  const dispatch = useDispatch();
  const handleGetProjects = useCallback(() => dispatch(getProjectsStateAction()), [dispatch]);
  const handleTeamMemebersProjects = useCallback(
    () => dispatch(getTeamMembersStateAction()),
    [dispatch],
  );
  const handleCreateProject = useCallback(
    (data) => dispatch(createProjectsStateAction(data)),
    [dispatch],
  );
  const handleLogs = useCallback((data) => dispatch(getAllLogsAction(data)), [dispatch]);
  const getAllProjects = useSelector(getAllProjectsrDataSelector());
  const userData = useSelector(getUserDataSelector());
  const allTeamMemebersData = useSelector(getAllProjectMembersrDataSelector());
  const allLogs = useSelector(getTasksLogsDataSelector());

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    handleGetProjects();
    handleTeamMemebersProjects();
    handleLogs();
  }, [handleGetProjects, handleTeamMemebersProjects]);

  useEffect(() => {
    if (allLogs.length) {
      setLogsData(allLogs);
    }
  }, [allLogs]);

  useEffect(() => {
    let data = [];
    allTeamMemebersData.forEach((member) => {
      data.push({ name: member.firstName + ' ' + member.lastName, id: member._id });
    });
    setTeamMembers(data);
  }, [allTeamMemebersData]);

  useEffect(() => {
    if (getAllProjects?.length) {
      setAllProjects(getAllProjects);
    }
  }, [getAllProjects]);

  const createProject = (data) => {
    handleCreateProject(data);
    setAddModalVisible(false);
  };

  return (
    <div className="container">
      <div className="theme-background " />
      <div className="container-details">
        <HeaderNavBar />
        <PageTitle title={'Dashboard.'} />
        <PageSubTitleTitle title={'List of all the Projects'} />
        <div className="section-divider">
          <DashboardProjectSection
            data={allProjects}
            {...{ addModalVisible }}
            {...{ setAddModalVisible }}
            {...{ userData }}
            {...{ teamMembers }}
            {...{ setTeamMembers }}
            createProjectHandler={createProject}
          />
          <DashboardActivitySection {...{ logsData }} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
