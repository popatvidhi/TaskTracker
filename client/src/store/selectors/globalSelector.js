import { createSelector } from 'reselect';

const globalStateSelector = (state) => state.globalReducer;

export const getUserNotificationDataSelector = () =>
  createSelector(globalStateSelector, (example) => example?.notifications);
