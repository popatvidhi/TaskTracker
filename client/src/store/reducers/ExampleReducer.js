import produce from 'immer';
import { ExampleConstants } from '../actionTypes/ExampleActionTypes';

const initialState = {
  value: '',
};

const exampleReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ExampleConstants.SAVE_EXAMPLE:
        draft.value = action.payload;
        break;
      default:
        break;
    }
  });

export default exampleReducer;
