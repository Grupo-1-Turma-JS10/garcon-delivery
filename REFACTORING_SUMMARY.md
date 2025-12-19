# Refatoração: Redução de Entidades

## Objetivo
Simplificar a arquitetura da aplicação reduzindo de 5 entidades para 3 entidades principais.

## Entidades Removidas
- ❌ **Address** - Campos de endereço agora estão embutidos na entidade `Order`
- ❌ **Category** - Categoria agora é um campo simples `string` na entidade `Product`
- ❌ **OrderItem** - Não era necessário; encomendas agora contêm produtos diretamente

## Entidades Mantidas
- ✅ **User** - Autenticação e gerenciamento de usuários
- ✅ **Product** - Catálogo de produtos com categoria em string
- ✅ **Order** - Pedidos com endereço embutido

## Mudanças Implementadas

### 1. Entidade Order
**Campos Adicionados:**
- `street` (varchar)
- `number` (varchar)
- `neighborhood` (varchar)
- `city` (varchar)
- `state` (varchar)
- `zipCode` (varchar)
- `complement` (varchar, opcional)

**Relacionamentos Removidos:**
- `address` (relação com Address)
- `orderItems` (relação com OrderItem)

### 2. Entidade Product
**Mudanças:**
- `category` alterada de `ManyToOne(Category)` para `varchar` (string)
- Permite categorias como "Pizza", "Bebida", etc. sem necessidade de tabela separada

### 3. Entidade User
**Removido:**
- `addresses` (relação OneToMany com Address)

### 4. DTOs Atualizados
- `create-order.dto.ts`: Inclui todos os campos de endereço
- `update-order.dto.ts`: Campos de endereço como opcionais
- `create-product.dto.ts`: Category como string
- `update-product.dto.ts`: Category como string

### 5. Módulos Simplificados
- `order.module.ts`: Removidas importações de AddressModule
- `product.module.ts`: Removidas importações de CategoryModule
- `app.module.ts`: Removidas importações de AddressModule e CategoryModule

### 6. Serviços Simplificados
- `order.service.ts`: Removida dependência de AddressService
- `product.service.ts`: Removida dependência de CategoryService

### 7. Testes Atualizados
- ✅ `test/user.e2e-spec.ts` - Mantido (sem referências a Address)
- ✅ `test/order.e2e-spec.ts` - Atualizado para nova estrutura
- ✅ `test/product.e2e-spec.ts` - Criado com testes para categoria como string
- ❌ `test/address.e2e-spec.ts` - Deletado
- ❌ `test/category.e2e-spec.ts` - Deletado
- ❌ `test/order-item.e2e-spec.ts` - Deletado

## Resultados dos Testes
```
✅ Test Suites: 3 passed, 3 total
✅ Tests: 24 passed, 24 total
✅ Snapshots: 0 total
```

## Benefícios
- **Menos Complexidade**: Redução de 5 para 3 entidades
- **Menos Dependências**: Eliminação de imports circulares
- **Simplificação de DTOs**: Menos validações aninhadas
- **Menos Migrações**: Menos tabelas para gerenciar
- **Melhor Performance**: Menos JOINs nas queries

## Directories Deletados
- `src/address/` - Completamente removido
- `src/category/` - Completamente removido
- `src/order/controller/order-item.controller.ts` - Removido
- `src/order/service/order-item.service.ts` - Removido

## Estrutura Final
```
src/
├── auth/
├── data/
├── order/
│   ├── controller/
│   │   └── order.controller.ts
│   ├── dto/
│   │   ├── create-order.dto.ts
│   │   └── update-order.dto.ts
│   ├── entities/
│   │   └── order.entity.ts
│   └── service/
│       └── order.service.ts
├── product/
│   ├── controller/
│   │   └── product.controller.ts
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── entities/
│   │   └── product.entity.ts
│   └── service/
│       └── product.service.ts
├── user/
│   ├── controller/
│   │   └── user.controller.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   └── service/
│       └── user.service.ts
├── app.controller.ts
├── app.module.ts
└── main.ts
```

## Como Usar

### Criar um Produto
```json
POST /product
{
  "name": "Pizza Margherita",
  "price": 29.99,
  "category": "Pizza",
  "description": "Deliciosa pizza com tomate e mozzarela"
}
```

### Criar um Pedido
```json
POST /order
{
  "userId": 1,
  "street": "Rua das Flores",
  "number": "123",
  "neighborhood": "Centro",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "complement": "Apto 42",
  "status": "PENDING"
}
```

## Próximas Sugestões
- Implementar paginação nos endpoints GET
- Adicionar filtros mais avançados (por status, data, etc.)
- Implementar soft deletes
- Adicionar logs de auditoria
