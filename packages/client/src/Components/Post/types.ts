import { IsPostLoading, PostI } from '../../types';

export interface ComponentPropsI {
  getPosts: (page: number) => void;
  isLoading: IsPostLoading;
  clearPosts: () => void;
  posts: PostI[];
}

export interface ComponentStateI {
  currentPageNo: number;
}
