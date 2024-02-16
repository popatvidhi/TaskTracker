import { createSelector } from 'reselect';

const projectStateSelector = (state) => state.projectReducer;

export const getAllProjectsrDataSelector = () =>
  createSelector(projectStateSelector, (example) => example?.projects);

export const getAllProjectMembersrDataSelector = () =>
  createSelector(projectStateSelector, (example) => example?.allTeamMembers);
