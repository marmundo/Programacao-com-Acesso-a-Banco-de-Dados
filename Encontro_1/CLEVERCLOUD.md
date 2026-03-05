# Guia de Configuração - Clever Cloud (MySQL Gratuito)

Este guia mostra como configurar o projeto para usar o **Clever Cloud**, que oferece MySQL compartilhado **100% gratuito**.

## Por que Clever Cloud?

- **Totalmente gratuito** (tier gratuito permanente)
- MySQL tradicional (100% compatível)
- Banco compartilhado (shared) - ideal para projetos educacionais
- Sem necessidade de cartão de crédito
- Interface simples e direta

## Limites do Tier Gratuito

- **Storage**: 256MB
- **Conexões simultâneas**: Compartilhadas
- **Backup**: Não incluído
- **Suficiente para**: Projetos educacionais, testes, protótipos

## Passo 1: Criar Conta no Clever Cloud

1. Acesse https://www.clever-cloud.com
2. Clique em **"Sign up for free"**
3. Escolha uma opção de login:
   - GitHub (recomendado)
   - GitLab
   - Email
4. Confirme seu email (se usar email)
5. Faça login no dashboard

## Passo 2: Criar uma Organização

1. Após login, você verá a tela inicial
2. Clique em **"Create an organization"** (se solicitado)
3. Dê um nome (ex: `meus-projetos` ou `ifrn`)
4. Clique em **"Create"**

**Nota:** Se já tiver uma organização, pule este passo.

## Passo 3: Criar o Banco de Dados MySQL

### 3.1 Adicionar Add-on

1. No dashboard, clique em **"Create..."** (botão no canto superior direito)
2. Selecione **"an add-on"**

### 3.2 Escolher MySQL

1. Na lista de add-ons, procure por **"MySQL"**
2. Clique no card **"MySQL"**

### 3.3 Selecionar Plano Gratuito

1. Você verá os planos disponíveis
2. Selecione **"DEV"** (este é o plano gratuito)
   - Características:
     - Shared (compartilhado)
     - Max DB Size: 256 MB
     - Shared CPU/RAM
     - **Price: FREE**
3. Clique em **"Next"**

### 3.4 Configurar Região

1. **Region**: Escolha a mais próxima
   - Para Brasil: `rbx` (Roubaix, França) ou `gra` (Gravelines, França)
   - Ambas funcionam bem
2. Clique em **"Next"**

### 3.5 Nomear o Banco

1. **Add-on name**: Dê um nome descritivo
   - Exemplo: `mysql-escola` ou `db-pabd`
2. **Link to**: Se já tiver uma aplicação, pode linkar (opcional)
   - Para este projeto, pode deixar vazio
3. Clique em **"Create"**

### 3.6 Aguardar Criação

Aguarde alguns segundos. Você verá:
- Status: **"Running"** (quando estiver pronto)
- Um ícone verde indicando que está ativo

## Passo 4: Obter Credenciais de Conexão

### 4.1 Acessar Informações do Add-on

1. Clique no add-on MySQL que você acabou de criar
2. Vá para a aba **"Add-on Dashboard"** ou **"Information"**

### 4.2 Copiar Credenciais

Você verá as seguintes informações (clique em "Show credentials" se necessário):

```
Host: xxx.mysql.services.clever-cloud.com
Port: 3306
Database: xxx
User: xxx
Password: xxx
```

**Copie e guarde essas informações!** Você vai precisar delas no próximo passo.

**Exemplo:**
```
Host: bxxxxxxxxxx-mysql.services.clever-cloud.com
Port: 3306
Database: bxxxxxxxxxx
User: uxxxxxxxxxx
Password: xxxxxxxxxxxxxxxxxx
```

## Passo 5: Acessar o Banco via phpMyAdmin

O Clever Cloud oferece phpMyAdmin integrado para gerenciar o banco.

### 5.1 Abrir phpMyAdmin

