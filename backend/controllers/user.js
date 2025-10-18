import { db } from "../db.js";

export const buscarCliente = (req, res) => {
  const { search } = req.query;

  let q = "SELECT * FROM cliente WHERE cpf LIKE ? OR email LIKE ?";
  const params = [`%${search}%`, `%${search}%`];

  db.query(q, params, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
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
      senha, // ⚠️ Em produção: usar bcrypt
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

export const updateUser = (req, res) => {
  // Implemente depois se precisar (ex: UPDATE com JOIN se alterar endereço)
};

export const deleteUser = (req, res) => {
  // Implemente depois (ex: DELETE FROM medico WHERE id = ?; CASCADE deleta endereço auto)
};
