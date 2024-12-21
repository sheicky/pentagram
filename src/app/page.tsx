"use client";

import { useState } from "react";
import SavedImagesGrid from "@/components/SavedImagesGrid";
import GeneratedImageModal from "@/components/GeneratedImageModal";

interface SavedImage {
  id: string;
  url: string;
  likes: number;
  comments: {
    id: string;
    text: string;
    author: string;
    timestamp: string;
  }[];
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to generate image");
      }
      
      if (data.imageUrl) {
        const img = new Image();
        img.onload = () => {
          setNewImageUrl(data.imageUrl);
        };
        img.src = data.imageUrl;
      }

      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveImage = () => {
    if (newImageUrl) {
      setSavedImages(prev => [{
        id: crypto.randomUUID(),
        url: newImageUrl,
        likes: 0,
        comments: []
      }, ...prev]);
      setNewImageUrl(null);
    }
  };

  const handleDeleteImage = (id: string) => {
    setSavedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleLikeImage = (id: string) => {
    setSavedImages(prev => prev.map(img => 
      img.id === id ? { ...img, likes: img.likes + 1 } : img
    ));
  };

  const handleAddComment = (imageId: string, comment: string) => {
    setSavedImages(prev => prev.map(img => 
      img.id === imageId ? {
        ...img,
        comments: [...img.comments, {
          id: crypto.randomUUID(),
          text: comment,
          author: 'User',
          timestamp: new Date().toLocaleString()
        }]
      } : img
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] bg-opacity-95 text-gray-100">
      <header className="w-full backdrop-blur-sm bg-black/20 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            PENTAGRAM
          </h1>
          <p className="text-center text-gray-400 mt-2">Create and share amazing AI-generated artwork</p>
        </div>
      </header>

      <main className="flex-1 py-8">
        <SavedImagesGrid
          images={savedImages}
          onDelete={handleDeleteImage}
          onLike={handleLikeImage}
          onAddComment={handleAddComment}
        />
      </main>

      {newImageUrl && (
        <GeneratedImageModal
          imageUrl={newImageUrl}
          onSave={handleSaveImage}
          onDiscard={() => setNewImageUrl(null)}
        />
      )}

      <footer className="sticky bottom-0 w-full backdrop-blur-sm bg-black/20 p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 p-4 rounded-xl bg-[#141414] border border-gray-800/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100 shadow-xl transition-all duration-300 placeholder-gray-400"
                placeholder="Describe the image you want to generate..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-indigo-500/20 font-medium tracking-wide"
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4 text-sm text-gray-400">
            Made with ❤️ by Sheick
          </div>
        </div>
      </footer>
    </div>
  );
}
