// gerencia as operações dinamicas renderizando com base nas opcoes do CRUD e "tipousuario" selecionado 
import { Usuario } from "./opcoes/ususario";
import { Medico } from "./opcoes/medico";
import { ConsultarUsuario } from "./opcoes/ususario/consultarUsuario";
import { ConsultarMedico } from "./opcoes/medico/consultarMedico";
import { AtualizarUsuario } from "./opcoes/ususario/atualizarUsuario";
import { AtualizarMedico } from "./opcoes/medico/atualizarMedico";
import { RemoverUsuario } from "./opcoes/ususario/removerUsuario";
import { RemoverMedico } from "./opcoes/medico/removerMedico";
// cria um molde que recebe os valores do tipo de ususario e a operação de crud
interface FormularioDinamicoProps {
  tipoUsuario: string;
  operacao: string;
}
// com base nisso returna o formlario correto 
export const FormularioDinamico = ({ tipoUsuario, operacao }: FormularioDinamicoProps) => {
  // CADASTRAR
  if (operacao === "cadastrar" && tipoUsuario === "usuario") {
    return <Usuario />;
  }
  if (operacao === "cadastrar" && tipoUsuario === "medico") {
    return <Medico />;
  }

  // CONSULTAR
  if (operacao === "consultar" && tipoUsuario === "usuario") {
    return <ConsultarUsuario />;
  }
  if (operacao === "consultar" && tipoUsuario === "medico") {
    return <ConsultarMedico />;
  }

  // ATUALIZAR
  if (operacao === "atualizar" && tipoUsuario === "usuario") {
    return <AtualizarUsuario />;
  }
  if (operacao === "atualizar" && tipoUsuario === "medico") {
    return <AtualizarMedico />;
  }

  // REMOVER
  if (operacao === "remover" && tipoUsuario === "usuario") {
    return <RemoverUsuario />;
  }
  if (operacao === "remover" && tipoUsuario === "medico") {
    return <RemoverMedico />;
  }

  return null;
};