import { Post } from './types';

interface PostCardProps {
  post: Post;
  isLast: boolean;
  innerRef?: (node: HTMLDivElement | null) => void;
}

const PostCard = ({ post, isLast, innerRef }: PostCardProps) => (
  <div
    ref={isLast ? innerRef : null}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {post.title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mb-3">
      {post.body}
    </p>
    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
      <span>Post ID: {post.id}</span>
      <span>User ID: {post.userId}</span>
    </div>
  </div>
);

export default PostCard;
