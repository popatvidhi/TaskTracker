/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import store from '../../store';
import ExamplePage from '../example';
import AuthPage from '../auth';
import VerifyAccountPage from '../auth/verifyAccount';
import SecureRoutes from '../../components/secureRoutes';
import ForgotPasswordPage from '../auth/forgotPassword';
import PrivateRoute from '../../_helpers/privateRoute';
import HomePage from '../../_helpers/homePage';
import firebase from '../../_helpers/firebase';

const clientId = '801330935005-ll2j9jtovddvud3essfs3u6qhbbl1d5e.apps.googleusercontent.com';

/**
 * Contains list of all the frontend routes
 * @returns Applications routes
 */
const App = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });

  return (
    <Fragment>
      <Provider {...{ store }}>
        <SecureRoutes>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={AuthPage} />
              <Route exact path="/forgot-password" component={ForgotPasswordPage} />
              <Route exact path="/verify-email/:code" component={VerifyAccountPage} />
              <Route exact path="/example" component={ExamplePage} />
              <PrivateRoute path="/projects" component={withRouter(HomePage)} />
              <Redirect to="/login" />
            </Switch>
          </BrowserRouter>
        </SecureRoutes>
      </Provider>
    </Fragment>
  );
};

export default App;
