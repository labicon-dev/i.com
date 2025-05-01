import { useEffect, useState } from 'react';
import SafeView from '../../components/safe-view.jsx';
import { fetchMembers } from '../../lib/actions.js';
import Membro from './Membro.jsx';

const QuemSomos = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const members = await fetchMembers();
      setMembers(members);
    };

    fetchData();
  }, []);

  return (
    <SafeView classes="px-20 py-10 flex flex-col bg-white" id="equipe">
      <h2 className="font-bold text-3xl md:text-5xl mb-4 pt-4">
        <span className="text-main">
          QUEM <span className="text-cinza">SOMOS NÓS?</span>{' '}
        </span>
      </h2>
      <div className="mt-10">
        <span className="text-md md:text-xl md:text-justify">
          Acima de tudo, somos um conjunto de pessoas interessadas em realizar
          pesquisa e desenvolver projetos interdisciplinares envolvendo novas
          tecnologias.
        </span>
      </div>
      <div className="flex flex-wrap mt-10 gap-3 justify-center">
        {members &&
          members.map(
            (member) =>
              member.activeOnWebsite && (
                <Membro
                  key={member.id}
                  nome={member.name}
                  activity={member.activity}
                  avatarUrl={member.avatarUrl}
                />
              ),
          )}
      </div>
    </SafeView>
  );
};

export default QuemSomos;
