export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface FetchPostsResponse {
  data: Post[];
  hasMore: boolean;
}
