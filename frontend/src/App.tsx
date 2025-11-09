import { useState } from "react";
import style from "./App.module.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export const App = () => {
  const [formData, setFormData] = useState({ search: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.search || !formData.password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8800/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login bem-sucedido!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro no login.");
      }
    } catch (err) {
      setError("Erro de conexão.");
    }
  };

  return (
    <div className={style.body}>
      <Header />
      <main>
        <div className={style.cadastre}>
          <div className={style.login}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className={style.info}>
                <div className={style.inputInfo}>
                  <label>CPF ou CRM</label>
                  <input
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={style.inputInfo}>
                  <label>Senha</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Login</button>
            </form>
            <p>
              <a href="">Esqueceu a senha?</a> {/* Add link if needed */}
            </p>
          </div>
          <div className={style.loginText}>
            <h1>Seja bem vindo ao Medicenter</h1>
            <p>
              Cadastre-se para agendar suas consultas de forma rápida e prática.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
