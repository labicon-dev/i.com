import About from './pages/about';
import AoVivo from './pages/ao-vivo';
import AreaInteresse from './pages/areas-de-interesse';
import Contato from './pages/contato';
import QuemSomos from './pages/equipe';
import Header from './pages/header';
import Hero from './pages/hero';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <QuemSomos />
      <AreaInteresse />
      <AoVivo />
      <Contato />
    </div>
  );
};

export default App;