1. Ainda na página do add-on MySQL
2. Procure por **"phpMyAdmin"** ou **"Admin Console"**
3. Clique no link (geralmente algo como: `https://mysql-console.clever-cloud.com`)
4. Faça login com as credenciais:
   - **Server**: (já preenchido automaticamente)
   - **Username**: Use o `User` copiado acima
   - **Password**: Use o `Password` copiado acima
   - **Database**: Deixe em branco ou use o nome do database

### 5.2 Criar a Tabela

1. Após login no phpMyAdmin, clique no seu database na barra lateral esquerda
2. Clique na aba **"SQL"** (no topo)
3. Cole o seguinte script SQL:

```sql
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

4. Clique em **"Go"** ou **"Executar"**
5. Você verá: `Query OK, X rows affected`

### 5.3 Verificar os Dados

1. Clique na tabela `alunos` na barra lateral
2. Clique na aba **"Browse"** ou **"Visualizar"**
3. Você deve ver os 4 alunos inseridos

## Passo 6: Configurar o Projeto Node.js

### 6.1 Verificar se .env existe

Se ainda não criou, crie o arquivo `.env` na raiz do projeto:

```bash
cd "/Users/marcelo/Google Drive/ifrn/Disciplinas/Integrado/Programação com Acesso a Banco de Dados/Encontro_1"
touch .env
```

### 6.2 Editar .env

Abra o arquivo `.env` e configure com as credenciais do Clever Cloud:

```env
# Configuração Clever Cloud MySQL
DB_HOST=seu_host_aqui.mysql.services.clever-cloud.com
DB_PORT=3306
DB_USER=seu_usuario_aqui
DB_PASS=sua_senha_aqui
DB_NAME=seu_database_aqui
DB_SSL=false

# Porta da aplicação
PORT=3000
```

**Substitua com as credenciais que você copiou:**
- `DB_HOST` → Host copiado (ex: `bxxxxxxxxxx-mysql.services.clever-cloud.com`)
- `DB_USER` → User copiado (ex: `uxxxxxxxxxx`)
- `DB_PASS` → Password copiado
- `DB_NAME` → Database copiado (ex: `bxxxxxxxxxx`)

**IMPORTANTE:**
- Clever Cloud **não requer SSL** para MySQL (diferente do PlanetScale)
- Certifique-se de que `DB_SSL=false`
- Nunca commite o arquivo `.env` no Git!

### Exemplo Completo:

```env
# Configuração Clever Cloud MySQL
DB_HOST=bq1abc123xyz-mysql.services.clever-cloud.com
DB_PORT=3306
DB_USER=uq2def456uvw
DB_PASS=Hk8xyz123AbC456DeF
DB_NAME=bq1abc123xyz
DB_SSL=false

