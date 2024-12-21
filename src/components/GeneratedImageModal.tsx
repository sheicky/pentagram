import { Check, X } from 'lucide-react';

interface GeneratedImageModalProps {
  imageUrl: string;
  onSave: () => void;
  onDiscard: () => void;
}

export default function GeneratedImageModal({
  imageUrl,
  onSave,
  onDiscard,
}: GeneratedImageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#141414] rounded-2xl overflow-hidden max-w-2xl w-full">
        <div className="p-4">
          <img src={imageUrl} alt="Generated artwork" className="w-full rounded-lg" />
        </div>
        <div className="flex justify-center gap-4 p-4 border-t border-gray-800">
          <button
            onClick={onDiscard}
            className="px-6 py-2 rounded-lg flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <X size={20} />
            Discard
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 rounded-lg flex items-center gap-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
          >
            <Check size={20} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 