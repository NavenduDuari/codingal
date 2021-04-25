import { ActionTypes } from './types';
import { Action, PostI } from '../../types';

export const getPostsAction = (page: number): Action<ActionTypes> => ({
  type: ActionTypes.GET_POSTS,
  payload: {
    page,
  },
});

export const onReceivePosts = (posts: PostI[]): Action<ActionTypes> => ({
  type: ActionTypes.ON_RECEIVE_POSTS,
  payload: {
    posts,
  },
});

export const clearPostsAction = (): Action<ActionTypes> => ({
  type: ActionTypes.CLEAR_POSTS,
  payload: {},
});

export const changeIsLoadingAction = (
  isLoading: boolean
): Action<ActionTypes> => ({
  type: ActionTypes.CHANGE_IS_LOADING,
  payload: {
    isLoading,
  },
});
