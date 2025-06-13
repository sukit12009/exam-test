import { useState, useEffect, useCallback, useRef } from 'react';
import { PostList, Post } from '../components/infinite-scroll';
import { fetchPosts } from '../components/infinite-scroll/api';

const InfiniteScrollPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, hasMore: morePosts } = await fetchPosts(page);
        
        // Use a Set to ensure unique posts based on ID
        setPosts(prevPosts => {
          const postIds = new Set(prevPosts.map(post => post.id));
          const newPosts = data.filter(post => !postIds.has(post.id));
          return [...prevPosts, ...newPosts];
        });
        
        setHasMore(morePosts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Infinite Scroll Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Scroll down to load more posts. Currently showing {posts.length} posts.
          </p>
        </div>

        <PostList 
          posts={posts} 
          loading={loading} 
          hasMore={hasMore} 
          lastPostRef={lastPostRef}
          error={error}
        />
      </div>
    </div>
  );
};

export default InfiniteScrollPage;
