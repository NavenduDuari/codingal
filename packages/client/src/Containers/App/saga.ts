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
      console.log(response);
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
