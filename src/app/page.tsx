"use client";

import { useState } from "react";


export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
          setImageUrl(data.imageUrl);
        };
        img.src = data.imageUrl;
      }

      console.log(data);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // TODO: Update the UI here to show the images generated
    
    <div className="min-h-screen flex flex-col justify-between p-8 bg-[#0A0A0A] bg-opacity-95 text-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center">
      {imageUrl && (
         <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm bg-black/30 p-2">
          <img src={imageUrl ?? ""} alt="Generated Image" className="w-full h-auto rounded-lg" />
         </div>
         )}
         </main>

      <footer className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-black/20 p-6 rounded-xl">
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
      </footer>
    </div>
  );
}
