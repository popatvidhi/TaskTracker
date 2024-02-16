import { put } from 'redux-saga/effects';
import { saveExampleValueAction } from '../actions/ExampleAction';

export function* exampleValueSaga({ payload }) {
  try {
    yield put(saveExampleValueAction(payload));
  } catch (error) {
    console.log('exampleValueSaga error - ', error);
  } finally {
  }
}
