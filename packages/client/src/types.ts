export interface Action<T> {
  type: T;
  payload?: Record<string, any>;
}

export interface PostI {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const POST_COUNT_PER_PAGE = 10;

export enum IsPostLoading {
  Loading = 'loading',
  NotLoading = 'notLoading',
  End = 'end',
}
