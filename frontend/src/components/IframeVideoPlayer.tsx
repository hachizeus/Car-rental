interface IframeVideoPlayerProps {
  videoUrl: string;
  className?: string;
}

export const IframeVideoPlayer = ({ videoUrl, className = '' }: IframeVideoPlayerProps) => {
  // Create a direct embed URL for the video
  const embedUrl = videoUrl.includes('imagekit.io') 
    ? `https://ik.imagekit.io/pz75ydgck/embed?url=${encodeURIComponent(videoUrl)}`
    : videoUrl;
  
  return (
    <div className={`relative ${className}`}>
      <iframe
        src={embedUrl}
        className="w-full h-full rounded-xl"
        style={{ minHeight: '300px' }}
        frameBorder="0"
        allowFullScreen
        title="Video player"
      />
    </div>
  );
};