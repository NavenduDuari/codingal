import { Action } from '../../types';
import { ActionTypes, StoreStateI } from './types';

const INITIAL_STATE: StoreStateI = {
  posts: [],
  isLoading: false,
};

const appReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_RECEIVE_POSTS:
      console.log(action);
      return {
        ...state,
        posts: [...state.posts, ...action.payload?.posts],
        isLoading: false,
      };

    case ActionTypes.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };

    case ActionTypes.CHANGE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
      };

    default:
      return state;
  }
};

export default appReducer;
