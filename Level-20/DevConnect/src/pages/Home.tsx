import { useEffect, useState } from 'react';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import PostCard from '../components/posts/PostCard';
import PostForm from '../components/posts/PostForm';

const Home = () => {
  const { posts, loading, fetchPosts } = usePostStore();
  const { user } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {user && <PostForm />}
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Latest Posts</h2>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center"
        >
          {isRefreshing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </span>
          ) : (
            'Refresh'
          )}
        </button>
      </div>
      
      {loading && !posts.length ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No posts yet. Be the first to post something!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;