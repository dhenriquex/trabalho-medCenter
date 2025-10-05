import style from "../style.module.css";

export const RemoverMedico = () => {
  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">CRM do Médico</label>
        <input type="text" placeholder="Digite o CRM" />
      </div>
      <button className={style.btn} style={{ marginBottom: "20px" }}>
        Remover Médico
      </button>
      <div className={style.alerta}>
        <p>
          <strong>Atenção!</strong> Esta ação não pode ser desfeita.
        </p>
      </div>
    </>
  );
};
