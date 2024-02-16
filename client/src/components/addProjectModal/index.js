import React, { useState, useEffect } from 'react';
import ColorPicker from '../colorPicker';
import DropDownField from '../dropdownField';
import InputField from '../inputField';
import ModalWrapper from '../modalWrapper';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import TextAreaField from '../textAreaField';
import './addProjectModal.scss';

/**
 * 
 * @param {*} param0 
 * @returns dynamic add project model html page
 */
const AddProjectModal = ({ cancleHandler, createProjectHandler, userData, teamMembers, data }) => {
  const [createProjectForm, setCreateProjectForm] = useState({
    name: '',
    description: '',
    theme: '#B71C1C',
    owner: userData._id,
    team: [],
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!!data) {
      let temp = [];
      data.team.forEach((member) => {
        temp.push({ name: member.firstName + ' ' + member.lastName, id: member._id });
      });

      setCreateProjectForm({
        ...createProjectForm,
        ...{
          name: data.name,
          description: data.description,
          theme: data.theme,
          team: temp,
        },
      });
    }
  }, [data]);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setCreateProjectForm({ ...createProjectForm, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(validate(createProjectForm)).length) {
      setFormErrors(validate(createProjectForm));
      return;
    }
    setFormErrors(null);
    let obj = {
      name: createProjectForm.name,
      description: createProjectForm.description,
      theme: createProjectForm.theme,
      owner: createProjectForm.owner,
      team: createProjectForm.team.map((item) => item.id),
    };
    createProjectHandler(obj);
  };

  const changeHandlerTeam = (value) => {
    setCreateProjectForm({ ...createProjectForm, ...{ team: value } });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Project Name is required!';
    }
    if (!values.description) {
      errors.description = 'Project Description is required!';
    }

    if (!values.theme) {
      errors.theme = 'Project Theme is required!';
    }

    if (!values.team.length) {
      errors.team = 'Atleast one team member is required!';
    }

    return errors;
  };

  return (
    <ModalWrapper onCancelHandler={cancleHandler}>
      <PageSectionTitle title={data ? 'Edit a Project.' : 'Create a Project.'} />
      <PageSubTitleTitle title={'Please fill in the below information to create a Project.'} />
      <form>
        <form className="add-project-modal">
          <InputField
            name={'name'}
            label={'Project Name'}
            type={'text'}
            placeholder={'Enter Project Name.'}
            value={createProjectForm.name}
            onChange={changeHandler}
            error={formErrors?.name}
          />
          <TextAreaField
            name={'description'}
            label={'Project Description'}
            type={'text'}
            placeholder={'Enter Description.'}
            value={createProjectForm.description}
            onChange={changeHandler}
            error={formErrors?.description}
          />
          <ColorPicker
            value={createProjectForm.theme}
            name={'theme'}
            label={'Pick theme'}
            onChange={changeHandler}
            error={formErrors?.theme}
          />
          <DropDownField
            name="team"
            data={teamMembers}
            label={'Select Team Member'}
            display={'name'}
            selectedValues={createProjectForm.team}
            onChange={changeHandlerTeam}
            multi={true}
            error={formErrors?.team}
          />
          <div className="project-owner-details">
            <label>{'OWNER'}</label>
            <div className="project-owner-detail">
              <img src={userData?.profilePic} alt={'profile'} />
              <div className="project-owner">
                {userData?.firstName} {userData?.lastName}
              </div>
            </div>
          </div>

          <button type="submit" onClick={onSubmitHandler}>
            {data ? 'Edit' : 'Create'}
          </button>
        </form>
      </form>
    </ModalWrapper>
  );
};

export default AddProjectModal;
