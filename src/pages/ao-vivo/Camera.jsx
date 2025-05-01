const Camera = () => {
  return (
    <div className="aspect-video flex items-center justify-center w-full max-w-[80vw] md:max-w-[800px]">
      <iframe
        src="https://www.myearthcam.com/barretto?embed"
        scrolling="no"
        className="bg-main w-full aspect-[4/3]"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen={false}></iframe>
    </div>
  );
};

export default Camera;
