import produce from 'immer';
import { ProjectConstants } from '../actionTypes/projectActionTypes';
import { TasksConstants } from '../actionTypes/tasksActionTypes';
import { UserConstants } from '../actionTypes/userActionTypes';

const initialState = {
  user: [],
  project: null,
  tasks: null,
  logs: [],
};

const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserConstants.USER_DATA:
        draft.user = action.payload;
        break;
      case ProjectConstants.PROJECT_SAVE_A:
        draft.project = action.payload;
        break;
      case TasksConstants.TASKS_SAVE:
        draft.tasks = action.payload;
        break;
      case TasksConstants.TASKS_SAVE_LOGS:
        draft.logs = action.payload;
        break;
      default:
        break;
    }
  });

export default userReducer;
