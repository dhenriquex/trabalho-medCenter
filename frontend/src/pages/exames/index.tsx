import style from "./Exames.module.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useState } from "react";
import {
  examesData as exames,
  horarios,
  horariosIndisponiveis,
  locais,
} from "../../data/exames";

interface Exame {
  id: number;
  nome: string;
  duracao: string;
  preco: number;
  value: string;
  codigo: string;
}

interface FormData {
  tipo: string;
  data: string;
  horario: string;
  local: string;
  possuiDoencaCronica: boolean;
  possuiIndicacao: boolean;
  doencasCronicas: string;
  possuiAlergia: boolean;
  meidco: string;
  arquivo: File | null;
  especialidade: string;
  alergias: string;
  prioridade: string;
  observacoes: string;
}

const updatedExames: Exame[] = exames.map((exame) => ({
  ...exame,
  value: exame.nome.toLowerCase().replace(/\s+/g, "-"),
  codigo: exame.id.toString(),
}));
interface ExamesProps {
  onNavigate?: (page: string) => void;
}
export const Exames: React.FC<ExamesProps> = ({ onNavigate })=> {
  const [formData, setFormData] = useState<FormData>({
    tipo: "",
    data: "",
    horario: "",
    local: "",
    possuiIndicacao: false,
    possuiDoencaCronica: false,
    meidco: "",
    arquivo: null,
    especialidade: "",
    doencasCronicas: "",
    possuiAlergia: false,
    alergias: "",
    prioridade: "normal",
    observacoes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados do exame:", formData);
    alert("Exame agendado com sucesso!");
  };

  const exameSelecionado = updatedExames.find(
    (exame: Exame) => exame.value === formData.tipo
  );

  return (
    <div className={style.body}>
      <Header />
      <main className={style.mainContent}>
        <div className={style.container}>
          <div className={style.pageHeader}>
            <h1 className={style.pageTitle}>Agendar Exame</h1>
            <p className={style.pageSubtitle}>
              Complete as informações abaixo para agendar seu exame
            </p>
          </div>

          <form className={style.schedulingContainer} onSubmit={handleSubmit}>
            {/* Tipo de Exame */}
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>1</div>
                <div>
                  <h2 className={style.stepTitle}>Escolha o Tipo de Exame</h2>
                </div>
              </div>

              <div className={style.formGroup}>
                <label className={style.formLabel}>Tipo de Exame</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className={style.formInput}
                  required
                >
                  <option value="">Selecione</option>
                  {updatedExames.map((exame: Exame) => (
                    <option key={exame.codigo} value={exame.value}>
                      {exame.nome} - R$ {exame.preco.toFixed(2)}
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
                  <label className={style.formLabel}>Data do Exame</label>
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
                    {horarios.map((horario) => (
                      <option
                        key={horario}
                        value={horario}
                        disabled={horariosIndisponiveis.includes(horario)}
                      >
                        {horario}{" "}
                        {horariosIndisponiveis.includes(horario)
                          ? "(Indisponível)"
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
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

            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>4</div>
                <div>
                  <h2 className={style.stepTitle}>Indicação medica</h2>
                </div>
              </div>
              <div className={style.formGroup}>
                <label className={style.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="possuiIndicacao"
                    onChange={handleChange}
                    checked={formData.possuiIndicacao}
                  />
                  Possui indicação medica?
                </label>
                {formData.possuiIndicacao && (
                  <div className={style.subFormGroup}>
                    <div className={style.sectionIndication}>
                      <label className={style.formLabel}>
                        Digite o nome do medico
                      </label>

                      <input
                        type="text"
                        name="nomeMedico"
                        value={formData.meidco}
                        onChange={handleChange}
                        className={style.formInput}
                      />
                    </div>
                    <div className={style.sectionIndication}>
                      <label className={style.formLabel}>
                        Especialidade do medico
                      </label>
                      <select
                        className={style.formInput}
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                      >
                        <option value="">Selecione a especialidade</option>
                        <option value="Cardiologista">Cardiologista</option>
                        <option value="Dermatologista">Dermatologista</option>
                        <option value="Endocrinologista">
                          {" "}
                          Endocrinologista
                        </option>
                        <option value="Gastroenterologista">
                          Gastroenterologista
                        </option>
                        <option value="Neurologista">Neurologista</option>
                        <option value="Oftalmologista">Oftalmologista</option>
                        <option value="Ortopedista">Ortopedista</option>
                        <option value="Pediatra">Pediatra</option>
                        <option value="Psiquiatra">Psiquiatra</option>
                        <option value="Urologista">Urologista</option>
                      </select>
                    </div>
                    <div className={style.sectionIndication}>
                      <label className={style.formLabel}>
                        Anexe o arquivo da indicação médica
                      </label>
                      <input
                        type="file"
                        name="arquivo"
                        value={formData.arquivo ? formData.arquivo.name : ""}
                        onChange={handleChange}
                        className={style.formInput}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>5</div>
                <div>
                  <h2 className={style.stepTitle}>Informações de Saúde</h2>
                </div>
              </div>

              <div className={style.healthInfoGrid}>
                <div className={style.formGroup}>
                  <label className={style.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="possuiDoencaCronica"
                      checked={formData.possuiDoencaCronica}
                      onChange={handleChange}
                    />
                    Possui doença crônica?
                  </label>
                  {formData.possuiDoencaCronica && (
                    <textarea
                      name="doencasCronicas"
                      placeholder="Ex: Diabetes tipo 2, Hipertensão arterial, Asma..."
                      value={formData.doencasCronicas}
                      onChange={handleChange}
                      className={style.formInput}
                    />
                  )}
                </div>

                <div className={style.formGroup}>
                  <label className={style.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="possuiAlergia"
                      checked={formData.possuiAlergia}
                      onChange={handleChange}
                    />
                    Possui alguma alergia?
                  </label>
                  {formData.possuiAlergia && (
                    <textarea
                      name="alergias"
                      placeholder="Ex: Contraste iodado, látex, penicilina, dipirona..."
                      value={formData.alergias}
                      onChange={handleChange}
                      className={style.formInput}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={style.formCard}>
              <div className={style.stepHeader}>
                <div className={style.stepNumber}>6</div>
                <div>
                  <h2 className={style.stepTitle}>Prioridade do Exame</h2>
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

            <div className={style.formCard}>
              <div className={style.formGroup}>
                <label className={style.formLabel}>
                  Observações (opcional)
                </label>
                <textarea
                  name="observacoes"
                  placeholder="Informações adicionais que possam ser relevantes para o exame..."
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

export default Exames;
