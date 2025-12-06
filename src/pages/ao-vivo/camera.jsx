import LiveStreamPlayer from '../../components/live-stream-player';

const Camera = () => {
  return (
    <div className="aspect-video flex items-center justify-center w-full max-w-[80vw] md:max-w-[800px]">
      <LiveStreamPlayer />
    </div>
  );
};

export default Camera;
