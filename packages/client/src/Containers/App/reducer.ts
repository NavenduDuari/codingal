import { Action } from '../../types';
import { ActionTypes, StoreStateI } from './types';

const INITIAL_STATE: StoreStateI = {};

const appReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.TEST_ACTION:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default appReducer;
