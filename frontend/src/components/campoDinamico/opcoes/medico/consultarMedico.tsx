import style from "../style.module.css";

export const ConsultarMedico = () => {
  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">Buscar por CRM ou Nome</label>
        <input type="text" placeholder="Digite o CRM ou nome" />
      </div>
      <div className={style.linha}>
        <label htmlFor="">Especialidade</label>
        <select>
          <option value="">Todas</option>
          <option value="cardiologia">Cardiologia</option>
          <option value="dermatologia">Dermatologia</option>
          <option value="pediatria">Pediatria</option>
          <option value="ortopedia">Ortopedia</option>
        </select>
      </div>
      <button className={style.btn}>Buscar Médico</button>

      <div className={style.resultados}>
        <p>Os resultados aparecerão aqui...</p>
      </div>
    </>
  );
};
