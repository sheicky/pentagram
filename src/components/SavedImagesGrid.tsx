import { useState } from 'react';
import { Heart, MessageCircle, Share2, Trash2 } from 'lucide-react';
import CommentModal from './CommentModal';
import ImageViewerModal from './ImageViewerModal';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

interface SavedImage {
  id: string;
  url: string;
  likes: number;
  comments: Comment[];
}

interface SavedImagesGridProps {
  images: SavedImage[];
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  onAddComment: (imageId: string, comment: string) => void;
}

export default function SavedImagesGrid({ images, onDelete, onLike, onAddComment }: SavedImagesGridProps) {
  const [activeCommentModal, setActiveCommentModal] = useState<string | null>(null);
  const [viewerImage, setViewerImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto p-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="relative overflow-hidden rounded-xl cursor-pointer">
              <img
                src={image.url}
                alt="Generated artwork"
                className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-105"
                onClick={() => setViewerImage(image.url)}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLike(image.id);
                      }}
                      className="text-white hover:text-pink-500 transition-colors flex items-center"
                    >
                      <Heart size={24} />
                      <span className="ml-1">{image.likes}</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCommentModal(image.id);
                      }}
                      className="text-white hover:text-blue-500 transition-colors flex items-center"
                    >
                      <MessageCircle size={24} />
                      <span className="ml-1">{image.comments.length}</span>
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="text-white hover:text-green-500 transition-colors"
                    >
                      <Share2 size={24} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(image.id);
                    }}
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeCommentModal && (
        <CommentModal
          imageId={activeCommentModal}
          comments={images.find(img => img.id === activeCommentModal)?.comments || []}
          onClose={() => setActiveCommentModal(null)}
          onAddComment={onAddComment}
        />
      )}

      {viewerImage && (
        <ImageViewerModal
          imageUrl={viewerImage}
          onClose={() => setViewerImage(null)}
        />
      )}
    </>
  );
} 