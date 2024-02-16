import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { taskService } from '../../services/tasks';
import { setNotificationDataAction } from '../../store/actions/globalAction';
import { getAProjectStateAction } from '../../store/actions/projectAction';
import { getAllTasksAction } from '../../store/actions/taskAction';
import CalendarField from '../calendarField';
import DropDownField from '../dropdownField';
import InputField from '../inputField';
import ModalWrapper from '../modalWrapper';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import TextAreaField from '../textAreaField';
import './seeTaskModal.scss';

/**
 * 
 * @param {*} param0 
 * @returns task modal html section
 */
const SeeTaskModal = ({ cancleHandler, data, teamMembers, statuses, projectId }) => {
  const dispatch = useDispatch();

  const handleGetAProject = useCallback(
    (data) => dispatch(getAProjectStateAction(data)),
    [dispatch],
  );
  const handleNotification = useCallback(
    (data) => dispatch(setNotificationDataAction(data)),
    [dispatch],
  );
  const handleAllTasks = useCallback((data) => dispatch(getAllTasksAction(data)), [dispatch]);

  const [taskId, setTaskId] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [createProjectForm, setCreateProjectForm] = useState({
    name: '',
    detail: '',
    startDate: new Date(),
    endDate: new Date(),
    status: '',
    owner: '',
  });

  useEffect(() => {
    (async () => {
      if (data) {
        const taskDetails = await taskService.getTaskDetailsAPI(data?.id).then();
        setTaskId(taskDetails._id);
        setOwnerDetails(taskDetails.owner);
        setCreateProjectForm({
          ...createProjectForm,
          ...{
            name: taskDetails.name,
            detail: taskDetails.detail,
            startDate: taskDetails.startDate,
            endDate: taskDetails.endDate,
            status: taskDetails.status,
            owner: taskDetails.owner._id,
          },
        });
      }
    })();
  }, [data]);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setCreateProjectForm({ ...createProjectForm, ...{ [name]: value } });
  };

  const changeDateHandler = (name, value) => {
    setCreateProjectForm({ ...createProjectForm, ...{ [name]: value } });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await taskService.updateTaskDetailsAPI({ id: taskId, data: createProjectForm }).then();

    handleNotification('Task updated successfully!!');
    handleGetAProject(projectId);
    handleAllTasks({ projectId });
  };

  return (
    <ModalWrapper onCancelHandler={cancleHandler}>
      <PageSectionTitle title={'Task Details.'} />
      <PageSubTitleTitle title={'Please fill in the below information to create a Project.'} />
      <form className="add-project-modal">
        <div className="project-owner-details">
          <img src={ownerDetails?.profilePic} alt={'profile'} />
          <div className="project-owner">
            {ownerDetails?.firstName} {ownerDetails?.lastName}
          </div>
        </div>
        <DropDownField
          name="status"
          data={statuses}
          label={'Status'}
          value={createProjectForm.status}
          onChange={changeHandler}
          multi={false}
        />
        <InputField
          name={'name'}
          label={'Project Name'}
          type={'text'}
          placeholder={'Enter Project Name.'}
          value={createProjectForm.name}
          onChange={changeHandler}
        />
        <TextAreaField
          name={'detail'}
          label={'Project Description'}
          type={'text'}
          placeholder={'Enter Description.'}
          value={createProjectForm.detail}
          onChange={changeHandler}
        />
        <CalendarField
          label={'Start date'}
          value={new Date(createProjectForm?.startDate)}
          onChange={changeDateHandler}
          name="startDate"
        />
        <CalendarField
          label={'End date'}
          value={new Date(createProjectForm?.endDate)}
          onChange={changeDateHandler}
          name="endDate"
        />
        <DropDownField
          name="owner"
          data={teamMembers}
          label={'Allocate to'}
          value={createProjectForm.owner}
          onChange={changeHandler}
          multi={false}
        />
        <button type="submit" onClick={submitHandler}>
          Create
        </button>
      </form>
    </ModalWrapper>
  );
};

export default SeeTaskModal;
