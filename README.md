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

#### .env (Desenvolvimento)
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

## � Entidades do Sistema

### User
A entidade User representa tanto clientes quanto restaurantes na plataforma.

**Campos:**
- `id` (number): Identificador único
- `name` (string, até 100 caracteres): Nome do usuário
- `document` (string, até 20 caracteres): CPF ou CNPJ - único
- `email` (string, até 100 caracteres): Email - único
- `password` (string, até 255 caracteres): Senha criptografada
- `role` (enum: CLIENT | RESTAURANT): Tipo de usuário (padrão: CLIENT)
- `address` (string, até 255 caracteres): Endereço (opcional)
- `createdAt` (Date): Data de criação
- `updatedAt` (Date): Data de última atualização

### Product
Produtos oferecidos pelos restaurantes.

**Campos:**
- `id` (number): Identificador único
- `restaurant` (User): Restaurante que oferece o produto (relacionamento ManyToOne)
- `name` (string, até 100 caracteres): Nome do produto
- `description` (text): Descrição do produto (opcional)
- `price` (decimal): Preço do produto
- `available` (boolean): Disponibilidade (padrão: true)
- `createdAt` (Date): Data de criação
- `updatedAt` (Date): Data de última atualização

### Order
Pedidos realizados pelos clientes.

**Enum OrderStatus:**
- `CREATED`: Pedido criado
- `CONFIRMED`: Pedido confirmado
- `DELIVERING`: Em entrega
- `FINISHED`: Finalizado
- `CANCELED`: Cancelado

**Campos:**
- `id` (number): Identificador único
- `items` (JSON): Array de itens do pedido com os seguintes campos:
  - `productId` (number): ID do produto
  - `name` (string): Nome do produto
  - `price` (number): Preço unitário
  - `quantity` (number): Quantidade
  - `observations` (string): Observações (opcional)
- `total` (decimal): Valor total do pedido
- `status` (enum OrderStatus): Status do pedido (padrão: CREATED)
- `client` (User): Cliente que realizou o pedido (relacionamento ManyToOne)
- `restaurant` (User): Restaurante responsável (relacionamento ManyToOne)
- `createdAt` (Date): Data de criação
- `updatedAt` (Date): Data de última atualização

### UsuarioLogin
DTO utilizado para autenticação.

**Campos:**
- `email` (string): Email do usuário
- `password` (string): Senha do usuário

## �🔧 Tecnologias

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

## 📚 API Documentation

A documentação completa da API está disponível através do Swagger:

👉 **[Swagger UI - Garçon Delivery API](https://garcon-delivery.onrender.com/swagger#/)**

Aqui você encontrará:
- ✅ Todas as entidades e seus campos
- ✅ Todos os DTOs (Data Transfer Objects)
- ✅ Todos os endpoints disponíveis
- ✅ Descrição de parâmetros e respostas
- ✅ Interface interativa para testar a API

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
