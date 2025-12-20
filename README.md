# Garçon Delivery

API de entrega em desenvolvimento com NestJS. Sistema completo para gerenciamento de usuários, produtos, pedidos e autenticação.

## 📋 Descrição

Garçon Delivery é uma aplicação backend desenvolvida com **NestJS** e **TypeORM** que fornece uma API robusta para gerenciar:

- 👤 **Usuários** - Cadastro e gerenciamento de usuários
- 🔐 **Autenticação** - Sistema JWT com estratégias Local e JWT
- 🛍️ **Produtos** - Catálogo de produtos disponíveis
- 📦 **Pedidos** - Sistema completo de pedidos
- 🏬 **Gestão de dados** - Ambiente multi-base de dados (desenvolvimento, testes, produção)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Banco de dados (MySQL, PostgreSQL ou SQLite)

### Instalação

```bash
# Clonar repositório
git clone <seu-repositorio>
cd garcon-delivery

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.development

# Configurar variáveis de ambiente para testes
cp .env.test.example .env.test

# Criar banco de dados
npm run create-db
```

### Configuração de Ambiente

#### .env (Desenvolvimento/Produção)
```env
NODE_ENV=development
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=garcon_delivery
DATABASE_USER=root
DATABASE_PASSWORD=password
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=3h
```

#### .env.test (Testes)
```env
# Configurações do servidor
PORT=3000

# Configurações do ambiente
NODE_ENV=test

# Configurações do JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

### Execução

```bash
# Modo desenvolvimento (com hot-reload)
npm run start:dev

# Modo produção
npm run build
npm run start:prod

# Debug
npm run start:debug
```

## 🧪 Testes

```bash
# Testes unitários
npm test

# Testes com cobertura
npm run test:cov

# Testes em tempo real
npm run test:watch

# Testes E2E
npm run test:e2e
```

## 📦 Estrutura do Projeto

```
src/
├── auth/                 # Autenticação e estratégias
│   ├── bcrypt/          # Criptografia de senhas
│   ├── controllers/      # Controlador de auth
│   ├── entities/         # Entidades de usuário login
│   ├── guard/            # Guards JWT e Local
│   ├── services/         # Lógica de autenticação
│   └── strategy/         # Estratégias JWT e Local
├── user/                 # Módulo de usuários
│   ├── controller/
│   ├── dto/              # Data Transfer Objects
│   ├── entities/
│   └── service/
├── product/              # Módulo de produtos
│   ├── controller/
│   ├── dto/
│   ├── entities/
│   └── service/
├── order/                # Módulo de pedidos
│   ├── controller/
│   ├── dto/
│   ├── entities/
│   └── service/
├── data/                 # Serviços de ambiente
│   └── service/          # Dev, Test, Prod
├── app.controller.ts
├── app.module.ts
└── main.ts              # Ponto de entrada
```

## 🔧 Tecnologias

- **Framework**: NestJS
- **ORM**: TypeORM
- **Autenticação**: Passport.js (JWT + Local)
- **Criptografia**: bcrypt
- **Bancos de dados**: MySQL, PostgreSQL, SQLite
- **Validação**: class-validator
- **API Docs**: Swagger
- **Testes**: Jest
- **Linter**: ESLint + Prettier

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento com hot-reload |
| `npm run start:prod` | Inicia em produção |
| `npm run build` | Faz build da aplicação |
| `npm run create-db` | Cria banco de dados |
| `npm test` | Executa testes unitários |
| `npm run test:e2e` | Executa testes E2E |
| `npm run lint` | Executa linter |
| `npm run format` | Formata código com Prettier |

## 🔐 Autenticação

O sistema usa duas estratégias de autenticação:

### Local Strategy
- Login com username/email e senha
- Senhas criptografadas com bcrypt

### JWT Strategy
- Token JWT para requisições autenticadas
- Validação via guards

## 📚 Endpoints Principais

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

### Usuários
- `GET /user` - Listar usuários
- `POST /user` - Criar usuário
- `GET /user/:id` - Obter usuário
- `PATCH /user/:id` - Atualizar usuário
- `DELETE /user/:id` - Deletar usuário

### Produtos
- `GET /product` - Listar produtos
- `POST /product` - Criar produto
- `GET /product/:id` - Obter produto
- `PATCH /product/:id` - Atualizar produto
- `DELETE /product/:id` - Deletar produto

### Pedidos
- `GET /order` - Listar pedidos
- `POST /order` - Criar pedido
- `GET /order/:id` - Obter pedido
- `PATCH /order/:id` - Atualizar pedido
- `DELETE /order/:id` - Deletar pedido

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

UNLICENSED

## 👨‍💻 Autor

Desenvolvido por: 

- Daniel RIbeiro Sacramento
- Eduardo Pagel
- Gabriela Lima
- Joselaine Bechaire
- Juliana Matsuda
- Marcos Vinicius Pinto dos Santos
- Michael Sales Figueredo

---

**Status**: Em Desenvolvimento 🚧
