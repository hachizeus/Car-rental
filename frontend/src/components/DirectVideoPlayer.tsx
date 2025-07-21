import { useState, useEffect, useRef } from 'react';

interface DirectVideoPlayerProps {
  videoUrl: string;
  className?: string;
}

export const DirectVideoPlayer = ({ videoUrl, className = '' }: DirectVideoPlayerProps) => {
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Generate different format URLs to try
  const mp4Url = videoUrl.includes('?') ? `${videoUrl}&tr=f-mp4` : `${videoUrl}?tr=f-mp4`;
  const originalUrl = videoUrl;
  
  useEffect(() => {
    // Reset error state when URL changes
    setError(false);
    
    // Try to load the video
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);
  
  const handleError = () => {
    console.error(`Error loading video: ${videoUrl}`);
    setError(true);
  };
  
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-black rounded-xl ${className}`}>
        <div className="text-white text-center p-4">
          <p className="mb-2">Unable to play this video</p>
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Open video in new tab
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full rounded-xl object-contain bg-black"
        autoPlay
        muted
        loop
        playsInline
        controls
        crossOrigin="anonymous"
        onError={handleError}
      >
        {/* Try multiple sources in different formats */}
        <source src={mp4Url} type="video/mp4" />
        <source src={originalUrl} type="video/mp4" />
        <source src={originalUrl} type="video/webm" />
        <p>Your browser doesn't support HTML5 video</p>
      </video>
    </div>
  );
};