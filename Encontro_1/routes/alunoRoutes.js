// Importa o Express
const express = require('express');

// Cria um router (conjunto de rotas)
const router = express.Router();

// Importa as funções do repository
const { listarAlunos } = require('../repository/alunoRepository');

/**
 * GET /alunos
 * Retorna a lista de todos os alunos
 */
router.get('/alunos', async (req, res) => {
  try {
    // Chama o repository para buscar os dados
    const alunos = await listarAlunos();

    // Retorna resposta de sucesso com os dados
    res.json({
      success: true,
      data: alunos
    });
  } catch (err) {
    // Em caso de erro, retorna status 500 e mensagem
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Exporta o router para ser usado no servidor principal
module.exports = router;
