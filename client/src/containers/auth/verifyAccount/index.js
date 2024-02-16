import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import GreenTickIcon from '../../../assets/icons/green-tick-icon';
import PageSubTitleTitle from '../../../components/pageSubTitle';
import PageTitle from '../../../components/pageTitle';
import { verifyUserAction } from '../../../store/actions/authAction';

/**
 * 
 * @param {*} props 
 * @returns verify acccount html section
 */
const VerifyAccountPage = (props) => {
  const dispatch = useDispatch();
  const handleVerifyUser = useCallback((data) => dispatch(verifyUserAction(data)), [dispatch]);

  useEffect(() => {
    const code = props.match.params.code;
    handleVerifyUser(code);
  }, [handleVerifyUser, props]);

  return (
    <div className="container">
      <header>
        <GreenTickIcon />
      </header>
      <PageTitle title={'Account confirmed!'} />
      <br />
      <Link to={'/login'}>
        <PageSubTitleTitle title={'Please Login'} />
      </Link>
      <br />
      <br />
    </div>
  );
};

export default VerifyAccountPage;
