import { createSelector } from 'reselect';

const loaderStateSelector = (state) => state.loaderReducer;

export const getLoaderSelector = () =>
  createSelector(loaderStateSelector, (example) => example?.loading);
