/**
 * @fileinfo
 *
 * Actions are dispatched from rendering component and consumed by either saga / reducer or both
 */

import { ActionTypes } from './types';
import { Action, PostI, IsPostLoading } from '../../types';

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
  isLoading: IsPostLoading
): Action<ActionTypes> => ({
  type: ActionTypes.CHANGE_IS_LOADING,
  payload: {
    isLoading,
  },
});
