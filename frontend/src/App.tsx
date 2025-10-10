// pagina principal que esta sendo renderizada, ela importa compontes comom Header, Footer, e as operacoes dinamicas
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import style from "./App.module.css";
import logo from "./imgs/logoMedCenter.png";
import { useState } from "react";
import { FormularioDinamico } from "./components/campoDinamico";
import { GridItem } from "./components/gridItem";
function App() {
  // deifinição de uma variavel e sua função "gatinlho"
  const [tipoUsuario, setTipoUsuario] = useState("usuario");
  const [operacao,setOperacao] = useState("cadastrar")
  // as funções "handle" são usadas para modificar a escolha dos componentes dinamicos
  const handletipoUsuario = (option:string) => {
    setTipoUsuario(option);
  };
  const handleOperacoes = (op:string) =>{
    setOperacao(op);
  }
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
            <GridItem onSelectOperacao={handleOperacoes} operacaoAtiva = {operacao}/>
          </div>
          <div className={style.gerenciamento}>
            <h3>Gerenciamento</h3>
            <p>Escolha um campo a baixo</p>
            <div className={style.opcoes}>
              <span
                className={tipoUsuario === "usuario" ? style.active : ""}
                onClick={() => handletipoUsuario("usuario")}
              >
                Ususario
              </span>
              <span
                className={tipoUsuario === "medico" ? style.active : ""}
                onClick={() => handletipoUsuario("medico")}
              >
                Medico
              </span>
            </div>
            <div className={style.campos}>
               <FormularioDinamico tipoUsuario={tipoUsuario} operacao={operacao} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;
