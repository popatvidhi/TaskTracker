import { call, put } from 'redux-saga/effects';
import { authService } from '../../services/auth';
import { setNotificationDataAction } from '../actions/globalAction';
import { setLoaderStateAction } from '../actions/loaderAction';
import { saveProjectsStateAction, saveTeamMembersStateAction } from '../actions/projectAction';
import { saveAllLogsAction } from '../actions/taskAction';
import { setUserDataAction } from '../actions/userAction';

export function* loginSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    const data = yield call(authService.authLoginUserAPI, payload);
    if (data) {
      yield put(setUserDataAction(data));
    }
    yield put(setNotificationDataAction('Logged In Successfully!'));
  } catch (error) {
    console.log('loginSaga error - ', error.response?.data?.error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* signupSaga({ payload }) {
  try {
    console.log(payload);
    yield put(setLoaderStateAction(true));
    yield call(authService.authSignUpUserAPI, payload);
    yield put(setNotificationDataAction('User signed up successfully!'));
  } catch (error) {
    console.log('signupSaga error - ', error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* verifyUserSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    yield call(authService.authVerifyUserAPI, payload);
    yield put(setNotificationDataAction('User verified successfully!'));
  } catch (error) {
    console.log('signupSaga error - ', error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* logoutUserSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    yield put(setUserDataAction(null));
    yield put(saveProjectsStateAction([]));
    yield put(saveTeamMembersStateAction([]));
    yield put(saveAllLogsAction([]));
    yield put(setNotificationDataAction('User logged out successfully!'));
  } catch (error) {
    console.log('signupSaga error - ', error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}
