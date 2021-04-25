import { Action, IsPostLoading, PostI } from '../../types';
import { clearPostsAction, onReceivePosts } from './action';
import appReducer, { INITIAL_STATE } from './reducer';
import { ActionTypes, StoreStateI } from './types';

let state: StoreStateI;
beforeEach(() => {
  state = INITIAL_STATE;
});

describe('AppReducer', () => {
  it('should return initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as Action<ActionTypes>)).toEqual(
      expectedResult
    );
  });

  it('should store the received posts', () => {
    const receivedPosts: PostI[] = [
      {
        id: 1,
        userId: 1,
        title: 'test post title1',
        body: 'test post body1',
      },
      {
        id: 2,
        userId: 2,
        title: 'test post title2',
        body: 'test post body2',
      },
    ];
    const updatedState = appReducer(state, onReceivePosts(receivedPosts));
    expect(updatedState.posts).toEqual(receivedPosts);
    expect(updatedState.isLoading).toEqual(IsPostLoading.NotLoading);
  });

  it('should clear all posts', () => {
    const updatedState = appReducer(state, clearPostsAction());
    expect(updatedState.posts).toEqual([]);
  });
});
