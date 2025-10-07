import style from "../style.module.css";

export const AtualizarUsuario = () => {
  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">CPF do Usuário</label>
        <input type="text" placeholder="Digite o CPF" />
      </div>
      <button className={style.btn} style={{ marginBottom: "20px" }}>
        Buscar Dados
      </button>
      <div className={style.linha}>
        <label htmlFor="">Nome Completo</label>
        <input type="text" placeholder="Nome do usuário" />
      </div>
      <div className={style.linha}>
        <label htmlFor="">Email</label>
        <input type="email" placeholder="email@exemplo.com" />
      </div>
      <div className={style.linha}>
        <label htmlFor="">Telefone</label>
        <input type="tel" placeholder="(00) 00000-0000" />
      </div>
      <button className={style.btn}>Atualizar Dados</button>
    </>
  );
};
