import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditIcon from '../../assets/icons/edit-icon';
import AddProjectModal from '../../components/addProjectModal';

import HeaderNavBar from '../../components/headerNavBar';
import PageSubTitleTitle from '../../components/pageSubTitle';
import PageTitle from '../../components/pageTitle';
import StatisticsPanel from '../../components/statisticsPanel';
import TeamMemberBlock from '../../components/teamMemberBlock';
import { projectService } from '../../services/projects';
import { setNotificationDataAction } from '../../store/actions/globalAction';
import {
  getAProjectStateAction,
  getTeamMembersStateAction,
} from '../../store/actions/projectAction';
import { getAllTasksAction } from '../../store/actions/taskAction';
import { getAllProjectMembersrDataSelector } from '../../store/selectors/projectSelector';
import {
  getAProjectDataSelector,
  getTasksDataSelector,
  getUserDataSelector,
} from '../../store/selectors/userSelector';
import './projects.scss';

/**
 *
 * @param {*} props
 * @returns project page html
 */
const ProjectPage = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const allTeamMemebersData = useSelector(getAllProjectMembersrDataSelector());
  const handleTeamMemebersProjects = useCallback(
    () => dispatch(getTeamMembersStateAction()),
    [dispatch],
  );
  const handleGetAProject = useCallback(
    (data) => dispatch(getAProjectStateAction(data)),
    [dispatch],
  );
  const handleAllTasks = useCallback((data) => dispatch(getAllTasksAction(data)), [dispatch]);
  const handleNotification = useCallback(
    (data) => dispatch(setNotificationDataAction(data)),
    [dispatch],
  );

  const tasksOngoing = useSelector(getTasksDataSelector());
  const userData = useSelector(getUserDataSelector());
  const projectOngoing = useSelector(getAProjectDataSelector());
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let data = [];
    allTeamMemebersData.forEach((member) => {
      data.push({ name: member.firstName + ' ' + member.lastName, id: member._id });
    });
    setTeamMembers(data);
  }, [allTeamMemebersData]);

  useEffect(() => {
    const projectId = props?.match?.params?.id;
    if (projectId) {
      handleGetAProject(projectId);
      handleAllTasks({ projectId });
    }
    handleTeamMemebersProjects();
  }, [handleGetAProject, props]);

  useEffect(() => {
    if (tasksOngoing) {
      let columns = [];
      tasksOngoing.forEach((task) => {
        if (!columns.includes(task.status)) {
          columns.push(task.status);
        }
      });
      let data = new Array(columns.length).fill(0);
      let metadata = new Array(columns.length).fill([]);
      tasksOngoing.forEach((task) => {
        data[columns.indexOf(task.status)] += 1;
        metadata[columns.indexOf(task.status)].push(task);
      });
      let colors = [];
      columns.forEach((col) => {
        colors.push(getRandomColor());
      });
      const statistics = {
        labels: columns,
        datasets: [
          {
            label: 'Tasks Statistics',
            data: data,
            backgroundColor: colors,
            borderWidth: 2,
          },
        ],
      };
      setStats(statistics);
    }
  }, [tasksOngoing]);

  const getRandomColor = () => {
    var r = () => (Math.random() * 256) >> 0;
    var color = `rgba(${r()}, ${r()}, ${r()}, 0.4)`;
    return color;
  };
  const deleteHandler = async (id) => {
    const team = projectOngoing.team.filter((project) => project._id !== id);
    await projectService.updateAProjectsAPI({ id: projectOngoing._id, data: { team } }).then();
    handleNotification('User deleted Successfully!');
    handleGetAProject(projectOngoing._id);
  };

  const createProjectHandler = async (data) => {
    await projectService.updateAProjectsAPI({ id: projectOngoing._id, data }).then();
    handleNotification('Project updated Successfully!');
    handleGetAProject(projectOngoing._id);
  };

  return (
    <div className="container">
      <div className="theme-background"></div>
      <div className="container-details">
        <HeaderNavBar />
        <div className="project-actions">
          <PageTitle title={projectOngoing?.name || 'Projects.'} />
          <div className="project-right-options">
            <div className="edit-icon" onClick={() => setAddModalVisible(true)}>
              <EditIcon />
            </div>
            <div
              className="view-all-tasks"
              onClick={() => history.push(`/projects/${projectOngoing._id}/tasks`)}
            >
              View All Tasks
            </div>
          </div>
        </div>
        <PageSubTitleTitle title={projectOngoing?.description || 'Description'} />

        <div className="project-detail-section">
          <div className="project-details-section">
            <PageSubTitleTitle title={'TEAM MEMBERS'} />
            {projectOngoing &&
              projectOngoing?.team.map((project, index) => (
                <TeamMemberBlock data={project} key={`project${index}`} {...{ deleteHandler }} />
              ))}
          </div>
          <div className="project-stats">
            <StatisticsPanel data={stats} />
          </div>
        </div>

        {addModalVisible && (
          <AddProjectModal
            {...{ createProjectHandler }}
            {...{ userData }}
            {...{ teamMembers }}
            {...{ setTeamMembers }}
            data={projectOngoing}
            cancleHandler={() => setAddModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
