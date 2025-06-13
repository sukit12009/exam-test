import { Post, FetchPostsResponse } from './types';

const POSTS_PER_PAGE = 10;
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async (page: number): Promise<FetchPostsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}?_page=${page}&_limit=${POSTS_PER_PAGE}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data: Post[] = await response.json();
    const totalPosts = parseInt(response.headers.get('x-total-count') || '0', 10);
    const hasMore = page * POSTS_PER_PAGE < totalPosts;
    
    return { data, hasMore };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
