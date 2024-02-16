import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginPage from './login';
import RegisterPage from './register';
import { loginUserAction, signupUserAction } from '../../store/actions/authAction';
import './auth.scss';
import { getUserDataSelector } from '../../store/selectors/userSelector';

/**
 *
 * @param {*} props
 * @returns authorization page html
 */
const AuthPage = (props) => {
  const dispatch = useDispatch();
  const handleLogin = useCallback((data) => dispatch(loginUserAction(data)), [dispatch]);
  const handleRegister = useCallback((data) => dispatch(signupUserAction(data)), [dispatch]);
  const userValue = useSelector(getUserDataSelector());

  const [isLogginActive, setIsLogginActive] = useState(true);
  const [current, setCurrent] = useState('REGISTER');
  let rightSide = useRef();

  useEffect(() => {
    rightSide.classList.add('right');
  }, []);

  // to see if refresh token is present or not
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);
    if (refreshToken) {
      props.history.push('/projects');
    }
  }, [props.history, userValue]);

  // toggle hte section
  useEffect(() => {
    setCurrent(isLogginActive ? 'REGISTER' : 'LOGIN');
  }, [isLogginActive]);

  const changeStateHandler = () => {
    if (isLogginActive) {
      rightSide.classList.remove('right');
      rightSide.classList.add('left');
    } else {
      rightSide.classList.remove('left');
      rightSide.classList.add('right');
    }
    setIsLogginActive(!isLogginActive);
  };

  return (
    <div className="App">
      <div className="image">
        <div className="title">
          <h1>Task Trackers</h1>
        </div>
      </div>
      <div className="theme-background-auth" />
      <div className="container-details">
        <div className="login">
          <div className="container">
            {isLogginActive ? (
              <LoginPage onSubmitHandler={handleLogin} />
            ) : (
              <RegisterPage onSubmitHandler={handleRegister} />
            )}
          </div>
          <RightSide
            {...{ current }}
            containerRef={(ref) => (rightSide = ref)}
            onClick={changeStateHandler}
          />
        </div>
      </div>
    </div>
  );
};

const RightSide = (props) => {
  return (
    <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default AuthPage;
