import { call, put } from 'redux-saga/effects';
import { taskService } from '../../services/tasks';
import { setNotificationDataAction } from '../actions/globalAction';
import { setLoaderStateAction } from '../actions/loaderAction';
import { saveAllTasksAction, getAllTasksAction, saveAllLogsAction } from '../actions/taskAction';

export function* getAllTasksSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    yield call(taskService.createATasksAPI, payload.data);
    yield put(getAllTasksAction({ projectId: payload.projectId }));
    yield put(setNotificationDataAction('Task created Successfully!'));
  } catch (error) {
    console.log('getAllTasksSaga error - ', error.response?.data?.error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* getTasksSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    const data = yield call(taskService.getAllTasksAPI, payload);
    yield put(saveAllTasksAction(data));
  } catch (error) {
    console.log('getAllTasksSaga error - ', error.response?.data?.error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* createTaskColumnSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
  } catch (error) {
    console.log('getAllTasksSaga error - ', error.response?.data?.error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}

export function* getAllLogsSaga({ payload }) {
  try {
    yield put(setLoaderStateAction(true));
    const data = yield call(taskService.getAllLogsAPI, payload);
    yield put(saveAllLogsAction(data));
  } catch (error) {
    console.log('getAllTasksSaga error - ', error.response?.data?.error);
    yield put(setNotificationDataAction(error?.response?.data?.error || 'Something went wrong'));
  } finally {
    yield put(setLoaderStateAction(false));
  }
}
