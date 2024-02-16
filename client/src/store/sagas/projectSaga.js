import { call, put } from 'redux-saga/effects';

import { projectService } from '../../services/projects';
import { userService } from '../../services/users';
import { setLoaderStateAction } from '../actions/loaderAction';
import {
  getProjectsStateAction,
  saveAProjectStateAction,
  saveProjectsStateAction,
  saveTeamMembersStateAction,
} from '../actions/projectAction';

export function* getAllProjectsSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    const data = yield call(projectService.getAllProjectsAPI);
    yield put(saveProjectsStateAction(data));
  } catch (error) {
    console.log('getAllProjectsSaga error - ', error);
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* createProjectsSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    yield call(projectService.createProjectsAPI, payload);
    yield put(getProjectsStateAction());
  } catch (error) {
    console.log('getAllProjectsSaga error - ', error);
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* getAllMemebersSaga() {
  try {
    yield put(setLoaderStateAction(true));
    const data = yield call(userService.getAllMemebersAPI);
    yield put(saveTeamMembersStateAction(data));
  } catch (error) {
    console.log('getAllMemebersSaga error - ', error);
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* getAProjectSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    const data = yield call(projectService.getAProjectsAPI, payload);
    yield put(saveAProjectStateAction(data));
  } catch (error) {
    console.log('getAllMemebersSaga error - ', error);
  } finally {
    yield put(setLoaderStateAction(false));
  }
}
