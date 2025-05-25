import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface CommentUser {
  _id: string;
  name: string;
  profilePicture: string;
}

interface Comment {
  _id: string;
  text: string;
  user: CommentUser;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-2 text-sm">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {comments.map((comment) => (
        <div key={comment._id} className="flex space-x-3">
          <Link to={`/profile/${comment.user._id}`}>
            {comment.user.profilePicture ? (
              <img 
                src={comment.user.profilePicture} 
                alt={comment.user.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </Link>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <Link to={`/profile/${comment.user._id}`} className="font-medium text-gray-900">
                {comment.user.name}
              </Link>
              <p className="text-gray-800 text-sm">{comment.text}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;