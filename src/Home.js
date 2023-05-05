import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Contato from './Contato';
import './homeEstilo.css';

export default function Home() {
  const [reclamacoes, setReclamacoes] = useState([]);

  const getReclamacoesData = async () => {
    const requestInfo = new Request("http://127.0.0.1:5000/data", {
      mode: "cors",
    });
    const requestConfig = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(requestInfo, requestConfig).then((resp) =>
      resp.json()
    );
    setReclamacoes(response);
  };

  return (
    <>
      <header className="Home-header">
        <p>
          <Link to="/home">HOME</Link>
        </p>
        <p>
          <Link to="/contato">Contato</Link>
        </p>
      </header>
      <main>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/contato" component={Contato} />
        </Switch>
      </main>
      <div className="homeDiv">
        <ul className='homeUlReclamacao'>
          {reclamacoes.map((reclamacao) => (
            <li className="homeLi" key={reclamacao.id}><strong>{reclamacao.nome}</strong>: 
            Reclamação - {reclamacao.reclamacao}</li>
          ))}
        </ul>
        <button onClick={getReclamacoesData}>Listar</button>
      </div>
    </>
  );
}
