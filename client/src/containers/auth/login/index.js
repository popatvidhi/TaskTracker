import React, { useState, useEffect } from 'react';
import LoginButton from '../../../components/login/googlelogin';

/**
 *
 * @param {*} param0
 * @returns login page html section
 */
const LoginPage = ({ onSubmitHandler }) => {
  const initialValues = { email: '', password: '' };
  const [loginForm, setLoginForm] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onSubmitHandler(loginForm);
    }
  }, [formErrors]);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(loginForm));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }
    return errors;
  };

  return (
    <div className="base-container">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(loginForm, undefined, 2)}</pre>
      )} */}
      <form onSubmit={handleSubmit}>
        <div className="content">
          <div className="header">LOGIN</div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={loginForm.email}
                name="email"
                placeholder="Enter Email ID..."
                onChange={changeHandler}
              />
            </div>
            <p className="field-error">{formErrors.email}</p>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                value={loginForm.password}
                name="password"
                placeholder="Enter Password..."
                onChange={changeHandler}
              />
            </div>
            <p className="field-error">{formErrors.password}</p>
          </div>
          <div className="footer">
            <button className="btn">Login</button>
            &nbsp;&nbsp;
            <LoginButton />
          </div>
        </div>
      </form>
    </div>
  );
};
// };

export default LoginPage;
