import { all, takeLatest } from 'redux-saga/effects';

import { AuthConstants } from '../actionTypes/authActionTypes';
import { ExampleConstants } from '../actionTypes/ExampleActionTypes';
import { ProjectConstants } from '../actionTypes/projectActionTypes';
import { TasksConstants } from '../actionTypes/tasksActionTypes';
import { exampleValueSaga } from './ExampleSaga';
import { loginSaga, logoutUserSaga, signupSaga, verifyUserSaga } from './loginSaga';
import {
  createProjectsSaga,
  getAllMemebersSaga,
  getAllProjectsSaga,
  getAProjectSaga,
} from './projectSaga';
import { getAllLogsSaga, getAllTasksSaga, getTasksSaga } from './taskSaga';

/**
 * List of all the sagas
 */

export default function* rootSaga() {
  yield all([
    // Example Saga
    takeLatest(ExampleConstants.SET_EXAMPLE, exampleValueSaga),
    // Auth Saga
    takeLatest(AuthConstants.AUTH_LOGIN, loginSaga),
    takeLatest(AuthConstants.AUTH_SIGNUP, signupSaga),
    takeLatest(AuthConstants.AUTH_LOGOUT, logoutUserSaga),
    takeLatest(AuthConstants.AUTH_VERIFYPASSWORD, verifyUserSaga),
    // All Projects Saga
    takeLatest(ProjectConstants.PROJECT_GET_ALL, getAllProjectsSaga),
    takeLatest(ProjectConstants.PROJECT_CREATE, createProjectsSaga),
    takeLatest(ProjectConstants.PROJECT_GET_ALL_TEAM, getAllMemebersSaga),
    takeLatest(ProjectConstants.PROJECT_GET_A, getAProjectSaga),
    // All Tasks Saga
    takeLatest(TasksConstants.TASKS_GET_ALL, getAllTasksSaga),
    takeLatest(TasksConstants.TASKS_ALL, getTasksSaga),
    takeLatest(TasksConstants.TASKS_GET_LOGS, getAllLogsSaga),
  ]);
}
