import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { storage } from '../../../_helpers/firebase';

const DEFAULT_PIC =
  'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';

/**
 *
 * @returns register user html section
 */
function RegisterPage({ onSubmitHandler }) {
  let history = useHistory();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePic: DEFAULT_PIC,
  };
  const [registerForm, setRegisterForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(validate(registerForm)).length) {
      setFormErrors(validate(registerForm));
      return;
    }
    setFormErrors(null);
    onSubmitHandler(registerForm);
  };

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-z ,.'-]+$/i;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = 'First Name is required!';
    } else if (!nameRegex.test(values.firstName)) {
      errors.firstName = 'This is not a valid name format!';
    }

    if (!values.lastName) {
      errors.lastName = 'Last Name is required!';
    } else if (!nameRegex.test(values.lastName)) {
      errors.lastName = 'This is not a valid name format!';
    }

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }
    return errors;
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const path = `/images/${e.target.files[0].name}`;
      const ref = storage.ref(path);
      await ref.put(e.target.files[0]);
      const url = await ref.getDownloadURL();
      setRegisterForm({ ...registerForm, ...{ profilePic: url } });
    }
  };

  return (
    <div className="base-container">
      {/* <pre>{JSON.stringify(registerForm, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        <div className="content">
          <div className="header">REGISTER</div>

          <div className="image">{/* <img src={loginImg} alt="loginImage" /> */}</div>
          <div className="profile-image">
            <img src={registerForm.profilePic} alt="profilePicture" />
          </div>
          <input type="file" name="myImage" accept="image/*" onChange={handleChange} />
          <div className="form">
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                value={registerForm.firstName}
                onChange={onChangeHandler}
                type="text"
                name="firstName"
                placeholder="Enter First Name..."
              />
              <p className="field-error">{formErrors?.firstName}</p>
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                value={registerForm.lastName}
                onChange={onChangeHandler}
                type="text"
                name="lastName"
                placeholder="Enter Last Name..."
              />
              <p className="field-error">{formErrors?.lastName}</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                value={registerForm.email}
                onChange={onChangeHandler}
                type="email"
                name="email"
                placeholder="Enter Email ID..."
              />
              <p className="field-error">{formErrors?.email}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={registerForm.password}
                onChange={onChangeHandler}
                type="password"
                name="password"
                placeholder="Enter Password..."
              />
              <p className="field-error">{formErrors?.password}</p>
            </div>
            <button className="btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
