import { useState } from "react";
import setaDireita from "../../../../assets/seta-direita.png";
import setaEsquerda from "../../../../assets/seta-esquerda.png";
import style from "../style.module.css";
export const Medico = () => {
  const [opcaoAtiva, setOpcaoAtiva] = useState<string>("info");
  const handleOperacaoAtiva = (option: string) => {
    setOpcaoAtiva(option);
  };
  const [contador, setContador] = useState<number>(1);
  const adicionar = () => {
    setContador((valorAtual) => {
      if (valorAtual < 2) return valorAtual + 1;
      return valorAtual; // não passa de 2
    });
  };
  const retirar = () => {
    setContador((valorAtual) => {
      if (valorAtual > 1) return valorAtual - 1;
      return valorAtual; // não desce de 1
    });
  };
  return (
    <div className={style.medicoCadastro}>
      <button
        onClick={() => {
          retirar();
          handleOperacaoAtiva("info");
        }}
        className={style.seta}
      >
        <img src={setaEsquerda} alt="" />
      </button>
      {opcaoAtiva === "info" && (
        <div className={style.info}>
          <p>Eatapa {contador} de 2</p>
          <hr />
          <div className={style.linha}>
            <label htmlFor="">Nome Completo</label>
            <input type="text" placeholder="Digite seu nome completo" />
          </div>
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">CRM</label>
              <input type="text" placeholder="CRM 00000" />
            </div>
            <div className={style.linha}>
              <label htmlFor="">Data de nascimento</label>
              <input type="date" />
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
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">Email</label>
              <input type="email" placeholder="seu@email.com" />
            </div>
            <div className={style.linha}>
              <label htmlFor="">Data de Contratação</label>
              <input type="date" />
            </div>
          </div>
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">Telefone</label>
              <input type="tel" placeholder="(00) 00000-0000" />
            </div>
            <div className={style.linha}>
              <label htmlFor="">CPF</label>
              <input type="numer" placeholder="000.000.000-00" />
            </div>
          </div>
          <div className={style.linha}>
            <label htmlFor="">Senha</label>
            <input type="password" placeholder="Mínimo 8 caracteres" />
          </div>
        </div>
      )}
      {opcaoAtiva === "endereco" && (
        
        <div className={style.endereco}>
            <p>Eatapa {contador} de 2</p>
            <hr />
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">Cidade</label>
              <input type="text" />
            </div>
            <div className={style.linha}>
              <label htmlFor="">Estado</label>
              <select name="" id="">
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>
          <div className={style.linha}>
            <label htmlFor="">Bairro</label>
            <input type="text" />
          </div>
          <div className={style.linha}>
            <label htmlFor="">Completo</label>
            <input type="text" placeholder="Opcional" />
          </div>
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="">Numero</label>
              <input type="text" placeholder="N°" />
            </div>
            <div className={style.linha}>
              <label htmlFor="">CEP</label>
              <input type="text" placeholder="00000-000" />
            </div>
          </div>
          <button className={style.btn}>Cadastrar Conta de Médico</button>
        </div>
      )}
      <button
        onClick={() => {
          adicionar();
          handleOperacaoAtiva("endereco");}}
        className={style.seta}
        
      >
        <img src={setaDireita} alt="" />
      </button>
    </div>
  );
};
