import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import PostCard from '../components/posts/PostCard';
import { User } from 'lucide-react';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { userPosts, loading, fetchUserPosts } = usePostStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    if (userId) {
      fetchUserPosts(userId);
    }
  }, [userId, fetchUserPosts]);

  const isOwnProfile = user?._id === userId;

  // For demo purposes, let's just use the current user's data
  const profileUser = isOwnProfile ? user : {
    _id: userId,
    name: 'User', // This would normally come from an API call to get the user by ID
    bio: 'No bio available',
    profilePicture: '',
    createdAt: new Date().toISOString()
  };

  if (!profileUser) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="p-6 -mt-16">
          <div className="flex items-end space-x-4">
            <div className="relative">
              {profileUser.profilePicture ? (
                <img 
                  src={profileUser.profilePicture} 
                  alt={profileUser.name} 
                  className="w-24 h-24 rounded-full border-4 border-white bg-white object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
              <p className="text-sm text-gray-500">
                Joined {new Date(profileUser.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-gray-600 font-medium">Bio</h3>
            <p className="mt-2 text-gray-700">
              {profileUser.bio || 'No bio available.'}
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;