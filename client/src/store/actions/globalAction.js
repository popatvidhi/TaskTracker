import { GlobalConstants } from '../actionTypes/globalActionTypes';


/**
 * 
 * global actions
 * 
 */

export const setNotificationDataAction = (payload) => ({
  type: GlobalConstants.SET_NOTIFICATION,
  payload,
});

export const resetNotificationDataAction = (payload) => ({
  type: GlobalConstants.RESET_NOTIFICATION,
  payload,
});
