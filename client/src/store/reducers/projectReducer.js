import produce from 'immer';
import { ProjectConstants } from '../actionTypes/projectActionTypes';

const initialState = {
  projects: [],
  allTeamMembers: [],
};

const projectReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ProjectConstants.PROJECT_SAVE_ALL:
        draft.projects = action.payload;
        break;
      case ProjectConstants.PROJECT_SAVE_ALL_TEAM:
        draft.allTeamMembers = action.payload;
        break;
      default:
        break;
    }
  });

export default projectReducer;
