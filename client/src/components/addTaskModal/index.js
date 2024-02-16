import React, { useState } from 'react';

import InputField from '../inputField';
import ModalWrapper from '../modalWrapper';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import TextAreaField from '../textAreaField';
import './addTaskModal.scss';

/**
 * 
 * @param {*} param0 
 * @returns task model html page
 */
const AddTaskModal = ({ cancleHandler, addTaskHander }) => {
  const [formErrors, setFormErrors] = useState({});

  const [taskDetailsForm, setTaskDetailsForm] = useState({
    name: '',
    description: '',
  });

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setTaskDetailsForm({ ...taskDetailsForm, ...{ [name]: value } });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (Object.keys(validate(taskDetailsForm)).length) {
      setFormErrors(validate(taskDetailsForm));
      return;
    }
    setFormErrors(null);
    addTaskHander(taskDetailsForm);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Column Name is required!';
    }
    if (!values.description) {
      errors.description = 'Column Description is required!';
    }

    return errors;
  };

  return (
    <ModalWrapper onCancelHandler={cancleHandler}>
      <PageSectionTitle title={'Create a Column.'} />
      <PageSubTitleTitle title={'Please fill in the below information to create a column.'} />
      <form className="create-a-column">
        <InputField
          name={'name'}
          label={'Column Name'}
          type={'text'}
          placeholder={'Enter Task Name.'}
          value={taskDetailsForm.name}
          onChange={changeHandler}
          error={formErrors.name}
        />
        <TextAreaField
          name={'description'}
          label={'Column Description'}
          type={'text'}
          placeholder={'Enter Description.'}
          value={taskDetailsForm.description}
          onChange={changeHandler}
          error={formErrors.description}
        />
        <button onClick={submitHandler}>Add</button>
      </form>
    </ModalWrapper>
  );
};

export default AddTaskModal;
