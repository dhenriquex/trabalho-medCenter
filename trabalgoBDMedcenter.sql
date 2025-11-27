--  drop database medicenter;
-- Resetar o banco (opcional: remova se quiser preservar dados)
DROP DATABASE IF EXISTS medicenter;
CREATE DATABASE IF NOT EXISTS medicenter;
USE medicenter;

-- Tabela Endereço (sem mudanças, mas adicionei INDEX em cep para buscas)
CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(200) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    complemento VARCHAR(200),  -- Opcional
    numero INT NOT NULL,
    cep VARCHAR(9) NOT NULL,   -- Ex.: "12345-678"
    INDEX idx_cep (cep)        -- Index para buscas rápidas por CEP
);

-- Tabela Pagamento (sem mudanças, mas adicionei INDEX em dataPagamento)
CREATE TABLE pagamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valor DECIMAL(11,2) NOT NULL,
    formaPag ENUM('Pix','Credito','Dinheiro') NOT NULL,
    dataPagamento DATE,
    INDEX idx_data_pag (dataPagamento)  -- Index para relatórios por data
);

-- Tabela Médico (correções principais aqui)
CREATE TABLE medico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    crm INT NOT NULL UNIQUE,              -- UNIQUE: CRMs são únicos
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,   -- UNIQUE: Evita emails duplicados
    telefone VARCHAR(14) NOT NULL,        -- Ex.: "(11) 99999-9999"
    especialidade VARCHAR(200) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,      -- Aumentado para 20: permite "123.456.789-00" ou limpo
    dataDeNasc DATE NOT NULL,
    dataContratacao DATE NOT NULL,
    endereco_id INT NOT NULL,             -- NOT NULL: Endereço obrigatório
    senha VARCHAR(100) NOT NULL,          -- NOT NULL: Senha obrigatória
    CONSTRAINT fk_medico_endereco FOREIGN KEY (endereco_id) REFERENCES endereco(id) ON DELETE CASCADE  -- CASCADE: Deleta médico se endereço for deletado (opcional)
);
-- Tabela Administrador
CREATE TABLE administrador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    dataDeNasc DATE NOT NULL,
    dataContratacao DATE NOT NULL,
    endereco_id INT,
    CONSTRAINT fk_administrador_endereco FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

-- Tabela Cliente
CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE ,
    telefone VARCHAR(14) NOT NULL ,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    dataDeNasc DATE NOT NULL,
    endereco_id INT,
    senha VARCHAR(100) NOT NULL,
    sexo enum("Masculino","Feminino", "Outro"),
    CONSTRAINT fk_cliente_endereco FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

-- Tabela Consulta
CREATE TABLE consulta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(100) NOT NULL,
    dataConsulta DATE NOT NULL,
    valor DECIMAL(11,2) NOT NULL,
    descricaoConsul LONGTEXT,
    laboratorio VARCHAR(50),
    statusEx ENUM('Concluido', 'Expirado', 'Marcado') NOT NULL,
    medico_id INT,
    cliente_id INT,
    pagamento_id INT,
    CONSTRAINT fk_consulta_medico FOREIGN KEY (medico_id) REFERENCES medico(id),
    CONSTRAINT fk_consulta_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    CONSTRAINT fk_consulta_pagamento FOREIGN KEY (pagamento_id) REFERENCES pagamento(id)
);

-- Tabela Exame
CREATE TABLE exame (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(100) NOT NULL,
    dataEmissao DATE NOT NULL,
    dataRequerimento DATE,
    valor DECIMAL(11,2),
    resultado BIT,
    statusEx ENUM('Concluido', 'Expirado', 'Marcado') NOT NULL,
    cliente_id INT,
    medico_id INT,
    pagamento_id INT,
    CONSTRAINT fk_exame_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    CONSTRAINT fk_exame_medico FOREIGN KEY (medico_id) REFERENCES medico(id),
    CONSTRAINT fk_exame_pagamento FOREIGN KEY (pagamento_id) REFERENCES pagamento(id)
);


