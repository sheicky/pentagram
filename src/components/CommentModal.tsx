import { useState } from 'react';
import { X } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

interface CommentModalProps {
  imageId: string;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (imageId: string, comment: string) => void;
}

export default function CommentModal({ imageId, comments, onClose, onAddComment }: CommentModalProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(imageId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#141414] rounded-2xl overflow-hidden max-w-lg w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Comments</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-black/20 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <span className="font-medium text-indigo-400">{comment.author}</span>
                <span className="text-xs text-gray-400">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-gray-200">{comment.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-black/20 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 