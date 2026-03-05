// Carrega as variáveis de ambiente
require('dotenv').config();

// Importa o Express
const express = require('express');

// Importa as rotas
const alunoRoutes = require('./routes/alunoRoutes');

// Cria a aplicação Express
const app = express();

// Define a porta (usa variável de ambiente ou 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rota raiz (bem-vindo)
app.get('/', (req, res) => {
  res.json({
    message: 'API Demonstração - Encontro 01',
    disciplina: 'Programação com Acesso a Banco de Dados',
    endpoints: {
      alunos: 'GET /alunos - Lista todos os alunos'
    }
  });
});

// Registra as rotas de alunos
app.use(alunoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/alunos`);
  console.log(`========================================`);
});
