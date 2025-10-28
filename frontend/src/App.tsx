import style from "./App.module.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
export const App = () => {
  return (
    <div className={style.body}>
      <Header />
      <main>
        <div className={style.cadastre}>
          <div className={style.login}>
            <h2>Login</h2>
            <div className={style.info}>
              <div className={style.inputInfo}>
                <label>CPF ou CRm</label>
                <input type="email" required />
              </div>
              <div className={style.inputInfo}>
                <label>Senha</label>
                <input type="password" required />
              </div>
            </div>
            <button>login</button>
            <p>
              <a href=""></a>
            </p>
          </div>
          <div className={style.loginText}>
            <h1>Seja bem vindo ao Medicenter</h1>
            <p>
             Cadastre se para agendar suas consultas de forma rápida e prática.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default App;
