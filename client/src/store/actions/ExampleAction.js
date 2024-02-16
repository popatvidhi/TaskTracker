import { ExampleConstants } from '../actionTypes/ExampleActionTypes';


export const setExampleValueAction = (payload) => ({
  type: ExampleConstants.SET_EXAMPLE,
  payload,
});

export const saveExampleValueAction = (payload) => ({
  type: ExampleConstants.SAVE_EXAMPLE,
  payload,
});
