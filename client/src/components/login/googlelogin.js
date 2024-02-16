import { useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authService } from '../../services/auth';
import { setNotificationDataAction } from '../../store/actions/globalAction';
import { setUserDataAction } from '../../store/actions/userAction';

const clientId = '801330935005-ll2j9jtovddvud3essfs3u6qhbbl1d5e.apps.googleusercontent.com';

/**
 * 
 * @returns google login html page
 */
function GLogin() {
  let history = useHistory();

  const dispatch = useDispatch();
  const handleGLogin = useCallback((data) => dispatch(setUserDataAction(data)), [dispatch]);
  const handleNotification = useCallback(
    (data) => dispatch(setNotificationDataAction(data)),
    [dispatch],
  );

  const onSuccess = (res) => {
    console.log('Login Success! Current User:', res);
    handleLogin({ token: res.tokenId });
  };

  const onFailure = (res) => {
    console.log('Login Failed! Res:', res);
  };

  const handleLogin = async (googleData) => {
    const data = await authService.authGoogleUserAPI(googleData).then();
    handleNotification('Logged In Successfully!');
    localStorage.setItem('refreshToken', data.token);
    handleGLogin(data);
    history.push('/projects');
  };

  return (
    <div className="google-sign-in-button">
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GLogin;
