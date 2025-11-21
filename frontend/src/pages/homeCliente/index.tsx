import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { iconesOperacoes } from "../../data/operacoes";
import hopital from "../../assets/hospital.webp";
import style from "./style.module.css";
import { useNavigate } from 'react-router-dom';  

interface HomeProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onLogout, onNavigate }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const handleServicoClick = (nomeServico: string) => {
  const servicoNormalizado = nomeServico.toLowerCase();

    if (servicoNormalizado.includes("exame")) {
      if (onNavigate) {
        onNavigate("exames");
      } else {
        window.location.href = "/exames";
      }
    } else if (servicoNormalizado.includes("consulta")) {
      if (onNavigate) {
        onNavigate("consultas");
      } else {
        window.location.href = "/consultas";
      }
    }
  };
  const handleHeaderClick = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';  // Redireciona para login se não autenticado
    return;
  }
  window.location.href = '/perfil';  // Redirecionamento direto e seguro (caminho absoluto)
};

  const handleAgendarClick = () => {
    if (onNavigate) {
      onNavigate("consultas");
    } else {
      window.location.href = "/consultas";
    }
  };

  return (
    <div className={style.wrapper}>
      <Header username={user.nome} onClick={handleHeaderClick} />
      <main className={style.main}>
        <div className={style.conteudo}>
          <section className={style.servicos}>
            <div className={style.servicosHeader}>
              <h1>Serviços Oferecidos</h1>
              <p>Cuidamos da sua saúde com excelência e dedicação</p>
            </div>
            <div className={style.lista}>
              {iconesOperacoes.map((item, index) => (
                <div
                  key={item.nome}
                  className={style.servico}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleServicoClick(item.value)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleServicoClick(item.value);
                    }
                  }}
                >
                  <div className={style.iconWrapper}>
                    <img src={item.img} alt={item.nome} />
                  </div>
                  <h3>{item.value}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className={style.heroSection}>
            <div className={style.heroImg}>
              <img src={hopital} alt="Hospital" />
              <div className={style.heroOverlay}></div>
            </div>
            <div className={style.imgInfo}>
              <h2>Agende sua consulta</h2>
              <p>Atendimento rápido e humanizado para você e sua família</p>
              <button className={style.agendarBtn} onClick={handleAgendarClick}>
                <span>Agendar Agora</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
        <section className={style.diferenciaisSection}>
          <div className={style.diferenciaisHeader}>
            <h2>Por que nos escolher?</h2>
            <p>Comprometidos com a sua saúde e bem-estar</p>
          </div>
          <div className={style.diferenciaisGrid}>
            <div className={style.diferencial}>
              <div className={style.diferencialIcon}></div>
              <h3>Equipe Qualificada</h3>
              <p>
                Profissionais experientes e capacitados para oferecer o melhor
                atendimento
              </p>
            </div>
            <div className={style.diferencial}>
              <div className={style.diferencialIcon}></div>
              <h3>Atendimento 24h</h3>
              <p>
                Emergências atendidas a qualquer hora, todos os dias da semana
              </p>
            </div>
            <div className={style.diferencial}>
              <div className={style.diferencialIcon}></div>
              <h3>Tecnologia Avançada</h3>
              <p>
                Equipamentos modernos para diagnósticos precisos e tratamentos
                eficazes
              </p>
            </div>
            <div className={style.diferencial}>
              <div className={style.diferencialIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                ></svg>
              </div>
              <h3>Atendimento Humanizado</h3>
              <p>Cuidado personalizado e acolhedor para cada paciente</p>
            </div>
          </div>
        </section>

        <section className={style.mapaSection}>
          <div className={style.mapaHeader}>
            <h2>Nossa Localização</h2>
            <p>Venha nos visitar. Estamos prontos para atendê-lo!</p>
          </div>
          <div className={style.mapaWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29854.892225678494!2d-46.62567304171121!3d-20.715846867387842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b6c3b86636a1e7%3A0x99cfd00db7a831d8!2sSanta%20Casa%20de%20Miseric%C3%B3rdia%20de%20Passos!5e0!3m2!1spt-BR!2sbr!4v1761313407654!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do hospital"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
      {onLogout && (
        <button onClick={onLogout} className={style.logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Home;
