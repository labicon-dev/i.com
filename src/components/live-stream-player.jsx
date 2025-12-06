import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const LiveStreamPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const streamUrl = 'https://cdn.icon.ufba.br/stream/live/stream/index.m3u8';

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
    <div
      className="video-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        background: '#000',
      }}>
      <video
        ref={videoRef}
        controls
        muted
        playsInline
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onPlay={() => setIsPlaying(true)}
      />

      {isPlaying && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'red',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}>
          LIVE
        </div>
      )}
    </div>
  );
};

export default LiveStreamPlayer;
