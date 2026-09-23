# Architecture Overview

## Objetivo

A arquitetura do PORTOTYPE "0" deve permitir usar Firebase no MVP sem transformar Firebase em uma dependência estrutural de todo o frontend.

## Camadas

```text
┌──────────────────────────────┐
│ React Pages / Components     │
├──────────────────────────────┤
│ Hooks / Contexts             │
├──────────────────────────────┤
│ Services                     │
├──────────────────────────────┤
│ Repository Contracts         │
├──────────────────────────────┤
│ Firebase Repository Adapters │
├──────────────────────────────┤
│ Auth / Firestore / Storage   │
└──────────────────────────────┘
```

## Responsabilidades

### UI

Renderiza estado, coleta entrada do usuário e dispara ações.

Não conhece Firestore.

### Hooks e Contexts

Conectam estado React aos services.

Exemplos futuros:

```text
useAuth
useTasks
useStudySession
useStatistics
```

### Services

Contêm casos de uso e regras de negócio.

Exemplos:

```text
AuthService
TaskService
SessionService
GamificationService
StatisticsService
```

### Repository Contracts

Definem as operações que a aplicação precisa sem definir como os dados são persistidos.

Exemplo:

```text
TaskRepository
SessionRepository
UserRepository
CertificateRepository
```

### Repository Adapters

Implementam os contratos usando uma tecnologia específica.

MVP:

```text
FirebaseTaskRepository
FirebaseSessionRepository
```

Futuro:

```text
ApiTaskRepository
ApiSessionRepository
```

## Migração futura

MVP:

```text
React
  ↓
Service
  ↓
Repository
  ↓
Firebase
```

Futuro:

```text
React
  ↓
Service
  ↓
Repository
  ↓
REST API / GraphQL
  ↓
Backend
  ↓
PostgreSQL
```

A meta é que páginas e componentes precisem de pouca ou nenhuma alteração durante essa migração.

## Modelo de dados Firebase

Estrutura preferencial:

```text
users/{uid}
├── tasks/{taskId}
├── sessions/{sessionId}
├── categories/{categoryId}
├── certificates/{certificateId}
└── achievements/{achievementId}
```

O `uid` do Firebase Authentication é a raiz de autorização do usuário.

## Tipos de domínio

Tipos centrais usam tipos JavaScript/TypeScript comuns.

Preferir:

```ts
createdAt: Date
```

Evitar no domínio:

```ts
createdAt: Timestamp
```

Conversões específicas do Firestore pertencem ao adapter Firebase.

## Sessões

Sessões de estudo são entidades independentes das tarefas.

Isso permite:

- múltiplas sessões para uma tarefa;
- cálculo de tempo acumulado;
- histórico de estudo;
- estatísticas por dia, semana, mês e categoria;
- troca futura do mecanismo de persistência.

## Fonte da verdade do cronômetro

O cronômetro não deve usar um contador incremental como fonte da verdade.

A duração deve ser calculada a partir de timestamps:

```text
startedAt
endedAt
pausedDuration
```

Timers do navegador servem apenas para atualizar a interface.
