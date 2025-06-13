import { Post } from './types';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingSpinner';
import EndOfList from './EndOfList';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  lastPostRef: (node: HTMLDivElement | null) => void;
  error: string | null;
}

const PostList = ({ posts, loading, hasMore, lastPostRef, error }: PostListProps) => (
  <div className="space-y-6">
    {error && (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
        {error}
      </div>
    )}

    {posts.map((post, index) => (
      <PostCard
        key={post.id}
        post={post}
        isLast={index === posts.length - 1}
        innerRef={lastPostRef}
      />
    ))}

    {loading && <LoadingSpinner />}
    {!loading && !hasMore && posts.length > 0 && <EndOfList />}
  </div>
);

export default PostList;
