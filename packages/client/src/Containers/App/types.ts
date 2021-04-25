import { IsPostLoading, PostI } from '../../types';

export enum ActionTypes {
  GET_POSTS = 'get-posts',
  ON_RECEIVE_POSTS = 'on-receive-posts',
  CLEAR_POSTS = 'clear-posts',
  CHANGE_IS_LOADING = 'change-is-loading',
}

export interface MapStateToPropsI {
  posts: PostI[];
  isLoading: IsPostLoading;
}

export interface MapDispatchToPropsI {
  getPosts: (page: number) => void;
  clearPosts: () => void;
}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {}

export interface StoreStateI {
  posts: PostI[];
  isLoading: IsPostLoading;
}
