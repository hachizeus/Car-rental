import { useState, useEffect, useRef } from 'react';
import { debug } from '@/lib/debug';
import { getProxiedVideoUrl } from '@/lib/videoProxy';
import { VideoFallback } from './VideoFallback';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer = ({ src: originalSrc, className = '' }: VideoPlayerProps) => {
  // Process the source URL to handle CORS issues
  const src = getProxiedVideoUrl(originalSrc);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset states when src changes
    setError(false);
    setLoading(true);
    
    // Add crossOrigin attribute to fix CORS issues
    if (videoRef.current) {
      videoRef.current.crossOrigin = "anonymous";
    }
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
    return <VideoFallback videoUrl={originalSrc} className={className} />;
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        className={`w-full rounded-xl shadow-lg bg-black ${className}`}
        style={{ objectFit: 'contain' }}
        preload="metadata"
        crossOrigin="anonymous"
        onError={handleError}
        onLoadedData={handleLoadedData}
      >
        <source src={src} type="video/mp4" />
        <source src={originalSrc} type="video/mp4" />
        <source src={src} type="video/webm" />
        <p className="text-center text-gray-500 p-8">Video format not supported by your browser</p>
      </video>
    </div>
  );
};