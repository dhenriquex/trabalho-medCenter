import style from "../style.module.css";
import { useState } from "react";

export const AtualizarMedico = () => {
  const [medicoEncontrado, setMedicoEncontrado] = useState(false);
  const buscarMedico = () => {
    setMedicoEncontrado(true);
  };

  return (
    <>
      <div className={style.linha}>
        <label htmlFor="">CRM do Médico</label>
        <input type="text" placeholder="CRM 00000" />
      </div>
      <button
        className={style.btn}
        style={{ marginBottom: "20px" }}
        onClick={buscarMedico}
      >
        Buscar Médico
      </button>
      {medicoEncontrado && (
        <>
          <div className={style.linha}>
            <label htmlFor="">Nome Completo</label>
            <input
              type="text"
              placeholder="Nome do médico"
              defaultValue="Dr. Carlos Mendes"
            />
          </div>

          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">CRM</label>
              <input
                type="text"
                placeholder="CRM 00000"
                defaultValue="12345"
                disabled
              />
            </div>
            <div className={style.linha}>
              <label htmlFor="">UF do CRM</label>
              <select>
                <option value="">Selecione</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>
          </div>

          <div className={style.linha}>
            <label htmlFor="">Especialidade</label>
            <select required>
              <option value="">Selecione sua especialidade</option>
              <option value="cardiologia">Cardiologia</option>
              <option value="dermatologia">Dermatologia</option>
              <option value="pediatria">Pediatria</option>
              <option value="ortopedia">Ortopedia</option>
              <option value="ginecologia">Ginecologia</option>
              <option value="neurologia">Neurologia</option>
              <option value="psiquiatria">Psiquiatria</option>
              <option value="oftalmologia">Oftalmologia</option>
              <option value="urologia">Urologia</option>
              <option value="endocrinologia">Endocrinologia</option>
            </select>
          </div>

          <div className={style.linha}>
            <label htmlFor="">Email</label>
            <input type="email" placeholder="email@exemplo.com" />
          </div>

          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">Telefone</label>
              <input type="tel" placeholder="(00) 00000-0000" />
            </div>
            <div className={style.linha}>
              <label htmlFor="">Telefone Alternativo</label>
              <input type="tel" placeholder="(00) 00000-0000" />
            </div>
          </div>

          <div className={style.linha}>
            <label htmlFor="">Horário de Atendimento</label>
            <input type="text" placeholder="Ex: Segunda a Sexta, 8h às 18h" />
          </div>

          <div className={style.linha}>
            <label htmlFor="">Valor da Consulta (R$)</label>
            <input type="number" placeholder="0.00" />
          </div>

          <div className={style.linha}>
            <label htmlFor="">Status</label>
            <select defaultValue="ativo">
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="ferias">Férias</option>
              <option value="licenca">Licença Médica</option>
            </select>
          </div>
          <button className={style.btn}>Atualizar Dados do Médico</button>
        </>
      )}
    </>
  );
};
