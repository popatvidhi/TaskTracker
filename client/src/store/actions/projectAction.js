import { ProjectConstants } from '../actionTypes/projectActionTypes';


/**
 * 
 * Project services action
 */

export const getProjectsStateAction = () => ({
  type: ProjectConstants.PROJECT_GET_ALL,
});

export const saveProjectsStateAction = (payload) => ({
  type: ProjectConstants.PROJECT_SAVE_ALL,
  payload,
});

export const createProjectsStateAction = (payload) => ({
  type: ProjectConstants.PROJECT_CREATE,
  payload,
});

export const getTeamMembersStateAction = () => ({
  type: ProjectConstants.PROJECT_GET_ALL_TEAM,
});

export const saveTeamMembersStateAction = (payload) => ({
  type: ProjectConstants.PROJECT_SAVE_ALL_TEAM,
  payload,
});

export const getAProjectStateAction = (payload) => ({
  type: ProjectConstants.PROJECT_GET_A,
  payload,
});

export const saveAProjectStateAction = (payload) => ({
  type: ProjectConstants.PROJECT_SAVE_A,
  payload,
});
