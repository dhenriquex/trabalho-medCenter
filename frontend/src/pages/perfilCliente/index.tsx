import { useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./style.module.css";

interface Exame {
  id: number;
  nome: string;
  data: string;
  horario: string;
  status: "confirmado" | "pendente" | "disponivel";
}

export const PerfilCliente = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{"nome": "João"}');
  
  const [modalAberto, setModalAberto] = useState<string | null>(null);
  const [exameAgendado, setExameAgendado] = useState({
    tipo: "",
    data: "",
    horario: "",
    observacoes: ""
  });

  const examesAgendados: Exame[] = [
    { id: 1, nome: "Hemograma Completo", data: "12/07/2025", horario: "09:00", status: "confirmado" },
    { id: 2, nome: "Raio-X Tórax", data: "15/07/2025", horario: "14:30", status: "pendente" },
    { id: 3, nome: "Ultrassom Abdominal", data: "18/07/2025", horario: "10:00", status: "confirmado" }
  ];

  const resultadosDisponiveis: Exame[] = [
    { id: 1, nome: "Hemograma Completo", data: "08/07/2025", horario: "", status: "disponivel" },
    { id: 2, nome: "Exame de Urina", data: "05/07/2025", horario: "", status: "disponivel" },
    { id: 3, nome: "Raio-X Joelho", data: "02/07/2025", horario: "", status: "disponivel" }
  ];

  const atividadesRecentes = [
    { id: 1, texto: "Resultado do Hemograma disponível", data: "Hoje, 14:30" },
    { id: 2, texto: "Exame de Raio-X agendado", data: "Ontem, 10:15" },
    { id: 3, texto: "Lembrete: Consulta amanhã às 09:00", data: "2 dias atrás" }
  ];

  const abrirModal = (modal: string) => setModalAberto(modal);
  const fecharModal = () => setModalAberto(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setExameAgendado({
      ...exameAgendado,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Agendamento:", exameAgendado);
    fecharModal();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "confirmado": return styles.statusConfirmado;
      case "pendente": return styles.statusPendente;
      case "disponivel": return styles.statusDisponivel;
      default: return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado": return "Confirmado";
      case "pendente": return "Pendente";
      case "disponivel": return "Disponível";
      default: return status;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header username={user.nome}/>
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Bem-vindo, {user.nome}!</h1>
            <p className={styles.welcomeSubtitle}>
              Gerencie seus exames e consultas de forma simples e rápida
            </p>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>3</div>
              <div className={styles.statLabel}>Exames Agendados</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>2</div>
              <div className={styles.statLabel}>Resultados Disponíveis</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>15</div>
              <div className={styles.statLabel}>Exames Realizados</div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className={styles.dashboardGrid}>
            {/* Agendar Exame */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.iconSchedule}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Agendar Exame</h2>
              </div>
              <p className={styles.cardDescription}>
                Agende seus exames de forma rápida e prática. Escolha a data,
                horário e tipo de exame que melhor se adequa à sua agenda.
              </p>
              <div className={styles.cardActions}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => abrirModal('schedule')}>
                  Novo Agendamento
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => abrirModal('availability')}>
                  Ver Disponibilidade
                </button>
              </div>
            </div>

            {/* Ver Exames Agendados */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.iconAppointments}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Exames Agendados</h2>
              </div>
              <p className={styles.cardDescription}>
                Visualize todos os seus exames agendados, confirme presença,
                reagende ou cancele appointments quando necessário.
              </p>
              <div className={styles.cardActions}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => abrirModal('appointments')}>
                  Ver Agendamentos
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Configurar Lembretes
                </button>
              </div>
            </div>

            {/* Consultar Resultados */}
            <div className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIcon} ${styles.iconResults}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Resultados</h2>
              </div>
              <p className={styles.cardDescription}>
                Acesse seus resultados de exames de forma segura. Baixe laudos,
                visualize histórico e compartilhe com outros profissionais.
              </p>
              <div className={styles.cardActions}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => abrirModal('results')}>
                  Ver Resultados
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Baixar Laudos
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.recentActivity}>
            <div className={styles.activityHeader}>
              <div className={styles.activityIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className={styles.activityTitle}>Atividade Recente</h2>
            </div>
            {atividadesRecentes.map((atividade) => (
              <div key={atividade.id} className={styles.activityItem}>
                <div className={styles.activityDot}></div>
                <div className={styles.activityContent}>
                  <div className={styles.activityText}>{atividade.texto}</div>
                  <div className={styles.activityDate}>{atividade.data}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal: Agendar Exame */}
      {modalAberto === 'schedule' && (
        <div className={styles.modal} onClick={fecharModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={fecharModal}>&times;</span>
            <h2 className={styles.modalTitle}>Agendar Novo Exame</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tipo de Exame</label>
                <select className={styles.formSelect} name="tipo" value={exameAgendado.tipo} onChange={handleInputChange} required>
                  <option value="">Selecione o tipo de exame</option>
                  <option value="hemograma">Hemograma</option>
                  <option value="raio-x">Raio-X</option>
                  <option value="ultrassom">Ultrassom</option>
                  <option value="ressonancia">Ressonância Magnética</option>
                  <option value="tomografia">Tomografia</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Data Preferida</label>
                <input type="date" className={styles.formInput} name="data" value={exameAgendado.data} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Horário Preferido</label>
                <select className={styles.formSelect} name="horario" value={exameAgendado.horario} onChange={handleInputChange} required>
                  <option value="">Selecione o horário</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Observações</label>
                <textarea className={styles.formInput} name="observacoes" value={exameAgendado.observacoes} onChange={handleInputChange} rows={3} placeholder="Informações adicionais..."></textarea>
              </div>
              <div className={styles.cardActions}>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Agendar Exame</button>
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={fecharModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Exames Agendados */}
      {modalAberto === 'appointments' && (
        <div className={styles.modal} onClick={fecharModal}>
          <div className={`${styles.modalContent} ${styles.modalLarge}`} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={fecharModal}>&times;</span>
            <h2 className={styles.modalTitle}>Meus Exames Agendados</h2>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>Exame</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {examesAgendados.map((exame) => (
                  <tr key={exame.id}>
                    <td>{exame.nome}</td>
                    <td>{exame.data}</td>
                    <td>{exame.horario}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(exame.status)}`}>
                        {getStatusText(exame.status)}
                      </span>
                    </td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}>
                        {exame.status === 'confirmado' ? 'Reagendar' : 'Cancelar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Resultados */}
      {modalAberto === 'results' && (
        <div className={styles.modal} onClick={fecharModal}>
          <div className={`${styles.modalContent} ${styles.modalLarge}`} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={fecharModal}>&times;</span>
            <h2 className={styles.modalTitle}>Meus Resultados</h2>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>Exame</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {resultadosDisponiveis.map((resultado) => (
                  <tr key={resultado.id}>
                    <td>{resultado.nome}</td>
                    <td>{resultado.data}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(resultado.status)}`}>
                        {getStatusText(resultado.status)}
                      </span>
                    </td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}>
                        📥 Baixar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Disponibilidade */}
      {modalAberto === 'availability' && (
        <div className={styles.modal} onClick={fecharModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={fecharModal}>&times;</span>
            <h2 className={styles.modalTitle}>Disponibilidade de Horários</h2>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Selecione o tipo de exame</label>
              <select className={styles.formSelect}>
                <option value="">Escolha um exame</option>
                <option value="hemograma">Hemograma</option>
                <option value="raio-x">Raio-X</option>
                <option value="ultrassom">Ultrassom</option>
              </select>
            </div>
            <div className={styles.availabilityBox}>
              <h3 className={styles.availabilityTitle}>Horários Disponíveis - Hemograma</h3>
              <div className={styles.horariosGrid}>
                {['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'].map((horario) => (
                  <button key={horario} className={`${styles.btn} ${styles.btnSecondary}`}>
                    {horario}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};