import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./style.module.css";
import sair from "../../assets/img/sair.png";

// Interfaces existentes...
interface Exame {
  id: number;
  nome: string;
  data: string;
  horario?: string;
  status: "confirmado" | "pendente" | "disponivel";
  medico?: string;
  especialidade?: string;
  valor?: number;
  resultado?: string;
}

interface Consulta {
  id: number;
  nome: string;
  data: string;
  status: string;
  descricao?: string;
  laboratorio?: string;
  medico?: string;
  especialidade?: string;
  valor?: number;
}

interface Estatisticas {
  examesAgendados: number;
  resultadosDisponiveis: number;
  examesRealizados: number;
  consultasAgendadas: number;
}

interface AtividadeRecente {
  id: number;
  texto: string;
  data: string;
}

interface PerfilClienteProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export const PerfilCliente: React.FC<PerfilClienteProps> = ({
  onLogout,
  onNavigate,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [examesAgendados, setExamesAgendados] = useState<Exame[]>([]);
  const [resultadosDisponiveis, setResultadosDisponiveis] = useState<Exame[]>(
    []
  );
  const [consultasAgendadas, setConsultasAgendadas] = useState<Consulta[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    examesAgendados: 0,
    resultadosDisponiveis: 0,
    examesRealizados: 0,
    consultasAgendadas: 0,
  });
  const [atividadesRecentes, setAtividadesRecentes] = useState<
    AtividadeRecente[]
  >([]);

  const [modalAberto, setModalAberto] = useState<string | null>(null);
  const [exameAgendado, setExameAgendado] = useState({
    tipo: "",
    data: "",
    horario: "",
    observacoes: "",
  });

  useEffect(() => {
    buscarDadosPerfil();
  }, []);

  const buscarDadosPerfil = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "/login";
        return;
      }

      const response = await fetch("http://localhost:8800/perfil-clientes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do perfil");
      }

      const data = await response.json();

      setUser(data.cliente);
      setExamesAgendados(data.examesAgendados || []);
      setResultadosDisponiveis(data.resultadosDisponiveis || []);
      setConsultasAgendadas(data.consultasAgendadas || []);
      setEstatisticas(data.estatisticas);
      setAtividadesRecentes(data.atividadesRecentes || []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Erro ao carregar dados do perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (modal: string) => setModalAberto(modal);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setExameAgendado({
      ...exameAgendado,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "confirmado":
        return styles.statusConfirmado;
      case "pendente":
        return styles.statusPendente;
      case "disponivel":
        return styles.statusDisponivel;
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "pendente":
        return "Pendente";
      case "disponivel":
        return "Disponível";
      case "Marcado":
        return "Agendado";
      case "Concluido":
        return "Concluído";
      default:
        return status;
    }
  };

  // Handler para clicar no perfil (já está no perfil, então não faz nada ou recarrega)
  const handleHeaderClick = () => {
    // Já está na página de perfil, não precisa navegar
    console.log("Já está na página de perfil");
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Header username="Carregando..." />
        <main className={styles.mainContent}>
          <div className={styles.container}>
            <div style={{ textAlign: "center", padding: "50px" }}>
              <p>Carregando dados...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const fecharModal = () => setModalAberto(null);

  return (
    <div className={styles.wrapper}>
      <Header username={user?.nome || "Usuário"} onClick={handleHeaderClick} />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Bem-vindo, {user?.nome}!</h1>
            <p className={styles.welcomeSubtitle}>
              Gerencie seus exames e consultas de forma simples e rápida
            </p>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                {estatisticas.examesAgendados}
              </div>
              <div className={styles.statLabel}>Exames Agendados</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                {estatisticas.resultadosDisponiveis}
              </div>
              <div className={styles.statLabel}>Resultados Disponíveis</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                {estatisticas.examesRealizados}
              </div>
              <div className={styles.statLabel}>Exames Realizados</div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className={styles.dashboardGrid}>
            {/* Agendar Exame */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.icon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 2V6M8 2V6M3 10H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Agendar Exame</h2>
              </div>
              <p className={styles.cardDescription}>
                Agende seus exames de forma rápida e prática. Escolha a data,
                horário e tipo de exame que melhor se adequa à sua agenda.
              </p>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => abrirModal("schedule")}
                >
                  Novo Agendamento
                </button>
              </div>
            </div>

            {/* Ver Exames Agendados */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.icon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 11L12 14L22 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Exames Agendados</h2>
              </div>
              <p className={styles.cardDescription}>
                Visualize todos os seus exames agendados, confirme presença,
                reagende ou cancele appointments quando necessário.
              </p>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => abrirModal("appointments")}
                >
                  Ver Agendamentos
                </button>
              </div>
            </div>

            {/* Consultar Resultados */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.icon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20M16 13H8M16 17H8M10 9H8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Resultados</h2>
              </div>
              <p className={styles.cardDescription}>
                Acesse seus resultados de exames de forma segura. Baixe laudos,
                visualize histórico e compartilhe com outros profissionais.
              </p>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => abrirModal("results")}
                >
                  Ver Resultados
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.recentActivity}>
            <div className={styles.activityHeader}>
              <div className={styles.activityIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2 className={styles.activityTitle}>Atividade Recente</h2>
            </div>
            {atividadesRecentes.length > 0 ? (
              atividadesRecentes.map((atividade) => (
                <div key={atividade.id} className={styles.activityItem}>
                  <div className={styles.activityDot}></div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityText}>{atividade.texto}</div>
                    <div className={styles.activityDate}>{atividade.data}</div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "#666" }}>
                Nenhuma atividade recente
              </p>
            )}
          </div>
        </div>
      </main>
      {modalAberto === "appointments" && (
        <div className={styles.modal} onClick={fecharModal}>
          <div
            className={`${styles.modalContent} ${styles.modalLarge}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={fecharModal}>
              &times;
            </span>
            <h2 className={styles.modalTitle}>Meus Exames Agendados</h2>
            {examesAgendados.length > 0 ? (
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    <th>Exame</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Médico</th>
                    <th>Status</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {examesAgendados.map((exame) => (
                    <tr key={exame.id}>
                      <td>{exame.nome}</td>
                      <td>{exame.data}</td>
                      <td>{exame.horario || "09:00"}</td>
                      <td>{exame.medico || "Não informado"}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(
                            exame.status
                          )}`}
                        >
                          {getStatusText(exame.status)}
                        </span>
                      </td>
                      <td>R$ {exame.valor?.toFixed(2) || "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p
                className={styles.void}
              >
                Você não possui exames agendados no momento.
              </p>
            )}
          </div>
        </div>
      )}
      {modalAberto === "results" && (
        <div className={styles.modal} onClick={fecharModal}>
          <div
            className={`${styles.modalContent} ${styles.modalLarge}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={fecharModal}>
              &times;
            </span>
            <h2 className={styles.modalTitle}>Meus Resultados</h2>
            {resultadosDisponiveis.length > 0 ? (
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    <th>Exame</th>
                    <th>Data</th>
                    <th>Resultado</th>
                    <th>Médico</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {resultadosDisponiveis.map((resultado) => (
                    <tr key={resultado.id}>
                      <td>{resultado.nome}</td>
                      <td>{resultado.data}</td>
                      <td>{resultado.resultado || "Disponível"}</td>
                      <td>{resultado.medico || "Não informado"}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(
                            resultado.status
                          )}`}
                        >
                          {getStatusText(resultado.status)}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
                        >
                          Baixar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.void}>
                Você não possui resultados disponíveis no momento.
              </p>
            )}
          </div>
        </div>
      )}

      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          <img src={sair} alt="" />
          Logout
        </button>
      )}
      <Footer />
    </div>
  );
};
