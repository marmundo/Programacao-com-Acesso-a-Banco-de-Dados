// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o driver MySQL2 com suporte a Promises
const mysql = require('mysql2/promise');

// Cria um pool de conexões
// Pool = conjunto reutilizável de conexões ao banco
// Mais eficiente que abrir/fechar conexão a cada query
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  // PlanetScale requer SSL
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: true
  } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exporta o pool para ser usado em outros módulos
module.exports = pool;
