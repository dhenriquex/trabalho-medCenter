import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Grafico = ({ consultasSemana = [], examesPendentes = [] }) => {
  // Processar tipos de consulta
  const processarTiposConsulta = () => {
    const tipos = {};
    consultasSemana.forEach((c) => {
      const tipo = c.tipo || "";

      // Categorizar baseado no texto do tipo
      let categoria = "Outros";

      if (tipo.includes("Retorno")) {
        categoria = "Retornos";
      } else if (tipo.includes("Emergência") || tipo.includes("Urgente")) {
        categoria = "Emergências";
      } else if (tipo.includes("Preventiva")) {
        categoria = "Preventivas";
      } else if (tipo.includes("Consulta")) {
        categoria = "Consultas";
      }

      tipos[categoria] = (tipos[categoria] || 0) + 1;
    });

    const resultado = [
      { nome: "Consultas", valor: tipos["Consultas"] || 0, cor: "#3b82f6" },
      { nome: "Retornos", valor: tipos["Retornos"] || 0, cor: "#10b981" },
      { nome: "Emergências", valor: tipos["Emergências"] || 0, cor: "#ef4444" },
      { nome: "Preventivas", valor: tipos["Preventivas"] || 0, cor: "#f59e0b" },
      { nome: "Outros", valor: tipos["Outros"] || 0, cor: "#8b5cf6" },
    ].filter((t) => t.valor > 0);

    return resultado;
  };

  // Processar consultas por data (agrupando por dia)
  const processarConsultasPorData = () => {
    const consultasPorData = {};

    consultasSemana.forEach((c) => {
      const data = c.data; // Formato: "DD/MM/YYYY"
      consultasPorData[data] = (consultasPorData[data] || 0) + 1;
    });

    // Converter para array e ordenar por data
    return Object.entries(consultasPorData)
      .map(([data, total]) => ({
        data: data,
        pacientes: total,
      }))
      .sort((a, b) => {
        // Converter DD/MM/YYYY para comparação
        const [diaA, mesA, anoA] = a.data.split("/");
        const [diaB, mesB, anoB] = b.data.split("/");
        const dateA = new Date(anoA, mesA - 1, diaA);
        const dateB = new Date(anoB, mesB - 1, diaB);
        return dateA - dateB;
      });
  };

  // Processar tipos de exames pendentes
  const processarTiposExames = () => {
    const tipos = {};

    examesPendentes.forEach((exame) => {
      const tipo = exame.tipo || "Outros";
      tipos[tipo] = (tipos[tipo] || 0) + 1;
    });

    return Object.entries(tipos)
      .map(([nome, valor]) => ({
        nome,
        valor,
      }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5); // Top 5 tipos de exames
  };

  // Processar status das consultas
  const processarStatusConsultas = () => {
    const status = {
      Marcado: 0,
      Confirmado: 0,
      Concluido: 0,
      Cancelado: 0,
    };

    consultasSemana.forEach((c) => {
      const statusConsulta = c.status || "Marcado";
      if (status.hasOwnProperty(statusConsulta)) {
        status[statusConsulta]++;
      }
    });

    return [
      { status: "Marcado", quantidade: status.Marcado, cor: "#f59e0b" },
      { status: "Confirmado", quantidade: status.Confirmado, cor: "#3b82f6" },
      { status: "Concluído", quantidade: status.Concluido, cor: "#10b981" },
      { status: "Cancelado", quantidade: status.Cancelado, cor: "#ef4444" },
    ].filter((s) => s.quantidade > 0);
  };

  const tiposConsulta = processarTiposConsulta();
  const consultasPorData = processarConsultasPorData();
  const tiposExames = processarTiposExames();
  const statusConsultas = processarStatusConsultas();

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Gráfico de Linha - Pacientes Atendidos ao Longo do Tempo */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            Consultas no Período
          </h3>
          {consultasPorData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={consultasPorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="data"
                  stroke="#64748b"
                  style={{ fontSize: "0.75rem" }}
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pacientes"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Pacientes"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              Sem dados disponíveis
            </div>
          )}
        </div>

        {/* Gráfico de Pizza - Tipos de Consulta */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            Distribuição por Tipo de Consulta
          </h3>
          {tiposConsulta.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tiposConsulta}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nome, percent }) =>
                    `${nome} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {tiposConsulta.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p style={{ margin: 0, marginBottom: "0.5rem" }}>
                  Sem dados disponíveis
                </p>
                <p style={{ fontSize: "0.75rem", color: "#cbd5e1", margin: 0 }}>
                  Total de consultas: {consultasSemana.length}
                </p>
              </div>
            </div>
          )}

          {/* Legenda dos tipos */}
          {tiposConsulta.length > 0 && (
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              {tiposConsulta.map((tipo, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      background: tipo.cor,
                      borderRadius: "2px",
                    }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    {tipo.nome}: {tipo.valor}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gráfico de Barras - Tipos de Exames Pendentes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            Top 5 - Tipos de Exames Pendentes
          </h3>
          {tiposExames.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tiposExames}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="nome"
                  stroke="#64748b"
                  style={{ fontSize: "0.875rem" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="valor" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              Nenhum exame pendente no momento
            </div>
          )}
        </div>

        {/* Gráfico de Barras Horizontais - Status das Consultas */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            Status das Consultas
          </h3>
          {statusConsultas.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusConsultas} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis
                  type="category"
                  dataKey="status"
                  stroke="#64748b"
                  style={{ fontSize: "0.875rem" }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="quantidade" radius={[0, 8, 8, 0]}>
                  {statusConsultas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              Sem dados de status disponíveis
            </div>
          )}

          {/* Legenda de status */}
          {statusConsultas.length > 0 && (
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              {statusConsultas.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      background: item.cor,
                      borderRadius: "2px",
                    }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    {item.status}: {item.quantidade}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grafico;
