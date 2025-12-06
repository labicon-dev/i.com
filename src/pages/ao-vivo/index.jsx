import SafeView from '../../components/safe-view.jsx';
import Camera from './camera.jsx';

const AoVivo = () => {
  return (
    <SafeView id="aovivo" classes="bg-cinza items-center py-5 pb-16">
      <h2 className="font-bold text-3xl md:text-5xl mb-4 pt-4 text-main">
        AO VIVO
      </h2>
      <div className="flex justify-center mt-10">
        <Camera />
      </div>
    </SafeView>
  );
};

export default AoVivo;
