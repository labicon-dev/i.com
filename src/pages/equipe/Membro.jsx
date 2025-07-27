import * as PropTypes from 'prop-types';
import { Component } from 'react';

class Membro extends Component {
  render() {
    let { nome, activity, avatarUrl } = this.props;
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap size-52">
          <img
            className="p-0.5 object-cover size-full rounded-md"
            src={avatarUrl}
            alt={`Avatar de ${nome}`}
            crossOrigin="use-credentials"
          />
        </div>
        <div className="my-3 text-center">
          <h3 className="text-cinza">{nome}</h3>
          <p className="text-[#939AA2] text-xs">{activity}</p>
        </div>
      </div>
    );
  }
}

Membro.propTypes = {
  nome: PropTypes.string,
  activity: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default Membro;
