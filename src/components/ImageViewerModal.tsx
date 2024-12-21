import { X } from 'lucide-react';

interface ImageViewerModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageViewerModal({ imageUrl, onClose }: ImageViewerModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X size={24} />
        </button>
        <img
          src={imageUrl}
          alt="Enlarged view"
          className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg object-contain"
        />
      </div>
    </div>
  );
} 