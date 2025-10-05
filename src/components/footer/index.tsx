//footer do trojeto
import { redeSocial } from "../../data/redeSocial";
// importa os dados das redes sociais
import styles from "./footer.module.css";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerArea}>
        <div className={styles.info}>
          <div className={styles.aboutUs}>
            <h3>MedCenter</h3>
            <p>
              Há mais de 15 anos cuidando com eficiência, tecnologia de ponta e
              atendimento personalizado. Somos referência em diagnóstico e
              tratamento médico de qualidade.
            </p>
          </div>
          <p className={styles.followText}>Siga-nos nas redes sociais</p>
          <div className={styles.imgs}>
            {redeSocial.map((item) => (
              <img src={item.img} key={item.name} alt={item.name} />
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3>Serviços</h3>
          <ul>
            <li>Agendamento Online</li>
            <li>Consultas Médicas</li>
            <li>Exames Laboratoriais</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Atendimento</h3>
          <ul>
            <li>
              <strong>Endereço:</strong> Av. Paulista 158 - Bela Vista
            </li>
            <li>
              <strong>Telefone:</strong> (95) 99912-3456
            </li>
          </ul>
          <div className={styles.quickAccess}>
            <span>Acesso Rápido</span>
            <div className={styles.buttons}>
              <button>Perfil do Paciente</button>
              <button>Resultado do Exame</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        <p>
          © {new Date().getFullYear()} MedCenter - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};
