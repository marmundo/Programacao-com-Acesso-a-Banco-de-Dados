# Encontro 01 - Demonstração Prática

**Disciplina:** Programação com Acesso a Banco de Dados
**Professor:** Marcelo Damasceno de Melo
**Tema:** Introdução ao Ecossistema Node.js - Conexão com MySQL e SELECT

## Sobre o Projeto

Este é o projeto de demonstração do Encontro 01, que mostra como:

- Conectar uma aplicação Node.js a um banco de dados MySQL
- Executar consultas SQL usando o driver `mysql2`
- Organizar código com arquitetura em camadas (routes → repository → database)
- Usar variáveis de ambiente com `dotenv` para segurança
- Criar uma API REST simples com Express

## Estrutura do Projeto

```
Encontro_1/
├── db/
│   └── connection.js          # Pool de conexões MySQL
├── repository/
│   └── alunoRepository.js     # Funções de acesso ao BD
├── routes/
│   └── alunoRoutes.js         # Definição das rotas HTTP
├── .env                       # Credenciais do banco (NÃO commitar!)
├── .env.example               # Modelo de configuração
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Dependências e scripts
├── server.js                  # Servidor Express principal
└── README.md                  # Este arquivo
```

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **mysql2** - Driver MySQL com suporte a Promises
- **dotenv** - Gerenciamento de variáveis de ambiente

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

1. **Node.js LTS** (v18 ou superior)
   - Verificar versão: `node --version`
   - Download: https://nodejs.org

2. **Banco de Dados** (escolha uma opção):
   - **Opção A - Clever Cloud** (recomendado): Banco na nuvem **100% gratuito**
   - **Opção B - MySQL Local** (v8.0 ou superior): Servidor rodando na porta 3306

## Configuração do Banco de Dados

### Opção 1: Clever Cloud (Recomendado - 100% Gratuito)

Se você quer usar um banco de dados online **totalmente gratuito** sem instalar MySQL, siga o guia completo:

**[📘 Guia de Configuração do Clever Cloud](./CLEVERCLOUD.md)**

O Clever Cloud oferece:
- **100% gratuito** (tier gratuito permanente)
- MySQL tradicional (256MB)
- Sem necessidade de cartão de crédito
- Sem necessidade de instalar MySQL localmente
- Acessível de qualquer lugar
- Perfeito para projetos educacionais

### Opção 2: MySQL Local

Execute os seguintes comandos SQL no MySQL instalado localmente:

```sql
-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS escola;

-- Usar o banco
USE escola;

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
  ('Ana Costa', 'ana.costa@email.com');
```

## Instalação

### 1. Clone ou navegue até o projeto

```bash
cd Encontro_1
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

**Para Clever Cloud (recomendado):**
```env
DB_HOST=seu_host.mysql.services.clever-cloud.com
DB_PORT=3306
DB_USER=seu_usuario_clevercloud
DB_PASS=sua_senha_clevercloud
DB_NAME=seu_database_clevercloud
DB_SSL=false
PORT=3000
```

**Para MySQL Local:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=escola
DB_SSL=false
PORT=3000
```

**IMPORTANTE:**
- Nunca commite o arquivo `.env` no Git! Ele contém informações sensíveis.
- Para Clever Cloud, veja o [guia completo](./CLEVERCLOUD.md) de como obter as credenciais.

## Executando o Projeto

### Modo Normal

```bash
npm start
```

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

O servidor iniciará em: `http://localhost:3000`

## Testando a API

### Rota Principal

```bash
curl http://localhost:3000/
```

Resposta esperada:
```json
{
  "message": "API Demonstração - Encontro 01",
  "disciplina": "Programação com Acesso a Banco de Dados",
  "endpoints": {
    "alunos": "GET /alunos - Lista todos os alunos"
  }
}
```

### Listar Alunos

```bash
curl http://localhost:3000/alunos
```

Resposta esperada:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao.silva@email.com"
    },
    {
      "id": 2,
      "nome": "Maria Santos",
      "email": "maria.santos@email.com"
    }
  ]
}
```

Você também pode testar pelo navegador acessando: `http://localhost:3000/alunos`

## Conceitos Demonstrados

### 1. Pool de Conexões (db/connection.js)

- Cria um pool reutilizável de conexões ao banco
- Mais eficiente que abrir/fechar conexão a cada query
- Configurado com `mysql2/promise` para usar async/await

### 2. Padrão Repository (repository/alunoRepository.js)

- Separa a lógica de acesso ao banco
- Facilita manutenção e testes
- Encapsula queries SQL

### 3. Rotas Express (routes/alunoRoutes.js)

- Define endpoints HTTP
- Usa async/await para operações assíncronas
- Implementa tratamento de erros com try/catch

### 4. Segurança com dotenv

- Credenciais do banco fora do código-fonte
- Variáveis carregadas em tempo de execução
- Arquivo `.env` no `.gitignore`

### 5. I/O Não Bloqueante

- Node.js continua processando outras requisições enquanto aguarda o banco
- Event Loop gerencia callbacks/Promises
- Alta eficiência para operações I/O

## Fluxo de uma Requisição

```
1. Cliente       →  GET /alunos
2. Express       →  routes/alunoRoutes.js
3. Route Handler →  repository/alunoRepository.js
4. Repository    →  db/connection.js
5. Pool          →  MySQL Server
6. MySQL         →  Executa SELECT e retorna dados
7. Repository    →  Retorna array de objetos
8. Route Handler →  Formata resposta JSON
9. Express       →  Envia resposta ao cliente
```

## Possíveis Erros e Soluções

### Erro de conexão com o banco

```
Error: ER_ACCESS_DENIED_ERROR
```

**Solução:** Verifique usuário e senha no arquivo `.env`

### Banco de dados não existe

```
Error: ER_BAD_DB_ERROR
```

**Solução:** Execute os comandos SQL de criação do banco

### Porta já em uso

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução:** Altere a porta no arquivo `.env` ou finalize o processo que está usando a porta 3000

## Próximos Passos

No próximo encontro veremos:

- Operações de INSERT, UPDATE e DELETE
- Prepared Statements para prevenção de SQL Injection
- Tratamento de validações
- Middleware de erros

## Licença

MIT - Projeto educacional para fins de aprendizado.
