import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VideoFallbackProps {
  videoUrl: string;
  className?: string;
}

export const VideoFallback = ({ videoUrl, className = '' }: VideoFallbackProps) => {
  const [showVideo, setShowVideo] = useState(false);
  
  if (!showVideo) {
    return (
      <div className={`relative flex items-center justify-center bg-gray-800 rounded-xl ${className}`} style={{ minHeight: '200px' }}>
        <Button 
          onClick={() => setShowVideo(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white"
        >
          <Play className="mr-2 h-4 w-4" /> Play Video
        </Button>
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute bottom-2 text-xs text-gray-300 hover:text-white underline"
        >
          Open in new tab
        </a>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <iframe
        src={videoUrl}
        className="w-full h-full rounded-xl"
        style={{ minHeight: '200px' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video player"
      />
      <Button
        onClick={() => setShowVideo(false)}
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
      >
        Close
      </Button>
    </div>
  );
};