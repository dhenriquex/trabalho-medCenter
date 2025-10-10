import { useState } from "react";
import setaDireita from "../../../../assets/seta-direita.png";
import setaEsquerda from "../../../../assets/seta-esquerda.png";
import style from "../style.module.css";

export const Medico = () => {
  const [opcaoAtiva, setOpcaoAtiva] = useState("info");
  const [contador, setContador] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    crm: "",
    dataDeNasc: "",
    especialidade: "",
    email: "",
    dataContratacao: "",
    telefone: "",
    cpf: "",
    senha: "",
    cidade: "",
    estado: "",
    bairro: "",
    complemento: "",
    numero: "",
    cep: "",
  });
  const [message, setMessage] = useState("");

  const handleOperacaoAtiva = (option: string) => {
    setOpcaoAtiva(option);
  };

  const adicionar = () => {
    setContador((valorAtual) => {
      if (valorAtual < 2) return valorAtual + 1;
      return valorAtual;
    });
  };

  const retirar = () => {
    setContador((valorAtual) => {
      if (valorAtual > 1) return valorAtual - 1;
      return valorAtual;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCadastro = async () => {
    try {
      const response = await fetch("http://localhost:8800/medicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result || "Erro no cadastro");
      }

      setMessage(result);
      setFormData({
        nome: "",
        crm: "",
        dataDeNasc: "",
        especialidade: "",
        email: "",
        dataContratacao: "",
        telefone: "",
        cpf: "",
        senha: "",
        cidade: "",
        estado: "",
        bairro: "",
        complemento: "",
        numero: "",
        cep: "",
      });
      setContador(1);
      setOpcaoAtiva("info");
    } catch (error) {
      setMessage("Erro ao cadastrar: ");
    }
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
          <p>Etapa {contador} de 2</p>
          <hr />
          <div className={style.linha}>
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="crm">CRM</label>
              <input
                type="number"
                name="crm"
                placeholder="00000"
                value={formData.crm}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className={style.linha}>
              <label htmlFor="dataDeNasc">Data de nascimento</label>
              <input
                type="date"
                name="dataDeNasc"
                value={formData.dataDeNasc}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={style.linha}>
            <label htmlFor="especialidade">Especialidade</label>
            <select
              name="especialidade"
              value={formData.especialidade}
              onChange={handleInputChange}
              required
            >
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={style.linha}>
              <label htmlFor="dataContratacao">Data de Contratação</label>
              <input
                type="date"
                name="dataContratacao"
                value={formData.dataContratacao}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className={style.linha}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={style.linha}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Mínimo 8 caracteres"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      {opcaoAtiva === "endereco" && (
        <div className={style.endereco}>
          <p>Etapa {contador} de 2</p>
          <hr />
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
              />
            </div>
            <div className={style.linha}>
              <label htmlFor="estado">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
              >
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
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.linha}>
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              name="complemento"
              placeholder="Opcional"
              value={formData.complemento}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.coluna}>
            <div className={style.linha}>
              <label htmlFor="numero">Numero</label>
              <input
                type="number"
                name="numero"
                placeholder="N°"
                value={formData.numero}
                onChange={handleInputChange}
                min={1}
              />
            </div>
            <div className={style.linha}>
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button className={style.btn} onClick={handleCadastro}>
            Cadastrar Conta de Médico
          </button>
          {message && <p className={style.message}>{message}</p>}
        </div>
      )}
      <button
        onClick={() => {
          adicionar();
          handleOperacaoAtiva("endereco");
        }}
        className={style.seta}
      >
        <img src={setaDireita} alt="" />
      </button>
    </div>
  );
};
