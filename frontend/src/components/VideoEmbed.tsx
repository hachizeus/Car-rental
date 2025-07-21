import { useState } from 'react';

interface VideoEmbedProps {
  videoUrl: string;
  className?: string;
}

export const VideoEmbed = ({ videoUrl, className = '' }: VideoEmbedProps) => {
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {!showVideo ? (
        <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl h-full">
          <button
            onClick={() => setShowVideo(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Video
          </button>
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-xs text-gray-300 hover:text-white underline"
          >
            Open in new tab
          </a>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <a 
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
          >
            Click to open video in new tab
          </a>
        </div>
      )}
    </div>
  );
};