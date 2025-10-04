import { Header } from "./components/header";
import { Footer } from "./components/footer";
import style from "./App.module.css";
import logo from "./imgs/logoMedCenter.png";
import { useState } from "react";
function App() {
  const [opcaoAtiva, setOpcaoAtiva] = useState("usuario");
  const handleOpcaoAtiva = (option) => {
    setOpcaoAtiva(option);
  };
  return (
    <div className={style.body}>
      <Header />
      <main>
        <div className={style.pagina}>
          <div className={style.info}>
            <div className={style.logo}>
              <img src={logo} alt="" />
              <h1>MedCenter</h1>
            </div>
            <p>Agendamento clinico</p>
          </div>
          <div className={style.cadastro}>
            <h3>Cadastro</h3>
            <p>Escolha um campo a baixo</p>
            <div className={style.opcoes}>
              <span
                className={opcaoAtiva === "usuario" ? style.active : ""}
                onClick={() => handleOpcaoAtiva("usuario")}
              >
                Ususario
              </span>
              <span
                className={opcaoAtiva === "medico" ? style.active : ""}
                onClick={() => handleOpcaoAtiva("medico")}
              >
                Medico
              </span>
            </div>
            <div className={style.campos}>
              {opcaoAtiva === "usuario" && (
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
              )}
              {opcaoAtiva === "medico" && (
                <>
                  <div className={style.linha}>
                    <label htmlFor="">Nome Completo</label>
                    <input type="text" placeholder="Digite seu nome completo" />
                  </div>
                  <div className={style.coluna}>
                    <div className={style.linha}>
                      <label htmlFor="">CRM</label>
                      <input type="text" placeholder="CRM 00000" />{" "}
                      {/* ← ADICIONE ESTE INPUT */}
                    </div>
                    <div className={style.linha}>
                      <label htmlFor="">UF do CRM</label>
                      <select>
                        {" "}
                        {/* ← ADICIONE ESTE SELECT */}
                        <option value="">Selecione</option>
                        <option value="AC">AC</option>
                        <option value="MG">MG</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        {/* Adicione outros estados */}
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
                    </select>
                  </div>
                  <div className={style.linha}>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="seu@email.com" />
                  </div>
                  <div className={style.linha}>
                    <label htmlFor="">Telefone</label>
                    <input type="tel" placeholder="(00) 00000-0000" />
                  </div>
                  <div className={style.linha}>
                    <label htmlFor="">Senha</label>
                    <input type="password" placeholder="Mínimo 8 caracteres" />
                  </div>
                  <button className={style.btn}>
                    Cadastrar Conta de Médico
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;
