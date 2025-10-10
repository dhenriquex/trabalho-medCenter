import style from "../style.module.css";

export const ConsultarUsuario = () => {
  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">Buscar por CPF ou Email</label>
        <input type="text" placeholder="Digite o CPF ou email" />
      </div>
      <button className={style.btn}>Buscar Usuário</button>
      <div className={style.resultados}>
        <p>Os resultados aparecerão aqui...</p>
      </div>
    </>
  );
};
