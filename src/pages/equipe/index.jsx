import { useEffect, useState } from 'react';
import SafeView from '../../components/safe-view.jsx';
import { fetchMembers } from '../../lib/actions.js';
import Membro from './membro.jsx';

const QuemSomos = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const members = await fetchMembers();
        setMembers(members);
      } catch (err) {
        console.error('Error loading members:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
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

      {loading && (
        <div className="mt-10 text-center">
          <p className="text-cinza">Carregando membros...</p>
        </div>
      )}

      {error && (
        <div className="mt-10 text-center">
          <p className="text-red-500">
            Erro ao carregar membros. Tente novamente mais tarde.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 justify-center items-center">
          {members && members.length > 0 ? (
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
            )
          ) : (
            <div className="col-span-full text-center">
              <p className="text-cinza">Nenhum membro encontrado.</p>
            </div>
          )}
        </div>
      )}
    </SafeView>
  );
};

export default QuemSomos;
