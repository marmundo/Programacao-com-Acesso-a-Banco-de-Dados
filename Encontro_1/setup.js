// Script de Setup - Inicializa o banco de dados
// Execute: node setup.js

require('dotenv').config();
const pool = require('./db/connection');

async function setup() {
  console.log('========================================');
  console.log('Iniciando setup do banco de dados...');
  console.log('========================================\n');

  try {
    // Criar tabela
    console.log('1. Criando tabela "alunos"...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS alunos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✓ Tabela criada com sucesso!\n');

    // Verificar se já existem dados
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM alunos');
    const totalAlunos = rows[0].total;

    if (totalAlunos === 0) {
      console.log('2. Inserindo dados de exemplo...');
      await pool.query(`
        INSERT INTO alunos (nome, email) VALUES
          ('João Silva', 'joao.silva@email.com'),
          ('Maria Santos', 'maria.santos@email.com'),
          ('Pedro Oliveira', 'pedro.oliveira@email.com'),
          ('Ana Costa', 'ana.costa@email.com')
      `);
      console.log('   ✓ 4 alunos inseridos com sucesso!\n');
    } else {
      console.log(`2. Tabela já contém ${totalAlunos} registro(s). Pulando inserção.\n`);
    }

    // Listar alunos
    console.log('3. Verificando dados...');
    const [alunos] = await pool.query('SELECT id, nome, email FROM alunos');
    console.log(`   ✓ Total de alunos: ${alunos.length}`);
    alunos.forEach(aluno => {
      console.log(`     - ${aluno.id}: ${aluno.nome} (${aluno.email})`);
    });

    console.log('\n========================================');
    console.log('Setup concluído com sucesso!');
    console.log('========================================');
    console.log('\nAgora você pode iniciar o servidor:');
    console.log('  npm start');
    console.log('\nE testar a API:');
    console.log('  http://localhost:3000/alunos\n');

  } catch (error) {
    console.error('\n❌ Erro durante o setup:');
    console.error(error.message);
    process.exit(1);
  } finally {
    // Fechar o pool de conexões
    await pool.end();
  }
}

// Executar setup
setup();
