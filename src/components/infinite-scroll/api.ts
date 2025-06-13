import { Post, FetchPostsResponse } from './types';

const API_DELAY = 800;
const TOTAL_POSTS = 50;
const POSTS_PER_PAGE = 10;

export const fetchPosts = async (page: number): Promise<FetchPostsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  
  const mockPosts: Post[] = Array.from({ length: POSTS_PER_PAGE }, (_, i) => {
    const postNumber = start + i + 1;
    return {
      id: postNumber,
      title: `Post ${postNumber}`,
      body: `This is the body of post ${postNumber}. It contains some sample content to demonstrate infinite scrolling.`,
      userId: Math.floor(Math.random() * 10) + 1,
    };
  });
  
  const hasMore = end < TOTAL_POSTS;
  
  return { data: mockPosts, hasMore };
};
