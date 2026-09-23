# PORTOTYPE "0"

Planner web responsivo para produtividade e estudos, com organização de tarefas, sessões de estudo, estatísticas e gamificação.

## MVP

A primeira versão usa:

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Firebase Authentication
- Cloud Firestore
- Firebase Storage em fase posterior

## Arquitetura

```text
React UI
  ↓
Hooks / Contexts
  ↓
Services
  ↓
Repository Contracts
  ↓
Firebase Repositories
  ↓
Firebase Auth / Firestore
```

Futuramente:

```text
React UI
  ↓
Services
  ↓
Repository Contracts
  ↓
REST/GraphQL Repository
  ↓
Backend próprio
  ↓
PostgreSQL / outro banco
```

### Regra arquitetural

Componentes React não devem acessar Firestore diretamente. Persistência deve passar por Services e Repositories.

## Executando localmente

Requer Node.js 22.12 ou superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` com a configuração Web do seu projeto Firebase.

## Variáveis Firebase

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

O arquivo `.env.local` não deve ser commitado.

## Roadmap

1. Foundation
2. Firebase Authentication e rotas protegidas
3. CRUD de tarefas
4. Planner diário, semanal e mensal
5. Sessões e cronômetro
6. Dashboard e estatísticas
7. XP, níveis e streak
8. Certificados
9. Conquistas e refinamentos

## Decisões de arquitetura

Consulte `docs/adr/`.

## Status atual

**MVP 0.1 — Foundation**
