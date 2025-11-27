import { useState, useEffect } from "react";
import style from "./App.module.css";

import { Footer } from "./components/footer";
import { PerfilCliente } from "./pages/perfilCliente";
import Home from "./pages/homeCliente";
import DashboardMedico from "./pages/homeMedico";
import Consultas from "./pages/consultas";
import Exames from "./pages/exames";

export const App = () => {
  const [formData, setFormData] = useState({ search: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const savedPage = localStorage.getItem("currentPage");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.tipo) {
          console.log("Usuário encontrado:", user.tipo);
          setIsLoggedIn(true);
          setUserType(user.tipo);
          if (savedPage) {
            setCurrentPage(savedPage);
          } else {
            setCurrentPage(user.tipo === "cliente" ? "home" : "dashboard");
          }
        }
      } catch (err) {
        console.error("Erro ao parsear usuário:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("currentPage");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      console.log("🔄 URL mudou para:", path);

      if (path === "/consultas") {
        setCurrentPage("consultas");
      } else if (path === "/exames") {
        setCurrentPage("exames");
      } else if (path === "/perfil-clientes") {
        setCurrentPage("perfil-clientes");
      } else if (path === "/dashboard") {
        setCurrentPage("dashboard");
      } else if (path === "/home") {
        setCurrentPage("home");
      } else if (path === "/" && isLoggedIn) {
        setCurrentPage(userType === "cliente" ? "home" : "dashboard");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isLoggedIn, userType]);

  // Função para navegar entre páginas
  const navigateTo = (page: string) => {
    console.log("Navegando para:", page);
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);

    let path;
    switch (page) {
      case "home":
        path = "/home";
        break;
      case "perfil":
        path = "/perfil-clientes";
        break;
      case "dashboard":
        path = "/dashboard";
        break;
      case "consultas":
        path = "/consultas";
        break;
      case "exames":
        path = "/exames";
        break;
      default:
        path = `/${page}`;
    }

    console.log("URL atualizada para:", path);
    window.history.pushState({}, "", path);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

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

      const data = await response.json();

      if (response.ok) {
        console.log("Login bem-sucedido:", data);

        // Salvar no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Atualizar estado
        setIsLoggedIn(true);
        setUserType(data.user.tipo);

        // Navegar para a página apropriada
        const page = data.user.tipo === "cliente" ? "home" : "dashboard";
        navigateTo(page);

        console.log("Estado atualizado para:", data.user.tipo);
      } else {
        setError(data.error || "Erro no login.");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro de conexão com o servidor.");
    }
  };

  const handleLogout = () => {
    console.log("Fazendo logout...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentPage");
    setIsLoggedIn(false);
    setUserType("");
    setCurrentPage("login");
    setFormData({ search: "", password: "" });
    window.history.pushState({}, "", "/");
  };

  // Loading inicial
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Carregando...
      </div>
    );
  }

  // Sistema de rotas baseado no estado
  if (isLoggedIn) {
    console.log("👤 Tipo:", userType, "| 📄 Página:", currentPage);

    // Rotas para cliente
    if (userType === "cliente") {
      switch (currentPage) {
        case "perfil":
          return (
            <PerfilCliente onLogout={handleLogout} onNavigate={navigateTo} />
          );

        case "consultas":
          return <Consultas onNavigate={navigateTo} />;

        case "exames":
          return <Exames onNavigate={navigateTo} />;

        case "home":
        default:
          return <Home onLogout={handleLogout} onNavigate={navigateTo} />;
      }
    }

    // Rotas para médico
    if (userType === "medico") {
      return (
        <DashboardMedico onLogout={handleLogout} onNavigate={navigateTo} />
      );
    }
  }

  // Renderizar página de login
  console.log("Renderizando página de Login");
  return (
    <div className={style.body}>
      <main>
        <div className={style.main}>
          <div className={style.login}>
            <h2>Login</h2>
            {error && <p className={style.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={style.info}>
                <div className={style.inputInfo}>
                  <label>CPF ou CRM</label>
                  <input
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                    placeholder="Digite seu CPF ou CRM"
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
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>
              <button type="submit">Login</button>
            </form>
            <p className={style.forgetPassoword}>
              <a href="#">Esqueceu a senha?</a>
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
