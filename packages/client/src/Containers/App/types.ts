/**
 * @fileinfo
 *
 * Local types required from App container. All the objects types needs to be mentioned here.
 * We try not to use any as much as possible.
 */

import { IsPostLoading, PostI } from '../../types';

/*
 * Actions which is dispatched by the rendering component and captured by saga / reducer
 */
export enum ActionTypes {
  GET_POSTS = 'get-posts',
  ON_RECEIVE_POSTS = 'on-receive-posts',
  CLEAR_POSTS = 'clear-posts',
  CHANGE_IS_LOADING = 'change-is-loading',
}

/*
 * Types of the part of the redux state which would be available as a prop to the rendering
 * component
 */
export interface MapStateToPropsI {
  posts: PostI[];
  isLoading: IsPostLoading;
}

export interface MapDispatchToPropsI {
  getPosts: (page: number) => void;
  clearPosts: () => void;
}

/*
 * Type of the own props of the component which is passed by the parent component which is
 * mounting this component
 */
export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

/*
 * Local state of the container. Any state which is required inside the rendering component
 * needs to have a type here.
 */
export interface ComponentStateI {}

export interface StoreStateI {
  posts: PostI[];
  isLoading: IsPostLoading;
}
