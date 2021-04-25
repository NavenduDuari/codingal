/**
 * @fileinfo
 *
 * Manges sideeffect for App Container. Since reducer / action is pure components, we need a way
 * to manage sideeffects for the container.
 *
 * A sideeffect could be an XMLHTTPRequest, LocalStorage mutation, WebSocket connection etc.
 *
 * TODO Request to the server is sent here from axios directly. In a more extensive setup
 * the mechanism of
 * - sending request
 * - parsing response
 * - refreshing auth token
 * - retrying in case of failure
 * - error handling
 * should be done from a central lib (namely RequestManager)
 */

import { takeLatest, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './types';
import { Action, IsPostLoading, POST_COUNT_PER_PAGE } from '../../types';
import { onReceivePosts, changeIsLoadingAction } from './action';

function getPosts() {
  return function* (action: Action<ActionTypes>) {
    try {
      yield put(changeIsLoadingAction(IsPostLoading.Loading));
      const page = action.payload?.page;
      const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POST_COUNT_PER_PAGE}`;
      const response: AxiosResponse = yield call(axios.get, url);
      const posts = response.data;
      if (response.status !== 200 || !posts.length) {
        throw new Error('Service request failed');
      }
      yield put(onReceivePosts(posts));
    } catch (err) {
      console.error(err);
      yield put(changeIsLoadingAction(IsPostLoading.End));
    }
  };
}

export default function* appSaga() {
  yield takeLatest(ActionTypes.GET_POSTS, getPosts());
}
