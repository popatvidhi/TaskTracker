import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotificationDataAction } from '../../store/actions/globalAction';
import { getUserNotificationDataSelector } from '../../store/selectors/globalSelector';
import { getLoaderSelector } from '../../store/selectors/loaderSelector';
import Loader from '../loader';

/**
 * 
 * @param {*} param0 
 * @returns secure router loader active frame html section
 */
const SecureRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const handleNotifications = useCallback(
    (data) => dispatch(resetNotificationDataAction(data)),
    [dispatch],
  );
  const loaderState = useSelector(getLoaderSelector());
  const globalState = useSelector(getUserNotificationDataSelector());

  useEffect(() => {
    if (globalState.length) {
      setTimeout(() => {
        handleNotifications([]);
      }, 5000);
    }
  }, [globalState, handleNotifications]);

  return (
    <Fragment>
      <Loader isActive={loaderState} />
      {!!globalState.length && (
        <div className="notification-bar">
          <p>{globalState}</p>
        </div>
      )}
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default SecureRoutes;
