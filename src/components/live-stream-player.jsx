import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const LiveStreamPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const streamUrl = 'https://cdn.icon.ufba.br/stream/live/stream/index.m3u8';
  const logoUrl =
    'https://cdn.icon.ufba.br/logo/full-large-white-transparent.png';

  useEffect(() => {
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        videoRef.current.play().catch(() => console.log('Autoplay blocked'));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Network error, trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = streamUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-black rounded-lg overflow-hidden shadow-2xl group font-sans">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        className="h-full"
        onPlay={() => setIsPlaying(true)}
      />

      <div className="absolute top-5 right-5 z-10 pointer-events-none drop-shadow-md">
        <img src={logoUrl} alt="Lab Logo" className="h-10 opacity-80" />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end p-5 transition-opacity duration-300">
        <div className="flex items-center bg-red-600/90 px-2 py-1 rounded mb-1 backdrop-blur-sm">
          {isPlaying && (
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          )}
          <span className="text-white text-xs font-bold tracking-widest uppercase">
            {isPlaying ? 'AO VIVO' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamPlayer;
