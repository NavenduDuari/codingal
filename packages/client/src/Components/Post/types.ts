import { PostI } from '../../types';

export interface ComponentPropsI {
  getPosts: (page: number) => void;
  isLoading: boolean;
  clearPosts: () => void;
  posts: PostI[];
}

export interface ComponentStateI {
  currentPageNo: number;
}
