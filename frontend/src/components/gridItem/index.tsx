// Operações dos componetenes (CRUD)
import style from "./style.module.css";
import { Opcoes } from "../../data/operacoes";
// carregando os dados dos itens 
// cria um molde de uma classe que tem, uma uma funçaõ de clique e seu valor, da opção ativa
interface GridItemProps {
  onSelectOperacao: (operacao: string) => void;
  operacaoAtiva: string;
}
export const GridItem = ({onSelectOperacao, operacaoAtiva}:GridItemProps) => {
  return (
    <div className={style.gridContent}>
       {/* mapea os dados e renderiza*/}
      {Opcoes.map((item, index) => (
        <div 
          className={`${style.gridItem} ${operacaoAtiva === item.value ? style.active : ""}`}
          key={index}
          onClick={() => onSelectOperacao(item.value)}
        >{/* fazer a opção ficar selecionada*/}
          <img src={item.image} alt={item.title} />
          <div className={style.info}>
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
