// dados das imagens usadas no GridItems
import create from "../assets/sinal-de-mais.png";
import update from "../assets/atualizar.png";
import read from "../assets/procurar (1).png";
import remove from "../assets/remover.png";
import exame from "../assets/exame.png";
import consulta from "../assets/hospital.png";
import resultado from "../assets/resultados.png";
import assistencia from "../assets/assistencia-medica.png";
export const Opcoes = [
  {
    title: "Cadastrar",
    image: create,
    value: "cadastrar"
  },
  {
    title: "Consultar",
    image: read,
    value: "consultar"
  },
  {
    title: "Atualizar",
    image: update,
    value: "atualizar"
  },
  {
    title: "Remover",
    image: remove,
    value: "remover"
  },
];

export const iconesOperacoes = [
  {nome: 'exame', img: exame, value :"Agendar exames" },
  {nome: 'consulta', img: consulta, value: "Agendar consultas" },
  {nome: 'resultado', img: resultado, value: "Resultados de exames" },
  {nome: 'assistencia', img: assistencia, value: "Assistência médica" }
]

    