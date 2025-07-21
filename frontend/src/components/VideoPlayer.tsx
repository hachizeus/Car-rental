import { useState, useEffect } from 'react';
import { debug } from '@/lib/debug';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer = ({ src, className = '' }: VideoPlayerProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset states when src changes
    setError(false);
    setLoading(true);
  }, [src]);

  const handleError = () => {
    debug.error(`Error loading video: ${src}`);
    setError(true);
    setLoading(false);
  };

  const handleLoadedData = () => {
    debug.log(`Video loaded successfully: ${src}`);
    setLoading(false);
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 rounded-xl ${className}`} style={{ minHeight: '200px' }}>
        <p className="text-white text-center p-4">
          Unable to load video. The format may not be supported or the video may no longer be available.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <video
        controls
        controlsList="nodownload"
        className={`w-full rounded-xl shadow-lg bg-black ${className}`}
        style={{ objectFit: 'contain' }}
        preload="metadata"
        onError={handleError}
        onLoadedData={handleLoadedData}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <p className="text-center text-gray-500 p-8">Video format not supported by your browser</p>
      </video>
    </div>
  );
};