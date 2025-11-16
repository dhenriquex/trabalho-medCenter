// DashboardMedico.tsx
import React, { useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./style.module.css";


interface MedicoProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const DashboardMedico: React.FC<MedicoProps> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleTabChange = (tab: 'today' | 'week' | 'month') => {
    setActiveTab(tab);
  };

  const openModal = (modal: 'appointment' | 'prescription') => {
    if (modal === 'appointment') {
      setShowNewAppointmentModal(true);
    } else {
      setShowPrescriptionModal(true);
    }
  };

  const closeModal = (modal: 'appointment' | 'prescription') => {
    if (modal === 'appointment') {
      setShowNewAppointmentModal(false);
    } else {
      setShowPrescriptionModal(false);
    }
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova consulta agendada");
    closeModal('appointment');
  };

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova receita criada");
    closeModal('prescription');
  };

  return (
    <div>
      <Header username={user.nome} medico={true}/>
      <main>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Painel Médico</h1>
            <p className={styles.pageSubtitle}>
              Gerencie suas consultas, pacientes e agenda médica
            </p>
          </div>
           {onLogout && (
        <button onClick={onLogout}>
          Logout
        </button>
      )}
          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.iconBlue}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className={styles.statNumber}>12</div>
              </div>
              <div className={styles.statLabel}>Consultas Hoje</div>
              <div className={styles.statDescription}>3 pendentes, 9 confirmadas</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.iconGreen}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className={styles.statNumber}>248</div>
              </div>
              <div className={styles.statLabel}>Pacientes Ativos</div>
              <div className={styles.statDescription}>+15 novos este mês</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.iconAmber}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className={styles.statNumber}>8</div>
              </div>
              <div className={styles.statLabel}>Exames Pendentes</div>
              <div className={styles.statDescription}>Aguardando análise</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${styles.iconPurple}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className={styles.statNumber}>5</div>
              </div>
              <div className={styles.statLabel}>Receitas Hoje</div>
              <div className={styles.statDescription}>Prescrições realizadas</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={styles.contentGrid}>
            {/* Appointments Section */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Consultas de Hoje</h3>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal('appointment')}>
                  + Nova Consulta
                </button>
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                <button 
                  className={`${styles.tab} ${activeTab === 'today' ? styles.active : ''}`} 
                  onClick={() => handleTabChange('today')}
                >
                  Hoje
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'week' ? styles.active : ''}`} 
                  onClick={() => handleTabChange('week')}
                >
                  Esta Semana
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'month' ? styles.active : ''}`} 
                  onClick={() => handleTabChange('month')}
                >
                  Este Mês
                </button>
              </div>

              {/* Today Tab */}
              {activeTab === 'today' && (
                <div className={styles.tabContent}>
                  <div className={styles.appointmentItem}>
                    <div className={styles.appointmentTime}>08:00</div>
                    <div className={styles.appointmentDetails}>
                      <div className={styles.appointmentPatient}>Maria Silva</div>
                      <div className={styles.appointmentType}>Consulta de Rotina • Sala 101</div>
                    </div>
                    <div className={`${styles.statusBadge} ${styles.statusConfirmado}`}>Confirmado</div>
                    <div className={styles.appointmentActions}>
                      <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}>Ver Paciente</button>
                      <button className={`${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}>Iniciar</button>
                    </div>
                  </div>

                  <div className={styles.appointmentItem}>
                    <div className={styles.appointmentTime}>09:30</div>
                    <div className={styles.appointmentDetails}>
                      <div className={styles.appointmentPatient}>João Santos</div>
                      <div className={styles.appointmentType}>Exame Cardiológico • Sala 102</div>
                    </div>
                    <div className={`${styles.statusBadge} ${styles.statusPendente}`}>Pendente</div>
                    <div className={styles.appointmentActions}>
                      <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}>Ver Paciente</button>
                      <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>Confirmar</button>
                    </div>
                  </div>

                  <div className={styles.appointmentItem}>
                    <div className={styles.appointmentTime}>11:00</div>
                    <div className={styles.appointmentDetails}>
                      <div className={styles.appointmentPatient}>Ana Costa</div>
                      <div className={styles.appointmentType}>Retorno • Sala 101</div>
                    </div>
                    <div className={`${styles.statusBadge} ${styles.statusConfirmado}`}>Confirmado</div>
                    <div className={styles.appointmentActions}>
                      <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}>Ver Paciente</button>
                      <button className={`${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}>Iniciar</button>
                    </div>
                  </div>

                  <div className={styles.appointmentItem}>
                    <div className={styles.appointmentTime}>14:00</div>
                    <div className={styles.appointmentDetails}>
                      <div className={styles.appointmentPatient}>Pedro Oliveira</div>
                      <div className={styles.appointmentType}>Primeira Consulta • Sala 101</div>
                    </div>
                    <div className={`${styles.statusBadge} ${styles.statusConfirmado}`}>Confirmado</div>
                    <div className={styles.appointmentActions}>
                      <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}>Ver Paciente</button>
                      <button className={`${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}>Iniciar</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Week Tab */}
              {activeTab === 'week' && (
                <div className={styles.tabContent}>
                  <table className={styles.scheduleTable}>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Paciente</th>
                        <th>Tipo</th>
                        <th>Horário</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11/07/2025</td>
                        <td>Carlos Lima</td>
                        <td>Consulta de Rotina</td>
                        <td>10:00</td>
                        <td><span className={`${styles.statusBadge} ${styles.statusConfirmado}`}>Confirmado</span></td>
                        <td><button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}>Ver</button></td>
                      </tr>
                      <tr>
                        <td>12/07/2025</td>
                        <td>Lucia Santos</td>
                        <td>Exame Cardíaco</td>
                        <td>09:30</td>
                        <td><span className={`${styles.statusBadge} ${styles.statusPendente}`}>Pendente</span></td>
                        <td><button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}>Ver</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Month Tab */}
              {activeTab === 'month' && (
                <div className={styles.tabContent}>
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    <h3>Calendário Mensal</h3>
                    <p>Visualização do calendário completo do mês</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Ações Rápidas</h3>
              </div>

              <div className={styles.actionItem} onClick={() => openModal('prescription')}>
                <div className={`${styles.actionIcon} ${styles.iconPurple}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Nova Receita</div>
                  <div className={styles.actionSubtitle}>Prescrever medicamentos</div>
                </div>
              </div>

              <div className={styles.actionItem}>
                <div className={`${styles.actionIcon} ${styles.iconBlue}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Solicitar Exame</div>
                  <div className={styles.actionSubtitle}>Requisitar exames</div>
                </div>
              </div>

              <div className={styles.actionItem}>
                <div className={`${styles.actionIcon} ${styles.iconAmber}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Resultados Pendentes</div>
                  <div className={styles.actionSubtitle}>8 exames para análise</div>
                </div>
              </div>

              <div className={styles.actionItem}>
                <div className={`${styles.actionIcon} ${styles.iconGreen}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Buscar Paciente</div>
                  <div className={styles.actionSubtitle}>Histórico e dados</div>
                </div>
              </div>

              <div className={styles.actionItem}>
                <div className={`${styles.actionIcon} ${styles.iconBlue}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Minha Agenda</div>
                  <div className={styles.actionSubtitle}>Gerenciar horários</div>
                </div>
              </div>

              <div className={styles.actionItem}>
                <div className={`${styles.actionIcon} ${styles.iconPurple}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className={styles.actionText}>
                  <div className={styles.actionTitle}>Relatórios</div>
                  <div className={styles.actionSubtitle}>Estatísticas e métricas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Nova Consulta */}
        {showNewAppointmentModal && (
          <div className={styles.modal} onClick={() => closeModal('appointment')}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Nova Consulta</h3>
                <button className={styles.closeBtn} onClick={() => closeModal('appointment')}>×</button>
              </div>
              <form onSubmit={handleAppointmentSubmit}>
                <div className={styles.formGroup}>
                  <label>Paciente:</label>
                  <select required>
                    <option value="">Selecione um paciente</option>
                    <option value="1">Maria Silva</option>
                    <option value="2">João Santos</option>
                    <option value="3">Ana Costa</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Data:</label>
                  <input type="date" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Horário:</label>
                  <input type="time" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Tipo de Consulta:</label>
                  <select required>
                    <option value="">Selecione o tipo</option>
                    <option value="consulta">Consulta de Rotina</option>
                    <option value="retorno">Retorno</option>
                    <option value="urgencia">Urgência</option>
                    <option value="exame">Exame</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Observações:</label>
                  <textarea rows={3} placeholder="Observações sobre a consulta..."></textarea>
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => closeModal('appointment')}>
                    Cancelar
                  </button>
                  <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Agendar Consulta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Prescrição */}
        {showPrescriptionModal && (
          <div className={styles.modal} onClick={() => closeModal('prescription')}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Nova Receita Médica</h3>
                <button className={styles.closeBtn} onClick={() => closeModal('prescription')}>×</button>
              </div>
              <form onSubmit={handlePrescriptionSubmit}>
                <div className={styles.formGroup}>
                  <label>Paciente:</label>
                  <select required>
                    <option value="">Selecione um paciente</option>
                    <option value="1">Maria Silva</option>
                    <option value="2">João Santos</option>
                    <option value="3">Ana Costa</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Medicamento:</label>
                  <input type="text" placeholder="Nome do medicamento" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Dosagem:</label>
                  <input type="text" placeholder="Ex: 500mg" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Frequência:</label>
                  <select required>
                    <option value="">Selecione a frequência</option>
                    <option value="8h">De 8 em 8 horas</option>
                    <option value="12h">De 12 em 12 horas</option>
                    <option value="24h">1 vez ao dia</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Duração do Tratamento:</label>
                  <input type="text" placeholder="Ex: 7 dias" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Observações:</label>
                  <textarea rows={3} placeholder="Instruções especiais..."></textarea>
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => closeModal('prescription')}>
                    Cancelar
                  </button>
                  <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Gerar Receita
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
     
      <Footer />
      
    </div>
  );
};

export default DashboardMedico;