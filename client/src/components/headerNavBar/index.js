import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BackIcon from '../../assets/icons/back-icon';
import { logoutUserAction } from '../../store/actions/authAction';

/**
 * 
 * @returns headder nav bar dynamic html page
 */
const HeaderNavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logoutUserAction()), [dispatch]);

  let history = useHistory();

  const logoutHandler = () => {
    localStorage.clear();
    history.push('/login');
    handleLogout();
  };
  return (
    <div className="nav-panel">
      <div onClick={() => history.goBack()}>
        <BackIcon />
      </div>
      <button onClick={logoutHandler} className="logout-nav">
        Logout
      </button>
    </div>
  );
};

export default HeaderNavBar;
