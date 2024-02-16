import produce from 'immer';
import { LoaderConstants } from '../actionTypes/loaderActionTypes';

const initialState = {
  loading: false,
};

const loaderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LoaderConstants.LOADER_STATE:
        draft.value = action.payload;
        break;
      default:
        draft.value = false;
        break;
    }
  });

export default loaderReducer;