# Porta da aplicação
PORT=3000
```

## Passo 7: Testar a Conexão

### 7.1 Instalar Dependências

```bash
cd "/Users/marcelo/Google Drive/ifrn/Disciplinas/Integrado/Programação com Acesso a Banco de Dados/Encontro_1"
npm install
```

### 7.2 Iniciar o Servidor

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

### 7.3 Testar a API

**Opção 1 - Via curl:**
```bash
curl http://localhost:3000/alunos
```

**Opção 2 - Via navegador:**
Abra: `http://localhost:3000/alunos`

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
    },
    {
      "id": 3,
      "nome": "Pedro Oliveira",
      "email": "pedro.oliveira@email.com",
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 4,
      "nome": "Ana Costa",
      "email": "ana.costa@email.com",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Solução de Problemas

### Erro: "Access denied for user"

**Causa:** Credenciais incorretas ou mal formatadas

**Soluções:**
1. Verifique se copiou corretamente todas as credenciais
2. Certifique-se de que não há espaços extras no `.env`
3. Confirme que está usando o database, user e password corretos
4. Tente copiar novamente do dashboard do Clever Cloud

### Erro: "Unknown database"

**Causa:** Nome do database incorreto

**Solução:**
1. Verifique o nome exato do database no dashboard do Clever Cloud
2. O nome do database geralmente é igual ao do usuário (ex: `bxxxxxxxxxx`)

### Erro: "Too many connections"

**Causa:** Limite de conexões do plano gratuito atingido

**Soluções:**
1. Feche conexões antigas no seu código
2. Aguarde alguns minutos e tente novamente
3. Reduza o `connectionLimit` em `db/connection.js` para 3 ou 5

### Erro: "connect ETIMEDOUT"

**Causa:** Problemas de rede ou firewall

**Soluções:**
1. Verifique sua conexão com a internet
2. Tente desabilitar VPN (se estiver usando)
3. Verifique se algum firewall está bloqueando a porta 3306

### Banco muito lento

**Causa:** Plano gratuito compartilha recursos

**Soluções:**
- Isso é normal no tier gratuito
- Para produção, considere upgrade
- Para projetos educacionais, é aceitável

## Gerenciamento do Banco

### Via phpMyAdmin (Recomendado)

1. Acesse o link do phpMyAdmin no dashboard do Clever Cloud
2. Faça login com suas credenciais
3. Use a interface gráfica para:
   - Criar/editar tabelas
   - Executar queries SQL
   - Importar/exportar dados
   - Ver estrutura do banco

### Via Cliente MySQL (Opcional)

Se preferir usar cliente MySQL local (TablePlus, Sequel Pro, etc.):

```
Host: seu_host.mysql.services.clever-cloud.com
Port: 3306
User: seu_usuario
Password: sua_senha
Database: seu_database
```

## Boas Práticas

### Segurança

- ✅ Use variáveis de ambiente (`.env`)
- ✅ Adicione `.env` no `.gitignore`
- ✅ Nunca commite credenciais
- ⚠️ Não compartilhe suas credenciais
- ⚠️ Altere a senha se compartilhou acidentalmente

### Performance

- Mantenha queries simples (plano compartilhado)
- Use índices em colunas de busca frequente
- Evite queries muito complexas ou JOINs pesados
- Limite o número de conexões simultâneas

### Monitoramento

- Acesse o dashboard para ver métricas de uso
- Fique de olho no storage (limite: 256MB)
- Limpe dados de teste quando não precisar mais

## Limitações do Tier Gratuito

### O que funciona:
- ✅ Todas as operações SQL básicas (SELECT, INSERT, UPDATE, DELETE)
- ✅ Múltiplas tabelas
- ✅ Índices e constraints
- ✅ Acesso via Node.js
- ✅ Perfeito para aprendizado

### Limitações:
- ⚠️ 256MB de storage (suficiente para projetos pequenos)
- ⚠️ Performance compartilhada (pode ser lento em horários de pico)
- ⚠️ Sem backup automático
- ⚠️ Conexões simultâneas limitadas

## Alternativas se Precisar de Mais Recursos

Se o projeto crescer e precisar de mais:

1. **Upgrade no Clever Cloud** (planos pagos a partir de €2.50/mês)
2. **Railway** ($5 crédito/mês)
3. **MySQL Local** (ilimitado, mas precisa do servidor rodando)

## Recursos Adicionais

### Documentação Oficial
- https://www.clever-cloud.com/doc/addons/mysql/

### Suporte
- https://www.clever-cloud.com/support/

### FAQ
- https://www.clever-cloud.com/faq/

## Resumo dos Passos

1. ✅ Criar conta no Clever Cloud
2. ✅ Criar add-on MySQL (plano DEV gratuito)
3. ✅ Copiar credenciais (host, user, password, database)
4. ✅ Acessar phpMyAdmin
5. ✅ Executar script SQL (criar tabela + inserir dados)
6. ✅ Configurar `.env` no projeto
7. ✅ Testar conexão (`npm start` + acessar `/alunos`)

## Próximos Passos

Agora que o banco está configurado, você pode:

1. Adicionar novos endpoints (INSERT, UPDATE, DELETE)
2. Implementar validações
3. Criar novas tabelas
4. Praticar consultas SQL
5. Desenvolver sua aplicação completa

---

**Configuração concluída! 🎉**

O Clever Cloud é perfeito para projetos educacionais - totalmente gratuito, sem cartão de crédito, e MySQL 100% compatível.
