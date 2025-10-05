import style from "../style.module.css";
export const Usuario = () => {
  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">nome Completo</label>
        <input type="text" placeholder="Digite seu nome completo" />
      </div>
      <div className={style.coluna}>
        <div className={style.linha}>
          <label htmlFor="">CPF</label>
          <input type="number" placeholder="000.000.000-00" />
        </div>
        <div className={style.linha}>
          <label htmlFor="">Data de Nascimento</label>
          <input type="date" />
        </div>
      </div>
      <div className={style.linha}>
        <label htmlFor="">Email</label>
        <input type="email" placeholder="seu@email.com" />
      </div>
      <div className={style.coluna}>
        <div className={style.linha}>
          <label htmlFor="">telefone</label>
          <input type="number" placeholder="(00)00000-000" />
        </div>
        <div className={style.groupForm}>
          <label htmlFor="">Sexo</label>
          <select required>
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">outro</option>
          </select>
        </div>
      </div>
      <div className={style.linha}>
        <label htmlFor="">Senha</label>
        <input type="password" placeholder="minimo 8 caracteres" />
      </div>
      <button className={style.btn}>Cadastrar Conta</button>
    </>
  );
};
