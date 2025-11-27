import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./style.module.css";
import Grafico from "../../components/grafico";
import Logout from "../../assets/img/sair.png";

interface MedicoProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

interface Medico {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  crm: number;
}

interface Estatisticas {
  consultasHoje: number;
  pacientesAtivos: number;
  examesPendentes: number;
  receitasHoje: number;
}

interface Consulta {
  id: number;
  paciente: string;
  pacienteId: number;
  tipo: string;
  horario: string;
  status: string;
  descricao?: string;
}

interface ConsultaSemana {
  id: number;
  data: string;
  paciente: string;
  tipo: string;
  horario: string;
  status: string;
}

interface Exame {
  id: number;
  paciente: string;
  pacienteId: number;
  tipo: string;
  dataRequerimento: string;
  status: string;
}

const DashboardMedico: React.FC<MedicoProps> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
    "today"
  );
  const [loading, setLoading] = useState(true);

  // Estados para modais
  const [modalConsulta, setModalConsulta] = useState(false);
  const [modalExame, setModalExame] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] =
    useState<Consulta | null>(null);
  const [exameSelecionado, setExameSelecionado] = useState<Exame | null>(null);
  const [novoStatus, setNovoStatus] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");

  // Estados para dados do backend
  const [medico, setMedico] = useState<Medico | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    consultasHoje: 0,
    pacientesAtivos: 0,
    examesPendentes: 0,
    receitasHoje: 0,
  });
  const [consultasHoje, setConsultasHoje] = useState<Consulta[]>([]);
  const [consultasSemana, setConsultasSemana] = useState<ConsultaSemana[]>([]);
  const [examesPendentes, setExamesPendentes] = useState<Exame[]>([]);

  useEffect(() => {
    buscarDadosDashboard();
  }, []);

  const buscarDadosDashboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        window.location.href = "/";
        return;
      }

      const response = await fetch("http://localhost:8800/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }

      const data = await response.json();
      setMedico(data.medico);
      setEstatisticas(data.estatisticas);
      setConsultasHoje(data.consultasHoje || []);
      setConsultasSemana(data.consultasSemana || []);
      setExamesPendentes(data.examesPendentes || []);
    } catch (error) {
      console.error("❌ Erro ao buscar dados:", error);
      alert("Erro ao carregar dashboard: " + error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalConsulta = (consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setNovoStatus(consulta.status);
    setObservacoes(consulta.descricao || "");
    setModalConsulta(true);
  };

  const abrirModalExame = (exame: Exame) => {
    setExameSelecionado(exame);
    setModalExame(true);
  };

  const fecharModais = () => {
    setModalConsulta(false);
    setModalExame(false);
    setConsultaSelecionada(null);
    setExameSelecionado(null);
    setNovoStatus("");
    setObservacoes("");
  };

  const atualizarStatusConsulta = async () => {
    if (!consultaSelecionada) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8800/consulta/${consultaSelecionada.id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: novoStatus,
            observacoes: observacoes,
          }),
        }
      );

      if (response.ok) {
        alert("Status atualizado com sucesso!");
        fecharModais();
        buscarDadosDashboard(); // Recarregar dados
      } else {
        throw new Error("Erro ao atualizar status");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status da consulta");
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Confirmado":
        return `${styles.statusBadge} ${styles.statusConfirmado}`;
      case "Concluido":
        return `${styles.statusBadge} ${styles.statusConcluido}`;
      case "Pendente":
      case "Marcado":
        return `${styles.statusBadge} ${styles.statusPendente}`;
      default:
        return styles.statusBadge;
    }
  };

  if (loading) {
    return (
      <div>
        <Header username="Carregando..." medico={true} />
        <main>
          <div className={styles.container}>
            <div style={{ textAlign: "center", padding: "50px" }}>
              <p>Carregando dados do dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header username={medico?.nome || "Médico"} medico={true} />

      <main>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <p className={styles.pageSubtitle}>
              {medico?.especialidade} - CRM: {medico?.crm}
            </p>
          </div>

          {onLogout && (
            <button onClick={onLogout} className={styles.logout}>
              <img src={Logout} alt="" />
              Sair
            </button>
          )}

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.icon}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className={styles.statNumber}>
                  {estatisticas.consultasHoje}
                </div>
              </div>
              <div className={styles.statLabel}>Consultas Hoje</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.icon}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className={styles.statNumber}>
                  {estatisticas.pacientesAtivos}
                </div>
              </div>
              <div className={styles.statLabel}>Pacientes Ativos</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.icon}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className={styles.statNumber}>
                  {estatisticas.examesPendentes}
                </div>
              </div>
              <div className={styles.statLabel}>Exames Pendentes</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.icon}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className={styles.statNumber}>
                  {estatisticas.receitasHoje}
                </div>
              </div>
              <div className={styles.statLabel}>Receitas Hoje</div>
            </div>
          </div>

          <Grafico
            consultasSemana={consultasSemana}
            examesPendentes={examesPendentes}
          />

          {/* Main Content Grid */}
          <div className={styles.contentGrid}>
            {/* Appointments Section */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Minhas Consultas</h3>
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${
                    activeTab === "today" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("today")}
                >
                  Hoje
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "week" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("week")}
                >
                  Esta Semana
                </button>
              </div>

              {/* Today Tab */}
              {activeTab === "today" && (
                <div className={styles.tabContent}>
                  {consultasHoje.length > 0 ? (
                    consultasHoje.map((consulta) => (
                      <div key={consulta.id} className={styles.appointmentItem}>
                        <div className={styles.appointmentTime}>
                          {consulta.horario}
                        </div>
                        <div className={styles.appointmentDetails}>
                          <div className={styles.appointmentPatient}>
                            {consulta.paciente}
                          </div>
                          <div className={styles.appointmentType}>
                            {consulta.tipo}
                          </div>
                        </div>
                        <div className={getStatusBadgeClass(consulta.status)}>
                          {consulta.status}
                        </div>

                        <div className={styles.appointmentActions}>
                          <button
                            className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                            onClick={() => abrirModalConsulta(consulta)}
                          >
                            Detalhes
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#666",
                      }}
                    >
                      Nenhuma consulta agendada para hoje
                    </p>
                  )}
                </div>
              )}

              {/* Week Tab */}
              {activeTab === "week" && (
                <div className={styles.tabContent}>
                  {consultasSemana.length > 0 ? (
                    <table className={styles.scheduleTable}>
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Paciente</th>
                          <th>Tipo</th>
                          <th>Horário</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consultasSemana.map((consulta) => (
                          <tr key={consulta.id}>
                            <td>{consulta.data}</td>
                            <td>{consulta.paciente}</td>
                            <td>{consulta.tipo}</td>
                            <td>{consulta.horario}</td>
                            <td>
                              <span
                                className={getStatusBadgeClass(consulta.status)}
                              >
                                {consulta.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#666",
                      }}
                    >
                      Nenhuma consulta agendada para esta semana
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Exames Pendentes */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Exames Pendentes</h3>
              </div>

              <div className={styles.tabContent}>
                {examesPendentes.length > 0 ? (
                  examesPendentes.map((exame) => (
                    <div
                      key={exame.id}
                      className={styles.actionItem}
                      onClick={() => abrirModalExame(exame)}
                    >
                      <div className={`${styles.actionIcon} ${styles.icon}`}>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className={styles.actionText}>
                        <div className={styles.actionTitle}>{exame.tipo}</div>
                        <div className={styles.actionSubtitle}>
                          {exame.paciente} - {exame.dataRequerimento}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#666",
                    }}
                  >
                    Nenhum exame pendente
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Consulta */}
      {modalConsulta && consultaSelecionada && (
        <div className={styles.modal} onClick={fecharModais}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Detalhes da Consulta</h2>
              <button className={styles.closeBtn} onClick={fecharModais}>
                ×
              </button>
            </div>

            <div className={styles.formGroup}>
              <label>Paciente</label>
              <input
                type="text"
                value={consultaSelecionada.paciente}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tipo de Consulta</label>
              <input type="text" value={consultaSelecionada.tipo} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>Horário</label>
              <input type="text" value={consultaSelecionada.horario} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
              >
                <option value="Marcado">Marcado</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Concluido">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Observações</label>
              <textarea
                rows={4}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Adicione observações sobre a consulta..."
              />
            </div>

            <div className={styles.formActions}>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={fecharModais}
              >
                Cancelar
              </button>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={atualizarStatusConsulta}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Exame */}
      {modalExame && exameSelecionado && (
        <div className={styles.modal} onClick={fecharModais}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Detalhes do Exame</h2>
              <button className={styles.closeBtn} onClick={fecharModais}>
                ×
              </button>
            </div>

            <div className={styles.formGroup}>
              <label>Paciente</label>
              <input type="text" value={exameSelecionado.paciente} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>Tipo de Exame</label>
              <input type="text" value={exameSelecionado.tipo} disabled />
            </div>

            <div className={styles.formGroup}>
              <label>Data de Solicitação</label>
              <input
                type="text"
                value={exameSelecionado.dataRequerimento}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <input type="text" value={exameSelecionado.status} disabled />
            </div>

            <div className={styles.formActions}>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={fecharModais}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DashboardMedico;
