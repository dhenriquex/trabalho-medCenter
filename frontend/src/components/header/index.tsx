//header do projeto
import medCenter from "../../assets/logoMedCenter.png";
import style from "./header.module.css";
import perfil from "../../assets/perfil.png";
 interface HeaderProps {
  username?: string;
  medico?: boolean;
  onClick?: () => void;  
}

export const Header = ({username, medico, onClick}:HeaderProps) => {
  return (
    <header className={style.header}>
      <div className={style.container}>
      <div className={style.logo}>
        <img src={medCenter} alt="Logo MedCenter" />
        <h1>MedCenter</h1>
      </div>
      {medico ? null :
      <nav>
        <ul className={style.info}>
          <li>
            <a href="#">Home</a>
          </li>
          <li className={style.dropdown}>
            <a href="#">Serviços</a>
            <ul className={style.services}>
              <li>
                <a href="#">Cadastro</a>
              </li>
              <li>
                <a href="#">Agendamento</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Sobre Nós</a>
          </li>
        </ul>
      </nav>
 }
      <div className={style.profile} onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <img src={perfil} alt="" />
        <h3>{username}</h3>
      </div>
      </div>
    </header>
  );
};
