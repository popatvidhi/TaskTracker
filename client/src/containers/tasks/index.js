import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddProjectTaskModal from '../../components/addProjectTaskModal';
import DnDSection from '../../components/dndSection';
import HeaderNavBar from '../../components/headerNavBar';
import PageSubTitleTitle from '../../components/pageSubTitle';
import PageTitle from '../../components/pageTitle';
import { projectService } from '../../services/projects';
import { taskService } from '../../services/tasks';
import { setNotificationDataAction } from '../../store/actions/globalAction';
import { getAProjectStateAction } from '../../store/actions/projectAction';
import { getAllTaskDataAction, getAllTasksAction } from '../../store/actions/taskAction';
import {
  getAProjectDataSelector,
  getTasksDataSelector,
  getUserDataSelector,
} from '../../store/selectors/userSelector';
import './tasks.scss';

/**
 * 
 * @param {*} props 
 * @returns task page html
 */
const TasksPage = (props) => {
  const dispatch = useDispatch();
  const [addColumModal, setAddColumnModal] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewTaskVisible, setViewTaskVisible] = useState(false);
  const userData = useSelector(getUserDataSelector());

  const handleGetAProject = useCallback(
    (data) => dispatch(getAProjectStateAction(data)),
    [dispatch],
  );
  const handleTasks = useCallback((data) => dispatch(getAllTaskDataAction(data)), [dispatch]);
  const handleAllTasks = useCallback((data) => dispatch(getAllTasksAction(data)), [dispatch]);
  const handleNotification = useCallback(
    (data) => dispatch(setNotificationDataAction(data)),
    [dispatch],
  );
  const projectOngoing = useSelector(getAProjectDataSelector());
  const tasksOngoing = useSelector(getTasksDataSelector());
  const [teamMembers, setTeamMembers] = useState([]);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    const projectId = props?.match?.params?.id;
    if (projectId) {
      handleGetAProject(projectId);
      handleAllTasks({ projectId });
    }
  }, [handleGetAProject, props]);

  useEffect(() => {
    let data = [{ id: '', name: 'Select' }];
    if (projectOngoing) {
      projectOngoing.team.forEach((member) => {
        data.push({ name: member.firstName + ' ' + member.lastName, id: member._id });
      });
      setTeamMembers(data);
    }
  }, [projectOngoing]);

  useEffect(() => {
    if (!(tasksOngoing && projectOngoing)) return;
    let obj = {};
    projectOngoing?.taskColumnsDetails?.map((project) => {
      obj[project.name] = {
        id: project.name,
        sectionName: project.name,
        description: project.description,
        tasks: [],
      };
    });
    tasksOngoing.forEach((task) => {
      for (let ob in obj) {
        if (ob === task.status) {
          obj[task.status].tasks.push({
            id: task._id,
            name: task.name,
            metadata: task,
          });
        }
      }
    });

    setColumns(obj);
  }, [tasksOngoing, projectOngoing]);

  const getStatus = (data) => {
    const values = Object.values(data);
    let temp = [{ id: '', name: 'Select' }];
    values.forEach((val, index) => {
      temp.push({ id: val.sectionName, name: val.sectionName });
    });
    return temp;
  };

  const createTasksHandler = (data) => {
    setAddModalVisible(false);
    handleTasks({ projectId: props?.match?.params?.id, data });
  };

  const addNewColumnHandler = (data) => {
    createAColumn(data);
    setAddColumnModal(false);
  };

  const createAColumn = async (Coldata) => {
    const data = await taskService.createATaskColumnAPI(Coldata).then();
    let cols = [data._id];
    projectOngoing.taskColumnsDetails.map((el) => cols.push(el._id));
    await projectService
      .updateAProjectsAPI({
        id: props?.match?.params?.id,
        data: { taskColumnsDetails: cols.reverse() },
      })
      .then();
    handleNotification('Column created Successfully!');
    handleGetAProject(props?.match?.params?.id);
  };

  return (
    <div className="container">
      <div className="theme-background"></div>
      <div className="container-details">
        <HeaderNavBar />
        <div className="tasks-header">
          <div>
            <PageTitle title={'Tasks.'} />
            <PageSubTitleTitle title={'List of all the Tasks'} />
          </div>
          <div className="tasks-right-options">
            <div className="create-a-tasks" onClick={() => setAddModalVisible(true)}>
              Create A Task
            </div>
          </div>
        </div>
        <DnDSection
          {...{ columns }}
          {...{ setColumns }}
          {...{ addNewColumnHandler }}
          {...{ addColumModal }}
          {...{ setAddColumnModal }}
          {...{ createAColumn }}
          {...{ viewTaskVisible }}
          {...{ setViewTaskVisible }}
          {...{ teamMembers }}
          projectId={props?.match?.params?.id}
          statuses={getStatus(columns)}
        />
        {addModalVisible && (
          <AddProjectTaskModal
            {...{ userData }}
            {...{ teamMembers }}
            {...{ projectOngoing }}
            {...{ createTasksHandler }}
            statuses={getStatus(columns)}
            cancleHandler={() => setAddModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;
