// Importa o pool de conexões
const pool = require('../db/connection');

/**
 * Lista todos os alunos do banco de dados
 * @returns {Promise<Array>} Array com os alunos
 */
async function listarAlunos() {
  // pool.query() retorna [rows, fields]
  // rows = linhas do resultado
  // fields = metadados das colunas
  // Usamos destructuring para pegar apenas rows
  const [rows] = await pool.query('SELECT id, nome, email FROM alunos');
  return rows;
}

// Exporta as funções do repository
module.exports = {
  listarAlunos
};
