import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Trash2, User } from 'lucide-react';
import { Post, usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { toast } from 'react-hot-toast';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const { likePost, unlikePost, deletePost } = usePostStore();
  const { user } = useAuthStore();

  if (!user) return null;

  const isLiked = post.likes.includes(user._id);
  const isOwnPost = post.user._id === user._id;

  const handleLikeToggle = () => {
    if (isLiked) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post._id);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Link to={`/profile/${post.user._id}`} className="flex items-center">
            {post.user.profilePicture ? (
              <img 
                src={post.user.profilePicture} 
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="ml-3">
              <p className="font-medium text-gray-900">{post.user.name}</p>
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </Link>
          
          {isOwnPost && (
            <button 
              onClick={handleDelete}
              className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <p className="text-gray-800 mb-4 whitespace-pre-line">{post.text}</p>
        
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button 
            onClick={handleLikeToggle}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            } transition-colors`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes.length}</span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
      
      {showComments && (
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <CommentForm postId={post._id} />
          <CommentList comments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default PostCard;