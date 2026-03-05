-- Script de Inicialização do Banco de Dados
-- Execute este script no phpMyAdmin ou via script de setup

-- Criar tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO alunos (nome, email) VALUES
  ('João Silva', 'joao.silva@email.com'),
  ('Maria Santos', 'maria.santos@email.com'),
  ('Pedro Oliveira', 'pedro.oliveira@email.com'),
  ('Ana Costa', 'ana.costa@email.com')
ON DUPLICATE KEY UPDATE nome=nome;
