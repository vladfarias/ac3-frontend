import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './contatoEstilo.css'; // Importa o arquivo CSS

export default function Contato() {
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [reclamacao, setReclamacao] = useState('');
    const [_, setDataPost] = useState({});

    function resetForm() {
        setNome('');
        setTel('');
        setEmail('');
        setReclamacao('');
      }

   async function enviarReclamacao(event){

        event.preventDefault() // previne o comportamento padrão do form de recarregar a página

        const request = new Request("http://127.0.0.1:5000//contato", {
            mode:"cors",
        });

        const requestConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ nome, tel, email, reclamacao }),
          // mode:'no-cors'
        };

       await fetch(request, requestConfig)
        .then(resp => resp.json())
        .then(data =>{ 
            setDataPost(data)
            resetForm();}).catch(error => {
                console.log(error);
            })
    }

  return (
    <>
      <header>
        <p>
          {/* <Link to="/home">Home</Link> */}
        </p>
     </header>
      <form name="contatoForm" onSubmit={enviarReclamacao}>
        <h1>Entre em contato</h1>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nomeid"
          placeholder="Nina Flôr"
          required="required"
          name="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}

        /><br></br>
        <label htmlFor="fone" id="foneIdLabel">Tel</label>
        <input
          type="tel"
          id="foneid"
          placeholder="(xx)xx-xx-xx-xx"
          name="fone"
          value={tel}
          onChange={e => setTel(e.target.value)}
        /><br></br>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="emailid"
          placeholder="fulano@mail.com"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br></br>
        <textarea placeholder="Deixe aqui sua reclamação..."
        value={reclamacao}
        onChange={e => setReclamacao(e.target.value)}
        ></textarea>
        <input
          type="submit"
          className="enviar"
        /><br></br>
      </form>
    </>
  );
};
