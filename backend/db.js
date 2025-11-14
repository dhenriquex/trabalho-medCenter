import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Davi100445#",
  database: "medicenter"
});

// Teste de conexão
db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});
