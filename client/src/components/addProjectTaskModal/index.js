import React, { useState } from 'react';
import CalendarField from '../calendarField';
import DropDownField from '../dropdownField';
import InputField from '../inputField';
import ModalWrapper from '../modalWrapper';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import TextAreaField from '../textAreaField';
import './addProjectTaskModal.scss';

/**
 * 
 * @param {*} param0 
 * @returns dynamic add project task html page
 */
const AddProjectTaskModal = ({
  cancleHandler,
  statuses,
  projectOngoing,
  userData,
  teamMembers,
  createTasksHandler,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [createTaskForm, setCreateTaskForm] = useState({
    name: '',
    detail: '',
    status: '',
    assignee: '',
    startDate: '',
    endDate: '',
    project: projectOngoing._id,
    owner: userData._id,
  });

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setCreateTaskForm({ ...createTaskForm, ...{ [name]: value } });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(validate(createTaskForm)).length) {
      setFormErrors(validate(createTaskForm));
      return;
    }
    setFormErrors(null);
    createTasksHandler(createTaskForm);
  };

  const changeDateHandler = (name, value) => {
    setCreateTaskForm({ ...createTaskForm, ...{ [name]: value } });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Task Name is required!';
    }
    if (!values.detail) {
      errors.detail = 'Task Details are required!';
    }

    if (!values.status) {
      errors.status = 'Task Status is required!';
    }

    if (!values.assignee) {
      errors.assignee = 'Task should be allocated to a person!';
    }

    if (!values.startDate) {
      errors.startDate = 'Start date is required!';
    }

    if (!values.endDate) {
      errors.endDate = 'End date is required!';
    }

    if (values.startDate && values.endDate) {
      if (values.startDate > values.endDate) {
        errors.startDate = 'Start date is should be less than end date!';
      }
    }

    return errors;
  };

  return (
    <ModalWrapper onCancelHandler={cancleHandler}>
      <PageSectionTitle title={'Create a Task.'} />
      <PageSubTitleTitle title={'Please fill in the below information to create a Task.'} />
      <form>
        <div className="form-left-side">
          <div className="project-owner-details">
            <label>{'OWNER'}</label>
            <div className="project-owner-details">
              <img src={userData?.profilePic} alt={'profile'} />
              <div className="project-owner">
                {userData?.firstName} {userData?.lastName}
              </div>
            </div>
          </div>
          <InputField
            name={'name'}
            label={'Task Name'}
            type={'text'}
            placeholder={'Enter Task Name.'}
            value={createTaskForm.name}
            onChange={changeHandler}
            error={formErrors?.name}
          />
          <TextAreaField
            name={'detail'}
            label={'Task Description'}
            type={'text'}
            rows="7"
            placeholder={'Enter Description.'}
            value={createTaskForm.detail}
            onChange={changeHandler}
            error={formErrors?.detail}
          />
        </div>
        <div className="form-right-side">
          <DropDownField
            name="status"
            data={statuses}
            label={'Select Status'}
            selectedValues={createTaskForm.status}
            onChange={changeHandler}
            multi={false}
            error={formErrors?.status}
          />
          <div className="date-section">
            <CalendarField
              label={'Start date'}
              value={createTaskForm.startDate}
              onChange={changeDateHandler}
              name="startDate"
              error={formErrors?.startDate}
            />
            <CalendarField
              label={'End date'}
              value={createTaskForm.endDate}
              onChange={changeDateHandler}
              name="endDate"
              error={formErrors?.endDate}
            />
          </div>

          <DropDownField
            name="assignee"
            data={teamMembers}
            label={'Allocate to'}
            selectedValues={createTaskForm.assignee}
            onChange={changeHandler}
            multi={false}
            error={formErrors?.assignee}
          />

          <button type="submit" onClick={onSubmitHandler}>
            Create
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddProjectTaskModal;
