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

Componentes React não devem acessar Firebase diretamente. Persistência e autenticação passam pelas camadas de Service e Repository.

## Executando localmente

Requer Node.js 22.12 ou superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` com a configuração Web do seu projeto Firebase.

Veja [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) para habilitar Authentication, Firestore e publicar as Security Rules.

## Documentação do projeto

- [Changelog](CHANGELOG.md)
- [Status atual](docs/PROJECT_STATUS.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Configuração Firebase](docs/FIREBASE_SETUP.md)
- [Modelo e fluxo de tarefas](docs/TASKS.md)
- [Planner diário, semanal e mensal](docs/PLANNER.md)
- [Desenvolvimento local e VS Code](docs/LOCAL_DEVELOPMENT.md)
- [Fluxo de desenvolvimento](docs/DEVELOPMENT_WORKFLOW.md)
- [Architecture Decision Records](docs/adr/README.md)

## Trabalhar no VS Code

O repositório pode ser clonado e editado manualmente em qualquer computador:

```bash
git clone https://github.com/o-tedd/portotype-0.git
cd portotype-0
code .
```

Depois instale as dependências e crie o arquivo local do Firebase:

```bash
npm install
```

Consulte [docs/LOCAL_DEVELOPMENT.md](docs/LOCAL_DEVELOPMENT.md) para o fluxo completo de Git, VS Code, troca de computador e Dev Container/Codespaces.

## Como trabalharemos

As alterações serão preparadas em branches com código, commits, changelog e documentação.

A abertura e o merge de Pull Requests serão feitos manualmente pelo proprietário do repositório.

Antes de integrar uma branch:

```bash
npm run lint
npm run build
```

devem estar passando.

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

## Status atual

**MVP 0.4 — Planner diário, semanal e mensal — em desenvolvimento**

Consulte [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) para o snapshot técnico mais recente.
