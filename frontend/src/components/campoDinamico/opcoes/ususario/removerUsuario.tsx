import style from "../style.module.css";
import { useState } from "react";

export const RemoverUsuario = () => {
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);

  const buscarUsuario = () => {
    setUsuarioEncontrado(true);
  };

  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">CPF do Usuário</label>
        <input type="text" placeholder="000.000.000-00" />
      </div>
      <button
        className={style.btn}
        style={{ marginBottom: "20px" }}
        onClick={buscarUsuario}
      >
        Buscar Usuário
      </button>
    </>
  );
};
