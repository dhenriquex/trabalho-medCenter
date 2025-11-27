import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import style from "./style.module.css";
import { useState } from "react";
import { locais } from "../../data/exames";
import { 
  especializacoes, 
  horariosConsulta, 
  horariosIndisponiveisConsulta 
} from "../../data/consulta";

interface Consulta {
  id: number;
  tipo: string;
  valor: number;
  value: string;
  codigo: string;
}

interface FormData {
  tipo: string;
  data: string;
  horario: string;
  local: string;
  medico: string;
  especialidade: string;
  prioridade: string;
  observacoes: string;
  possuiIndicacao?: boolean;
  nomeMedico?: string;
  arquivo?: File;
}

interface ConsultasProps {
  onNavigate?: (page: string) => void;
}

const updatedConsultas: Consulta[] = especializacoes.map((especialidade) => ({
  ...especialidade,
  value: especialidade.tipo.toLowerCase().replace(/\s+/g, "-"),
  codigo: especialidade.id.toString(),
}));

export const Consultas: React.FC<ConsultasProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<FormData>({
    tipo: "",
    data: "",
    horario: "",
    local: "",
    medico: "",
    especialidade: "",
    prioridade: "normal",
    observacoes: "",
    possuiIndicacao: false,
    nomeMedico: "",
    arquivo: undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const files = (e.target as HTMLInputElement).files;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados da consulta:", formData);
    alert("Consulta agendada com sucesso!");
  };

  const handleVoltar = () => {
    if (onNavigate) {
      onNavigate("home");
    } else {
      window.history.back();
    }
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className={style.body}>
      <Header username={user.nome} />
      <main className={style.mainContent}>
        <div className={style.container}>
          <div className={style.pageHeader}>
            <h1 className={style.pageTitle}>Consultas</h1>
            <p className={style.pageSubtitle}>
              Complete as informações abaixo para agendar sua consulta
            </p>
          </div>

          <form className={style.schedulingContainer} onSubmit={handleSubmit}>
            {/* Tipo de Consulta */}
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>1</div>
                <div>
                  <h2 className={style.stepTitle}>Escolha o Tipo de Consulta</h2>
                </div>
              </div>

              <div className={style.formGroup}>
                <label className={style.formLabel}>Tipo de Consulta</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className={style.formInput}
                  required
                >
                  <option value="">Selecione</option>
                  {updatedConsultas.map((consulta: Consulta) => (
                    <option key={consulta.codigo} value={consulta.value}>
                      {consulta.tipo} - R$ {consulta.valor.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Data e Horário */}
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>2</div>
                <div>
                  <h2 className={style.stepTitle}>Selecione Data e Horário</h2>
                </div>
              </div>

              <div className={style.datetimeGrid}>
                <div className={style.formGroup}>
                  <label className={style.formLabel}>Data da Consulta</label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    className={style.formInput}
                    required
                  />
                </div>

                <div className={style.formGroup}>
                  <label className={style.formLabel}>Horário</label>
                  <select
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    className={style.formInput}
                    required
                  >
                    <option value="">Selecione</option>
                    {horariosConsulta.map((horario) => (
                      <option
                        key={horario}
                        value={horario}
                        disabled={horariosIndisponiveisConsulta.includes(horario)}
                      >
                        {horario}{" "}
                        {horariosIndisponiveisConsulta.includes(horario)
                          ? "(Indisponível)"
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Local */}
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>3</div>
                <div>
                  <h2 className={style.stepTitle}>
                    Escolha o Local de Atendimento
                  </h2>
                </div>
              </div>

              <div className={style.formGroup}>
                <label className={style.formLabel}>Local</label>
                <select
                  name="local"
                  value={formData.local}
                  onChange={handleChange}
                  className={style.formInput}
                  required
                >
                  <option value="">Selecione</option>
                  {locais.map((local) => (
                    <option key={local.id} value={local.id}>
                      {local.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prioridade */}
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>4</div>
                <div>
                  <h2 className={style.stepTitle}>Prioridade da Consulta</h2>
                </div>
              </div>

              <div className={style.formGroup}>
                <label className={style.formLabel}>Prioridade</label>
                <select
                  name="prioridade"
                  value={formData.prioridade}
                  onChange={handleChange}
                  className={style.formInput}
                >
                  <option value="normal">Normal - Agendamento padrão</option>
                  <option value="urgente">Urgente - Será priorizado</option>
                  <option value="emergencia">
                    Emergência - Atendimento imediato
                  </option>
                </select>
              </div>
            </div>

            {/* Observações */}
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>5</div>
                <div>
                  <h2 className={style.stepTitle}>Observações (opcional)</h2>
                </div>
              </div>
              <div className={style.formGroup}>
                <label className={style.formLabel}>
                  Observações
                </label>
                <textarea
                  name="observacoes"
                  placeholder="Informações adicionais que possam ser relevantes para a consulta..."
                  value={formData.observacoes}
                  onChange={handleChange}
                  className={style.formInput}
                />
              </div>
            </div>

            <div className={style.buttonGroup}>
              <button
                type="button"
                className={`${style.btn} ${style.btnSecondary}`}
                onClick={handleVoltar}
              >
                Voltar
              </button>
              <button
                type="submit"
                className={`${style.btn} ${style.btnPrimary}`}
                disabled={
                  !formData.tipo ||
                  !formData.data ||
                  !formData.horario ||
                  !formData.local
                }
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultas;