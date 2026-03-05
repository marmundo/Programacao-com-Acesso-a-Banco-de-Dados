-- ========================================
-- Script de Criação do Banco de Dados
-- Encontro 01 - Demonstração Prática
-- ========================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS escola
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Selecionar o banco
USE escola;

-- Criar tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir dados de exemplo
INSERT INTO alunos (nome, email) VALUES
  ('João Silva', 'joao.silva@email.com'),
  ('Maria Santos', 'maria.santos@email.com'),
  ('Pedro Oliveira', 'pedro.oliveira@email.com'),
  ('Ana Costa', 'ana.costa@email.com'),
  ('Carlos Souza', 'carlos.souza@email.com'),
  ('Beatriz Lima', 'beatriz.lima@email.com');

-- Verificar se os dados foram inseridos
SELECT * FROM alunos;

-- Exibir estrutura da tabela
DESCRIBE alunos;
