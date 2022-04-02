import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css'

import api from './servises/api';

function App() {

  const [input, setInput] = useState('');
  const[cep, setCep] = useState({});
  
  async function handleSearch() {
//40015970/json/

    if(input=== ''){
      alert("Preencha Algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    }catch{
      alert("Ops.. Erro ao Buscar");
      setInput('')

    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={20} color="white" />
        </button>
      </div>
      {Object.keys(cep).length > 1 &&(

        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span> DDD: 0{cep.ddd}</span>

        </main>

      )}
      

    </div>
  );
}

export default App;