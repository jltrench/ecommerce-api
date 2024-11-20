# E-commerce API

Um projeto backend robusto desenvolvido com NestJS, demonstrando boas práticas de desenvolvimento e padrões de projeto modernos.

## 🛠 Tecnologias

- NestJS (Framework)
- TypeScript
- PostgreSQL (Banco de dados)
- Prisma (ORM)
- Docker & Docker Compose
- Redis (Cache & Queue)
- JWT (Autenticação)
- Swagger (Documentação)

## ⚡ Funcionalidades

- Sistema de autenticação e autorização com JWT
- CRUD completo de produtos e categorias
- Gestão de pedidos e carrinho
- Sistema de pagamentos
- Cache com Redis
- Documentação automática com Swagger
- Testes automatizados

## 🚀 Como executar

### Pré-requisitos

- Docker
- Docker Compose
- Node.js
- pnpm

### Instalação e Execução

1. Clone o repositório
```bash
git clone https://github.com/jltrench/ecommerce-api
cd ecommerce-api
```

2. Instale as dependências
```bash
pnpm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Execute com Docker
```bash
docker compose up -d
```

5. Execute as migrations e seeds
```bash
docker compose exec api sh -c "pnpm prisma migrate reset --force"
```

### Acessando

- API: http://localhost:3000
- Documentação (Swagger): http://localhost:3000/api
- pgAdmin: http://localhost:8080
  - Email: admin@admin.com
  - Senha: admin

### Usuários de teste

- Admin: admin@example.com (senha: secret42)
- Usuário: user@example.com (senha: secret42)

## 🏗 Estrutura do Projeto

```
src/
├── config/                 # Configurações da aplicação
├── modules/               # Módulos da aplicação
│   ├── users/           # Gestão de usuários
│   ├── products/        # Produtos e catálogo
│   ├── orders/          # Pedidos
│   ├── payments/        # Pagamentos
│   └── cart/            # Carrinho de compras
├── shared/               # Recursos compartilhados
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interfaces/
│   ├── middlewares/
│   └── utils/
└── main.ts
```

## 🛡 Arquitetura

- Clean Architecture
- SOLID Principles
- Domain-Driven Design (DDD)
- Repository Pattern
- Design Patterns modernos

## 📊 Modelagem do Banco

- Users (Usuários)
- Products (Produtos)
- Categories (Categorias)
- Orders (Pedidos)
- Payments (Pagamentos)

## 🧪 Testes

```bash
# Testes unitários
pnpm test

# Testes e2e
pnpm test:e2e

# Coverage
pnpm test:cov
```

## 📚 Documentação API

A documentação completa da API está disponível através do Swagger UI:
- Local: http://localhost:3000/api
- Produção: [seu-dominio]/api

## 🛠 Features Técnicas

- Autenticação JWT
- Validação de dados com class-validator
- Cache com Redis
- Rate Limiting
- Logging
- Error Handling
- CORS configurado
- Migrations automáticas
- Seeds para dados iniciais
- Docker multi-stage build
- CI/CD ready

## 🎯 Objetivo

- Desenvolvimento backend com NestJS
- Arquitetura de software
- Boas práticas de desenvolvimento
- DevOps e containerização
- Banco de dados e cache
- Testes automatizados
- Documentação de API

## Status do Projeto

🚧 Em desenvolvimento 

---
Desenvolvido com ☕ por  João Lucca Trench