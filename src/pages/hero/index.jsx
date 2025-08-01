import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { useP5Background } from '../../hooks/useP5Background';

const Index = () => {
  const canvasRef = useP5Background();

  return (
    <section className="h-full w-full flex items-center justify-center relative">
      <div ref={canvasRef} className="absolute inset-0 z-0" />
      <div
        id="home"
        className="flex flex-col min-w-[80vw] max-w-5xl min-h-[90vh] max-h-[90vh] items-center justify-center -translate-y-10 gap-9 py-6 px-4 sm:px-10 z-10 relative">
        <div className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl text-main font-bold text-center">
          <p>
            <span className="text-white">Lab</span>oratorio de
          </p>
          <p>
            <span className="text-white">I</span>nteratividade,
          </p>
          <p>
            <span className="text-white">CO</span>mputação e
          </p>
          <p>
            <span className="text-white">N</span>ovas Interfaces
          </p>
        </div>
        <p className="text-white text-xl sm:text-2xl text-center">
          Estamos voltados para a{' '}
          <span className="font-bold">
            pesquisa, desenvolvimento e inovação
          </span>{' '}
          em
          <span className="font-bold text-main">
            {' '}
            arte, ciência e tecnologia.
          </span>{' '}
          Focamos na aplicação de técnicas computacionais aplicadas, sobretudo,
          ao desenvolvimento de novas interfaces e sistemas interativos
          envolvendo Inteligência Artificial.
        </p>
        <a
          href="#about"
          className="flex items-center text-white text-2xl hover:text-main">
          <IoChevronDownCircleOutline size={20} />
          <span className="ml-2">Saiba mais</span>
        </a>
      </div>
    </section>
  );
};

export default Index;
