import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Image } from 'lucide-react';
import { usePostStore } from '../../store/postStore';

const PostForm = () => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPost } = usePostStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error('Post cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createPost(text);
      setText('');
      toast.success('Post created successfully');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        
        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            className="text-gray-500 hover:text-blue-600 transition-colors flex items-center space-x-1"
            disabled
          >
            <Image className="w-5 h-5" />
            <span className="text-sm">Add Image</span>
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;