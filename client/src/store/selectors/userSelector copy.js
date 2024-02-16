import { createSelector } from 'reselect';

const userStateSelector = (state) => state.userReducer;

export const getUserDataSelector = () =>
  createSelector(userStateSelector, (example) => example?.user);

export const getAProjectDataSelector = () =>
  createSelector(userStateSelector, (example) => example?.project);
