//header do projeto
import medCenter from "../../assets/logoMedCenter.png";
import style from "./header.module.css";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
      <div className={style.logo}>
        <img src={medCenter} alt="Logo MedCenter" />
        <h1>MedCenter</h1>
      </div>
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
      </div>
    </header>
  );
};
