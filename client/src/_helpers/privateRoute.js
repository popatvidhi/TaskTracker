import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Loader from '../components/loader';
import { userService } from '../services/users';
import { setLoaderStateAction } from '../store/actions/loaderAction';
import { setUserDataAction } from '../store/actions/userAction';

/**
 * this is the private routes used to authenticate the url
 * @param {*}  Component,
 * @returns
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const saveUserData = useCallback((data) => dispatch(setUserDataAction(data)), [dispatch]);
  const loaderhandler = useCallback((data) => dispatch(setLoaderStateAction(data)), [dispatch]);
  const [isLoggedIn, setIsLoggedIn] = useState({
    isLogged: !false,
    gotAnswerfromServer: !false,
  });

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      loaderhandler(true);
      userService
        .authUserMeAPI()
        .then((response) => {
          if (response.status === 200) {
            saveUserData(response?.data?.user);
            setIsLoggedIn({ isLogged: true, gotAnswerfromServer: true });
          }
        })
        .catch((error) => {
          localStorage.clear();
          setIsLoggedIn({ isLogged: false, gotAnswerfromServer: true });
        });
      loaderhandler(false);
    } else {
      localStorage.clear();
      setIsLoggedIn({ isLogged: false, gotAnswerfromServer: true });
    }
  }, []);

  return isLoggedIn.gotAnswerfromServer ? (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn.isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  ) : (
    <Loader />
  );
};

export default PrivateRoute;
