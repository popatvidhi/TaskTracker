import { createSelector } from 'reselect';

const userStateSelector = (state) => state.userReducer;

export const getUserDataSelector = () =>
  createSelector(userStateSelector, (example) => example?.user);

export const getAProjectDataSelector = () =>
  createSelector(userStateSelector, (example) => example?.project);

export const getTasksDataSelector = () =>
  createSelector(userStateSelector, (example) => example?.tasks);

export const getTasksLogsDataSelector = () =>
  createSelector(userStateSelector, (example) => example?.logs);
