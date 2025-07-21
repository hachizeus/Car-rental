interface AutoplayVideoProps {
  videoUrl: string;
  className?: string;
}

export const AutoplayVideo = ({ videoUrl, className = '' }: AutoplayVideoProps) => {
  return (
    <div className={`relative ${className}`}>
      <video
        src={videoUrl}
        className="w-full h-full rounded-xl object-contain bg-black"
        autoPlay
        muted
        loop
        playsInline
        controls
      />
    </div>
  );
};