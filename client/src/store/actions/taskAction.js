import { TasksConstants } from '../actionTypes/tasksActionTypes';

/**
 * 
 * Task services action
 * 
 */

export const getAllTaskDataAction = (payload) => ({
  type: TasksConstants.TASKS_GET_ALL,
  payload,
});

export const getAllTasksAction = (payload) => ({
  type: TasksConstants.TASKS_ALL,
  payload,
});

export const saveAllTasksAction = (payload) => ({
  type: TasksConstants.TASKS_SAVE,
  payload,
});

export const createtaskColumnAction = (payload) => ({
  type: TasksConstants.TASKS_ADD_COLUMN,
  payload,
});

export const getAllLogsAction = (payload) => ({
  type: TasksConstants.TASKS_GET_LOGS,
  payload,
});

export const saveAllLogsAction = (payload) => ({
  type: TasksConstants.TASKS_SAVE_LOGS,
  payload,
});
