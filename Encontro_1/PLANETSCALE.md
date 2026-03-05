# Guia de Configuração - PlanetScale

Este guia mostra como configurar o projeto para usar o **PlanetScale**, um banco de dados MySQL serverless na nuvem.

## Por que PlanetScale?

- Tier gratuito generoso (ideal para projetos educacionais)
- MySQL compatível (baseado em Vitess)
- Interface web amigável
- Sem necessidade de servidor próprio
- Backup automático e alta disponibilidade

## Passo 1: Criar Conta no PlanetScale

1. Acesse https://planetscale.com
2. Clique em **"Sign up"**
3. Faça login com GitHub, Google ou email
4. Confirme seu email (se necessário)

## Passo 2: Criar um Banco de Dados

### 2.1 Criar Database

1. No dashboard, clique em **"Create a database"**
2. Preencha os dados:
   - **Name**: `escola` (ou o nome que preferir)
   - **Region**: Escolha a mais próxima (ex: `AWS - São Paulo`)
   - **Plan**: Selecione **Hobby (Free)**
3. Clique em **"Create database"**

### 2.2 Aguardar Inicialização

Aguarde alguns segundos enquanto o banco é criado. Você verá:
- Status: **"Ready"** (quando estiver pronto)
- Branch: **"main"** (branch padrão)

## Passo 3: Criar as Tabelas

### 3.1 Acessar o Console

1. No dashboard do seu database, clique em **"Console"** (menu lateral)
2. Isso abrirá um terminal SQL no navegador

### 3.2 Executar o Script SQL

Copie e cole os comandos abaixo no console:

```sql
-- Criar tabela de alunos
CREATE TABLE alunos (
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

3. Clique em **"Execute"** ou pressione `Ctrl+Enter`
4. Você verá a confirmação: `Query OK, X rows affected`

### 3.3 Verificar os Dados

Execute a query de verificação:

```sql
SELECT * FROM alunos;
```

Você deve ver os 4 alunos inseridos.

## Passo 4: Obter String de Conexão

### 4.1 Criar Password

1. No menu lateral, clique em **"Connect"**
2. Clique em **"Create password"**
3. Dê um nome (ex: `dev-local`)
4. Clique em **"Create password"**

**IMPORTANTE:** A senha será exibida apenas uma vez! Copie e guarde em local seguro.

### 4.2 Copiar Credenciais

Você verá algo assim:

```
Host: aws.connect.psdb.cloud
Username: xxxxxxxxx
Password: pscale_pw_xxxxxxxxx
Database: escola
```

**Anote essas informações!** Você vai precisar delas no próximo passo.

## Passo 5: Configurar o Projeto

### 5.1 Verificar se .env existe

Se ainda não existe, crie o arquivo `.env` na raiz do projeto:

```bash
cd /Users/marcelo/Google\ Drive/ifrn/Disciplinas/Integrado/Programação\ com\ Acesso\ a\ Banco\ de\ Dados/Encontro_1
touch .env
```

### 5.2 Editar .env

Abra o arquivo `.env` e configure com as credenciais do PlanetScale:

```env
# Configuração PlanetScale
DB_HOST=aws.connect.psdb.cloud
DB_PORT=3306
DB_USER=seu_username_aqui
DB_PASS=sua_password_aqui
DB_NAME=escola
DB_SSL=true

# Porta da aplicação
PORT=3000
```

**Substitua:**
- `seu_username_aqui` → Username copiado do PlanetScale
- `sua_password_aqui` → Password copiado do PlanetScale
- `escola` → Nome do seu database (se usou outro nome)

**IMPORTANTE:**
- `DB_SSL=true` é obrigatório para PlanetScale
- Nunca commite o arquivo `.env` no Git!

## Passo 6: Testar a Conexão

### 6.1 Instalar Dependências (se ainda não fez)

```bash
npm install
```

### 6.2 Iniciar o Servidor

```bash
npm start
```

Você deve ver:

```
========================================
Servidor rodando na porta 3000
Acesse: http://localhost:3000
Endpoint: http://localhost:3000/alunos
========================================
```

### 6.3 Testar a API

Abra outra janela do terminal e teste:

```bash
curl http://localhost:3000/alunos
```

Ou abra no navegador: `http://localhost:3000/alunos`

**Resposta esperada:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao.silva@email.com",
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "nome": "Maria Santos",
      "email": "maria.santos@email.com",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
    // ... mais alunos
  ]
}
```

## Solução de Problemas

### Erro: "Client does not support authentication protocol"

**Causa:** Configuração SSL ausente

**Solução:** Verifique se `DB_SSL=true` está no arquivo `.env`

### Erro: "Access denied for user"

**Causa:** Credenciais incorretas

**Solução:**
1. Verifique se copiou corretamente o username e password
2. Certifique-se de que não há espaços extras no `.env`
3. Recrie a password no PlanetScale se necessário

### Erro: "Unknown database 'escola'"

**Causa:** Nome do database incorreto

**Solução:**
1. Verifique o nome do database no PlanetScale
2. Atualize `DB_NAME` no `.env` com o nome correto

### Erro: "connect ETIMEDOUT"

**Causa:** Problemas de rede ou firewall

**Solução:**
1. Verifique sua conexão com a internet
2. Certifique-se de que não há firewall bloqueando a porta 3306
3. Tente mudar de rede (ex: usar dados móveis)

## Recursos Adicionais

### Documentação Oficial
- https://planetscale.com/docs

### Gerenciar Banco via CLI (Opcional)
O PlanetScale oferece uma CLI para gerenciar databases pelo terminal:
- https://planetscale.com/docs/concepts/planetscale-cli

### Monitoramento
- Acesse o dashboard do PlanetScale para ver métricas de uso
- Insights → Query statistics

### Limites do Tier Gratuito
- 1 database
- 10GB de armazenamento
- 1 bilhão de leituras/mês
- 10 milhões de escritas/mês
- **Suficiente para projetos educacionais!**

## Diferenças vs MySQL Local

### Vantagens
- Sem necessidade de instalar MySQL localmente
- Backup automático
- Escalabilidade automática
- Acessível de qualquer lugar

### Limitações
- Requer internet
- Algumas features avançadas do MySQL podem não estar disponíveis
- Branch-based workflow (diferente do MySQL tradicional)

## Próximos Passos

Agora que o banco está configurado, você pode:

1. Adicionar novos endpoints (INSERT, UPDATE, DELETE)
2. Implementar validações
3. Criar novas tabelas
4. Explorar o sistema de branches do PlanetScale

## Segurança

**IMPORTANTE:**
- ✅ Sempre use variáveis de ambiente (`.env`)
- ✅ Adicione `.env` no `.gitignore`
- ✅ Nunca commite credenciais no código
- ✅ Use SSL/TLS (já configurado com `DB_SSL=true`)
- ⚠️ Não compartilhe suas credenciais
- ⚠️ Rotacione passwords periodicamente no PlanetScale

## Suporte

Se encontrar problemas:
1. Consulte a [Documentação do PlanetScale](https://planetscale.com/docs)
2. Verifique a seção "Solução de Problemas" acima
3. Peça ajuda ao professor

---

**Configuração concluída! 🎉**
