import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const buscarCliente = (req, res) => {
  const { search } = req.query;

  let q = "SELECT * FROM cliente WHERE cpf LIKE ? OR email LIKE ?";
  const params = [`%${search}%`, `%${search}%`];

  db.query(q, params, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const login = (req, res) => {
  const { search, password } = req.body;

  console.log("🔐 Tentativa de login:", search);

  const isCPF = search.length === 11 || search.replace(/\D/g, "").length === 11;

  let query;
  let params;

  if (isCPF) {
    query = "SELECT * FROM cliente WHERE cpf = ?";
    params = [search.replace(/\D/g, "")];
  } else {
    query = "SELECT * FROM medico WHERE crm = ?";
    params = [search];
  }

  db.query(query, params, (err, data) => {
    if (err) {
      console.error("❌ Erro na query:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    if (data.length === 0) {
      console.error("❌ Usuário não encontrado");
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = data[0];
    console.log("✅ Usuário encontrado:", user.nome);

    // Verificar senha
    if (password !== user.senha) {
      console.error("❌ Senha incorreta");
      return res.status(401).json({ error: "Senha incorreta" });
    }

    console.log("✅ Senha correta, gerando token...");

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        tipo: isCPF ? "cliente" : "medico",
        nome: user.nome,
      },
      "medicenter_secret_key_2024",
      { expiresIn: "24h" }
    );

    console.log("✅ Token gerado:", token);

    // Remover senha antes de enviar
    delete user.senha;

    // RESPOSTA CORRETA COM TOKEN
    const resposta = {
      success: true,
      token: token,  // ← IMPORTANTE: Inclui o token aqui!
      user: {
        ...user,
        tipo: isCPF ? "cliente" : "medico",
      },
    };

    console.log("📤 Enviando resposta:", resposta);
    res.json(resposta);
  });
};
export const buscarMedico = (req, res) => {
  const { search, especialidade } = req.query;
  let q = "SELECT * FROM medico WHERE 1=1";
  const params = [];
  if (search) {
    q += " AND (crm LIKE ? OR nome LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  if (especialidade && especialidade !== "") {
    q += " AND especialidade = ?";
    params.push(especialidade);
  }
  db.query(q, params, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addMedico = (req, res) => {
  const {
    nome,
    crm,
    dataDeNasc,
    especialidade,
    email,
    dataContratacao,
    telefone,
    cpf,
    senha,
    cidade,
    estado,
    bairro,
    complemento,
    numero,
    cep,
  } = req.body;

  // 1. Validação mínima
  if (
    !nome ||
    !crm ||
    !dataDeNasc ||
    !especialidade ||
    !email ||
    !dataContratacao ||
    !telefone ||
    !cpf ||
    !senha ||
    !cidade ||
    !estado ||
    !bairro ||
    !numero ||
    !cep
  ) {
    return res
      .status(400)
      .json("Todos os campos obrigatórios devem ser preenchidos.");
  }

  // 2. Inserir endereço
  const qEndereco = `
    INSERT INTO endereco (cidade, estado, bairro, complemento, numero, cep)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valuesEndereco = [
    cidade,
    estado,
    bairro,
    complemento || null,
    Number(numero),
    cep,
  ];

  db.query(qEndereco, valuesEndereco, (errEndereco, resultEndereco) => {
    if (errEndereco) {
      console.log("Erro ao inserir endereço:", errEndereco);
      return res
        .status(500)
        .json("Erro ao inserir endereço: " + errEndereco.message);
    }

    const enderecoId = resultEndereco.insertId;

    // 3. Inserir médico
    const qMedico = `
      INSERT INTO medico (crm, nome, email, telefone, especialidade, cpf, dataDeNasc, dataContratacao, endereco_id, senha)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valuesMedico = [
      Number(crm),
      nome,
      email,
      telefone,
      especialidade,
      cpf,
      dataDeNasc, // formata como YYYY-MM-DD
      dataContratacao, // formata como YYYY-MM-DD
      enderecoId,
      senha, // Em produção: usar bcrypt
    ];

    db.query(qMedico, valuesMedico, (errMedico, resultMedico) => {
      if (errMedico) {
        console.log("Erro ao inserir médico:", errMedico);

        // Mensagem mais clara para UNIQUE
        if (errMedico.code === "ER_DUP_ENTRY") {
          return res.status(400).json("CRM, CPF ou Email já cadastrado.");
        }

        return res
          .status(500)
          .json("Erro ao inserir médico: " + errMedico.message);
      }

      return res
        .status(200)
        .json("Médico cadastrado com sucesso! ID: " + resultMedico.insertId);
    });
  });
};

export const addCliente = (req, res) => {
  const {
    nome,
    email,
    telefone,
    cpf,
    dataDeNasc,
    sexo,
    senha,
    cidade,
    estado,
    bairro,
    complemento,
    numero,
    cep,
  } = req.body;

  // 1. Validação mínima
  if (
    !nome ||
    !cpf ||
    !dataDeNasc ||
    !email ||
    !sexo ||
    !telefone ||
    !senha ||
    !cidade ||
    !estado ||
    !bairro ||
    !numero ||
    !cep
  ) {
    return res
      .status(400)
      .json("Todos os campos obrigatórios devem ser preenchidos.");
  }

  // 2. Inserir endereço
  const qEndereco = `
    INSERT INTO endereco (cidade, estado, bairro, complemento, numero, cep)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valuesEndereco = [
    cidade,
    estado,
    bairro,
    complemento || null,
    Number(numero),
    cep,
  ];

  db.query(qEndereco, valuesEndereco, (errEndereco, resultEndereco) => {
    if (errEndereco) {
      console.log("Erro ao inserir endereço:", errEndereco);
      return res
        .status(500)
        .json("Erro ao inserir endereço: " + errEndereco.message);
    }

    const enderecoId = resultEndereco.insertId;

    // 3. Inserir médico
    const qCliente = `
      INSERT INTO cliente ( nome, email, telefone, cpf, dataDeNasc, endereco_id, senha, sexo)
      VALUES (?,?,?,?,?,?,?,?)
    `;
    const valuesCliente = [
      nome,
      email,
      telefone,
      cpf,
      dataDeNasc,
      enderecoId,
      senha,
      sexo,
    ];

    db.query(qCliente, valuesCliente, (errCliente, resultCliente) => {
      if (errCliente) {
        console.log("Erro ao inserir Cliente:", errCliente);

        // Mensagem mais clara para UNIQUE
        if (errMedico.code === "ER_DUP_ENTRY") {
          return res.status(400).json("CPF ou Email.");
        }

        return res
          .status(500)
          .json("Erro ao inserir cleinte: " + errCliente.message);
      }

      return res
        .status(200)
        .json("Cliente cadastrado com sucesso! ID: " + resultCliente.insertId);
    });
  });
};

export const exames = () => (req, res) => {};
export const consultas = () => (req, res) => {};
export const updateUser = (req, res) => {
  // Implemente depois se precisar (ex: UPDATE com JOIN se alterar endereço)
};

export const deleteUser = (req, res) => {
  // Implemente depois (ex: DELETE FROM medico WHERE id = ?; CASCADE deleta endereço auto)
};


export const perfilCliente = async (req, res) => {
  console.log("📊 ========== FUNÇÃO PERFIL CLIENTE CHAMADA ==========");
  console.log("👤 req.user:", req.user);

  try {
    // Pegar o ID do usuário do token JWT (assumindo que você tem middleware de autenticação)
    const clienteId = req.user?.id;
    console.log("🔍 Cliente ID extraído:", clienteId);

    if (!clienteId) {
      console.error("❌ Cliente ID não encontrado no token!");
      return res
        .status(400)
        .json({ error: "ID do cliente não encontrado no token" });
    }

    // Query para buscar dados do cliente
    const queryCliente = `
      SELECT c.*, e.cidade, e.estado, e.bairro, e.complemento, e.numero, e.cep
      FROM cliente c
      LEFT JOIN endereco e ON c.endereco_id = e.id
      WHERE c.id = ?
    `;

    // Query para buscar exames agendados (status 'Marcado')
    const queryExamesAgendados = `
      SELECT 
        ex.id,
        ex.tipo as nome,
        DATE_FORMAT(ex.dataRequerimento, '%d/%m/%Y') as data,
        ex.valor,
        ex.statusEx as status,
        m.nome as nomeMedico,
        m.especialidade
      FROM exame ex
      LEFT JOIN medico m ON ex.medico_id = m.id
      WHERE ex.cliente_id = ? AND ex.statusEx = 'Marcado'
      ORDER BY ex.dataRequerimento ASC
    `;

    // Query para buscar resultados disponíveis (status 'Concluido')
    const queryResultadosDisponiveis = `
      SELECT 
        ex.id,
        ex.tipo as nome,
        DATE_FORMAT(ex.dataEmissao, '%d/%m/%Y') as data,
        ex.resultado,
        ex.statusEx as status,
        ex.valor,
        m.nome as nomeMedico,
        m.especialidade
      FROM exame ex
      LEFT JOIN medico m ON ex.medico_id = m.id
      WHERE ex.cliente_id = ? AND ex.statusEx = 'Concluido'
      ORDER BY ex.dataEmissao DESC
    `;

    // Query para buscar consultas agendadas
    const queryConsultasAgendadas = `
      SELECT 
        c.id,
        c.tipo as nome,
        DATE_FORMAT(c.dataConsulta, '%d/%m/%Y') as data,
        c.valor,
        c.statusEx as status,
        c.descricaoConsul,
        c.laboratorio,
        m.nome as nomeMedico,
        m.especialidade
      FROM consulta c
      LEFT JOIN medico m ON c.medico_id = m.id
      WHERE c.cliente_id = ? AND c.statusEx IN ('Marcado', 'Concluido')
      ORDER BY c.dataConsulta DESC
    `;

    // Query para contar estatísticas
    const queryEstatisticas = `
      SELECT 
        (SELECT COUNT(*) FROM exame WHERE cliente_id = ? AND statusEx = 'Marcado') as examesAgendados,
        (SELECT COUNT(*) FROM exame WHERE cliente_id = ? AND statusEx = 'Concluido') as resultadosDisponiveis,
        (SELECT COUNT(*) FROM exame WHERE cliente_id = ? AND statusEx = 'Concluido') as examesRealizados,
        (SELECT COUNT(*) FROM consulta WHERE cliente_id = ? AND statusEx = 'Marcado') as consultasAgendadas
    `;

    // Executar todas as queries
    db.query(queryCliente, [clienteId], (err, dadosCliente) => {
      if (err) {
        console.error("Erro ao buscar cliente:", err);
        return res
          .status(500)
          .json({ error: "Erro ao buscar dados do cliente" });
      }

      if (dadosCliente.length === 0) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      db.query(queryExamesAgendados, [clienteId], (err, examesAgendados) => {
        if (err) {
          console.error("Erro ao buscar exames agendados:", err);
          return res
            .status(500)
            .json({ error: "Erro ao buscar exames agendados" });
        }

        db.query(
          queryResultadosDisponiveis,
          [clienteId],
          (err, resultadosDisponiveis) => {
            if (err) {
              console.error("Erro ao buscar resultados:", err);
              return res
                .status(500)
                .json({ error: "Erro ao buscar resultados" });
            }

            db.query(
              queryConsultasAgendadas,
              [clienteId],
              (err, consultasAgendadas) => {
                if (err) {
                  console.error("Erro ao buscar consultas:", err);
                  return res
                    .status(500)
                    .json({ error: "Erro ao buscar consultas" });
                }

                db.query(
                  queryEstatisticas,
                  [clienteId, clienteId, clienteId, clienteId],
                  (err, estatisticas) => {
                    if (err) {
                      console.error("Erro ao buscar estatísticas:", err);
                      return res
                        .status(500)
                        .json({ error: "Erro ao buscar estatísticas" });
                    }

                    // Montar resposta completa
                    const cliente = dadosCliente[0];
                    delete cliente.senha; // Remover senha por segurança

                    res.json({
                      success: true,
                      cliente: {
                        id: cliente.id,
                        nome: cliente.nome,
                        email: cliente.email,
                        telefone: cliente.telefone,
                        cpf: cliente.cpf,
                        dataDeNasc: cliente.dataDeNasc,
                        sexo: cliente.sexo,
                        endereco: {
                          cidade: cliente.cidade,
                          estado: cliente.estado,
                          bairro: cliente.bairro,
                          complemento: cliente.complemento,
                          numero: cliente.numero,
                          cep: cliente.cep,
                        },
                      },
                      examesAgendados: examesAgendados.map((ex) => ({
                        id: ex.id,
                        nome: ex.nome,
                        data: ex.data,
                        horario: "09:00", // Você pode adicionar campo de horário no banco se necessário
                        status:
                          ex.statusEx === "Marcado" ? "confirmado" : "pendente",
                        medico: ex.nomeMedico,
                        especialidade: ex.especialidade,
                        valor: ex.valor,
                      })),
                      resultadosDisponiveis: resultadosDisponiveis.map(
                        (res) => ({
                          id: res.id,
                          nome: res.nome,
                          data: res.data,
                          status: "disponivel",
                          resultado:
                            res.resultado === 1 ? "Normal" : "Alterado",
                          medico: res.nomeMedico,
                          valor: res.valor,
                        })
                      ),
                      consultasAgendadas: consultasAgendadas.map((con) => ({
                        id: con.id,
                        nome: con.nome,
                        data: con.data,
                        status: con.status,
                        descricao: con.descricaoConsul,
                        laboratorio: con.laboratorio,
                        medico: con.nomeMedico,
                        especialidade: con.especialidade,
                        valor: con.valor,
                      })),
                      estatisticas: {
                        examesAgendados: estatisticas[0].examesAgendados,
                        resultadosDisponiveis:
                          estatisticas[0].resultadosDisponiveis,
                        examesRealizados: estatisticas[0].examesRealizados,
                        consultasAgendadas: estatisticas[0].consultasAgendadas,
                      },
                      atividadesRecentes: [
                        // Combinar últimas atividades (você pode melhorar isso com uma query específica)
                        ...resultadosDisponiveis.slice(0, 2).map((r) => ({
                          id: r.id,
                          texto: `Resultado do ${r.nome} disponível`,
                          data: r.data,
                        })),
                        ...examesAgendados.slice(0, 1).map((e) => ({
                          id: e.id,
                          texto: `Exame de ${e.nome} agendado`,
                          data: e.data,
                        })),
                      ].slice(0, 5), // Limitar a 5 atividades recentes
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  } catch (error) {
    console.error("Erro no perfilCliente:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
export const dashboardMedico = async (req, res) => {
  console.log("📊 ========== DASHBOARD MÉDICO CHAMADO ==========");
  console.log("👨‍⚕️ req.user:", req.user);

  try {
    const medicoId = req.user?.id;
    
    if (!medicoId) {
      return res.status(400).json({ error: "ID do médico não encontrado" });
    }

    console.log("🔍 Médico ID:", medicoId);

    // ============================================
    // 1. BUSCAR DADOS DO MÉDICO
    // ============================================
    const queryMedico = `
      SELECT 
        m.id,
        m.nome,
        m.email,
        m.telefone,
        m.especialidade,
        m.crm
      FROM medico m
      WHERE m.id = ?
    `;

    // ============================================
    // 2. ESTATÍSTICAS GERAIS
    // ============================================
    const queryEstatisticas = `
      SELECT 
        (SELECT COUNT(*) FROM consulta WHERE medico_id = ? AND DATE(dataConsulta) = CURDATE()) as consultasHoje,
        (SELECT COUNT(*) FROM cliente WHERE id IN (SELECT DISTINCT cliente_id FROM consulta WHERE medico_id = ?)) as pacientesAtivos,
        (SELECT COUNT(*) FROM exame WHERE medico_id = ? AND statusEx = 'Marcado') as examesPendentes,
        (SELECT COUNT(*) FROM consulta WHERE medico_id = ? AND DATE(dataConsulta) = CURDATE() AND statusEx = 'Concluido') as receitasHoje
    `;

    // ============================================
    // 3. CONSULTAS DE HOJE
    // ============================================
    const queryConsultasHoje = `
      SELECT 
        c.id,
        c.tipo,
        c.dataConsulta,
        c.statusEx as status,
        c.descricaoConsul,
        cl.nome as pacienteNome,
        cl.id as pacienteId,
        '08:00' as horario
      FROM consulta c
      INNER JOIN cliente cl ON c.cliente_id = cl.id
      WHERE c.medico_id = ? 
        AND DATE(c.dataConsulta) = CURDATE()
      ORDER BY c.dataConsulta ASC
      LIMIT 10
    `;

    // ============================================
    // 4. CONSULTAS DA SEMANA
    // ============================================
    const queryConsultasSemana = `
      SELECT 
        c.id,
        c.tipo,
        DATE_FORMAT(c.dataConsulta, '%d/%m/%Y') as data,
        c.statusEx as status,
        cl.nome as pacienteNome,
        '10:00' as horario
      FROM consulta c
      INNER JOIN cliente cl ON c.cliente_id = cl.id
      WHERE c.medico_id = ? 
        AND YEARWEEK(c.dataConsulta, 1) = YEARWEEK(CURDATE(), 1)
      ORDER BY c.dataConsulta ASC
      LIMIT 20
    `;

    // ============================================
    // 5. EXAMES PENDENTES
    // ============================================
    const queryExamesPendentes = `
      SELECT 
        e.id,
        e.tipo,
        DATE_FORMAT(e.dataRequerimento, '%d/%m/%Y') as dataRequerimento,
        e.statusEx as status,
        cl.nome as pacienteNome,
        cl.id as pacienteId
      FROM exame e
      INNER JOIN cliente cl ON e.cliente_id = cl.id
      WHERE e.medico_id = ? 
        AND e.statusEx = 'Marcado'
      ORDER BY e.dataRequerimento DESC
      LIMIT 10
    `;

    // ============================================
    // EXECUTAR QUERIES
    // ============================================
    
    db.query(queryMedico, [medicoId], (err, dadosMedico) => {
      if (err) {
        console.error("❌ Erro ao buscar médico:", err);
        return res.status(500).json({ error: "Erro ao buscar dados do médico" });
      }

      if (dadosMedico.length === 0) {
        return res.status(404).json({ error: "Médico não encontrado" });
      }

      const medico = dadosMedico[0];
      console.log("✅ Médico encontrado:", medico.nome);

      // Buscar estatísticas
      db.query(queryEstatisticas, [medicoId, medicoId, medicoId, medicoId], (err, estatisticas) => {
        if (err) {
          console.error("❌ Erro ao buscar estatísticas:", err);
          return res.status(500).json({ error: "Erro ao buscar estatísticas" });
        }

        const stats = estatisticas[0];
        console.log("📊 Estatísticas:", stats);

        // Buscar consultas de hoje
        db.query(queryConsultasHoje, [medicoId], (err, consultasHoje) => {
          if (err) {
            console.error("❌ Erro ao buscar consultas de hoje:", err);
            return res.status(500).json({ error: "Erro ao buscar consultas" });
          }

          console.log("📅 Consultas hoje:", consultasHoje.length);

          // Buscar consultas da semana
          db.query(queryConsultasSemana, [medicoId], (err, consultasSemana) => {
            if (err) {
              console.error("❌ Erro ao buscar consultas da semana:", err);
              return res.status(500).json({ error: "Erro ao buscar consultas da semana" });
            }

            console.log("📅 Consultas semana:", consultasSemana.length);

            // Buscar exames pendentes
            db.query(queryExamesPendentes, [medicoId], (err, examesPendentes) => {
              if (err) {
                console.error("❌ Erro ao buscar exames:", err);
                return res.status(500).json({ error: "Erro ao buscar exames" });
              }

              console.log("🔬 Exames pendentes:", examesPendentes.length);

              // Montar resposta final
              const resposta = {
                success: true,
                medico: {
                  id: medico.id,
                  nome: medico.nome,
                  email: medico.email,
                  telefone: medico.telefone,
                  especialidade: medico.especialidade,
                  crm: medico.crm
                },
                estatisticas: {
                  consultasHoje: stats.consultasHoje || 0,
                  pacientesAtivos: stats.pacientesAtivos || 0,
                  examesPendentes: stats.examesPendentes || 0,
                  receitasHoje: stats.receitasHoje || 0
                },
                consultasHoje: consultasHoje.map(c => ({
                  id: c.id,
                  paciente: c.pacienteNome,
                  pacienteId: c.pacienteId,
                  tipo: c.tipo,
                  horario: c.horario,
                  status: c.status,
                  descricao: c.descricaoConsul
                })),
                consultasSemana: consultasSemana.map(c => ({
                  id: c.id,
                  data: c.data,
                  paciente: c.pacienteNome,
                  tipo: c.tipo,
                  horario: c.horario,
                  status: c.status
                })),
                examesPendentes: examesPendentes.map(e => ({
                  id: e.id,
                  paciente: e.pacienteNome,
                  pacienteId: e.pacienteId,
                  tipo: e.tipo,
                  dataRequerimento: e.dataRequerimento,
                  status: e.status
                }))
              };

              console.log("✅ Enviando resposta completa");
              res.json(resposta);
            });
          });
        });
      });
    });

  } catch (error) {
    console.error("💥 Erro no dashboardMedico:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const autenticarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, "medicenter_secret_key_2024");
    req.user = decoded; // Adiciona dados do usuário na requisição
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
};