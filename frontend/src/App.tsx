import { useState, useEffect } from "react";
import style from "./App.module.css";

import { Footer } from "./components/footer";
import { PerfilCliente } from "./pages/perfilCliente";
import DashboardMedico from "./pages/homeMedico";
import Consultas from "./pages/consultas";
import Exames from "./pages/exames"; // Você precisa criar esta página

export const App = () => {
  const [formData, setFormData] = useState({ search: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("login");

  // Verificar se já está logado ao carregar
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
          // Restaurar a página atual se existir
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

  // Listener para mudanças na URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/consultas") {
        setCurrentPage("consultas");
      } else if (path === "/exames") {
        setCurrentPage("exames");
      } else if (path === "/dashboard") {  // **ALTERAÇÃO: Adicionei verificação para "/dashboard"**
        setCurrentPage("dashboard");
      } else if (path === "/" && isLoggedIn) {
        setCurrentPage(userType === "cliente" ? "home" : "dashboard");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isLoggedIn, userType]);

  // Função para navegar entre páginas
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
    
    // **ALTERAÇÃO: Diferencie a URL com base no userType**
    let path;
    if (page === "home" && userType === "cliente") {
      path = "/perfil-clientes";  // Para clientes
    } else if (page === "dashboard" && userType === "medico") {
      path = "/dashboard";  // Para médicos
    } else {
      path = `/${page}`;  // Para outras páginas (consultas, exames, etc.)
    }
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
    return <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      Carregando...
    </div>;
  }

  // Sistema de rotas baseado no estado
  if (isLoggedIn) {
    // Rotas para cliente
    if (userType === "cliente") {
      switch (currentPage) {
        case "consultas":
          return <Consultas onNavigate={navigateTo} />;
        case "exames":
          return <Exames onNavigate={navigateTo} />;
        case "home":
        default:
          return <PerfilCliente onLogout={handleLogout} />;
      }
    }
    
    // Rotas para médico
    if (userType === "medico") {
      return <DashboardMedico onLogout={handleLogout} onNavigate={navigateTo} />;
    }
  }

  // Renderizar página de login
  console.log("Renderizando página de Login");
  return (
    <div className={style.body}>
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
              {error && (
                <p style={{ 
                  color: "red", 
                  marginTop: "10px",
                  fontSize: "14px" 
                }}>
                  {error}
                </p>
              )}
              <button type="submit">Login</button>
            </form>
            <p>
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
