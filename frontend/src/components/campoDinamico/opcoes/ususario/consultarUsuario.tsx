// components/ConsultarUsuario.tsx
import { useState } from "react";
import axios from "axios";
import style from "../style.module.css";

// Interface para o tipo Cliente
interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
}

export const ConsultarUsuario = () => {
  const [search, setSearch] = useState("");
  const [resultados, setResultados] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!search.trim()) {
      alert("Digite um CPF ou email para buscar");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<Cliente[]>("http://localhost:8800/clientes/busca", {
        params: { search }
      });
      setResultados(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      alert("Erro ao buscar clientes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.linha}>
        <label>Buscar por CPF ou Email</label>
        <input 
          type="text" 
          placeholder="Digite o CPF ou email" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button className={style.btn} onClick={handleBuscar} disabled={loading}>
        {loading ? "Buscando..." : "Buscar Usuário"}
      </button>
      
      <div className={style.resultados}>
        {resultados.length === 0 ? (
          <p>Os resultados aparecerão aqui...</p>
        ) : (
          <div>
            {resultados.map((cliente) => (
              <div key={cliente.id} className={style.card}>
                <p><strong>Nome:</strong> {cliente.nome}</p>
                <p><strong>CPF:</strong> {cliente.cpf}</p>
                <p><strong>Email:</strong> {cliente.email}</p>
                <p><strong>Telefone:</strong> {cliente.telefone}</p>
                <p><strong>Data Nasc:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};