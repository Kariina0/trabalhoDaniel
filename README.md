
# API com Banco de Dados (RPV)

Projeto de exemplo que demonstra integração entre MongoDB e MySQL usando Knex e drivers nativos.

Autores:

- Karina Alves Pinheiro
- Matheus Meigre e Silva
- Phablo Ribeiro Oliveira

Conteúdo

Este repositório contém uma API Node.js que utiliza:

- MongoDB para armazenamento documental (com código em `feature/mongodb` e `src`)
- MySQL (via Knex) para persistência relacional e sincronização

Estrutura principal do projeto:

- `src/` - implementação principal da API
- `feature/mongodb/` - variação/feature com configuração específica para MongoDB
- `knexfile.js` / `feature/mongodb/knexfile.js` - configuração do Knex

Instalação

1. Clone o repositório

2. Instale dependências na raiz (se o projeto usar pacotes na raiz):

```powershell
cd "d:\Técnico em Desenvolvimento de Sistemas\trabalhoBanco\api-com-banco-de-dados-rpv"
npm install
```

3. Se desejar executar a versão dentro de `feature/mongodb`:

```powershell
cd feature/mongodb
npm install
```

Configuração

- Configure o MongoDB e MySQL (variáveis de ambiente ou arquivos de configuração conforme implementação). Verifique os arquivos `src/database/index.js` e `feature/mongodb/src/database/index.js` para detalhes de conexão.
- Configure `knexfile.js` com as credenciais do MySQL e caminhos de migrations/seeds.

Execução

Na raiz do projeto:

```powershell
npm start
```

Ou, para a feature MongoDB:

```powershell
cd feature/mongodb
npm start
```

Testes e migrações

- Para rodar migrations do Knex (ex.: MySQL):

```powershell
npx knex migrate:latest --knexfile knexfile.js
```

- Para aplicar seeds:

```powershell
npx knex seed:run --knexfile knexfile.js
```

Notas

- Revise os arquivos em `src/services` e `feature/mongodb/src/services` para detalhes de sincronização entre MongoDB e MySQL.
- Os arquivos de migrations e seeds já estão presentes em `src/database/migrations` e `feature/mongodb/src/database/migrations`.