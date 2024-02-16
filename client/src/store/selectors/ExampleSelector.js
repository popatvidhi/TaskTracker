import { createSelector } from 'reselect';

const exampleStateSelector = (state) => state.exampleReducer;

export const getValueSelector = () =>
  createSelector(exampleStateSelector, (example) => example?.value);