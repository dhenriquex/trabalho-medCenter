import { useState } from "react";
import axios from "axios";
import style from "../style.module.css";

interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
}

export const ConsultarMedico = () => {
  const [search, setSearch] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [resultados, setResultados] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!search && !especialidade) {
      alert("Preencha pelo menos um campo de busca");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<Medico[]>("http://localhost:8800/medicos/busca", {
        params: { search, especialidade }
      });
      setResultados(response.data);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      alert("Erro ao buscar médicos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.linha}>
        <label>Buscar por CRM ou Nome</label>
        <input 
          type="text" 
          placeholder="Digite o CRM ou nome" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style.linha}>
        <label>Especialidade</label>
        <select 
          value={especialidade} 
          onChange={(e) => setEspecialidade(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="cardiologia">Cardiologia</option>
          <option value="dermatologia">Dermatologia</option>
          <option value="pediatria">Pediatria</option>
          <option value="ortopedia">Ortopedia</option>
        </select>
      </div>
      <button className={style.btn} onClick={handleBuscar} disabled={loading}>
        {loading ? "Buscando..." : "Buscar Médico"}
      </button>

      <div className={style.resultados}>
        {resultados.length === 0 ? (
          <p>Os resultados aparecerão aqui...</p>
        ) : (
          <div>
    
            {resultados.map((medico) => (
              <div key={medico.id} className={style.card}>
                <p><strong>Nome:</strong> {medico.nome}</p>
                <p><strong>CRM:</strong> {medico.crm}</p>
                <p><strong>Especialidade:</strong> {medico.especialidade}</p>
                <p><strong>Telefone:</strong> {medico.telefone}</p>
                <p><strong>Email:</strong> {medico.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};