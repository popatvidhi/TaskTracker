import produce from 'immer';
import { GlobalConstants } from '../actionTypes/globalActionTypes';

const initialState = {
  notifications: [],
};

const globalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GlobalConstants.SET_NOTIFICATION:
        draft.notifications = action.payload;
        break;
      case GlobalConstants.RESET_NOTIFICATION:
        draft.notifications = [];
        break;
      default:
        break;
    }
  });

export default globalReducer;
