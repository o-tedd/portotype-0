# Project Status

> Snapshot: 2026-09-23

Este documento mostra o estado técnico atual do PORTOTYPE "0".

## Fase atual

**MVP 0.3 — CRUD de tarefas — em desenvolvimento**

Branch atual:

```text
feat/tasks-crud
```

Ela foi criada sobre `feat/firebase-auth`, que por sua vez contém a base documental necessária para acompanhar as mudanças.

## Estado por área

| Área | Estado | Observação |
| --- | --- | --- |
| React + TypeScript + Vite | Concluído | Fundação criada |
| Tailwind CSS | Concluído | Interface responsiva |
| React Router | Concluído | Rotas públicas/protegidas |
| Firebase config | Concluído | Variáveis via `.env.local` |
| Desenvolvimento local | Concluído | Git + VS Code documentados |
| Authentication | Implementado | Validação real pelo usuário ainda pendente |
| Firestore Rules | Implementado | Deploy no projeto Firebase ainda necessário |
| Tasks Repository | Implementado | `FirebaseTaskRepository` |
| Tasks Service | Implementado | CRUD + lifecycle |
| Tasks CRUD UI | Implementado | Criar, editar, status e excluir |
| Planner básico | Implementado | Lista, filtros e indicadores |
| Planner diário/semanal/mensal | Pendente | MVP 0.4 |
| Study sessions | Modelo criado | MVP 0.5 |
| Dashboard dinâmico | Pendente | MVP 0.6 |
| Gamificação | Pendente | MVP 0.7 |
| Certificados | Pendente | MVP 0.8 |

## Persistência de tarefas

```text
users/{uid}/tasks/{taskId}
```

Fluxo:

```text
PlannerPage
   ↓
useTasks
   ↓
TaskService
   ↓
TaskRepository
   ↓
FirebaseTaskRepository
   ↓
Firestore
```

## Branches de trabalho

Enquanto as branches anteriores não forem integradas manualmente:

```text
main
└── docs/project-tracking
    └── feat/firebase-auth
        └── feat/tasks-crud
```

Para manter os diffs mais limpos, a ordem recomendada de integração é a mesma da árvore acima.

## Issues

- #1 — Roadmap geral
- #2 — MVP 0.2 Authentication
- #5 — MVP 0.3 Tasks CRUD

## Validação

Por decisão do projeto, a integração/assistente não realizará testes funcionais manuais dentro do Work.

O fluxo será:

```text
implementação no GitHub
        ↓
branch disponível
        ↓
usuário abre no VS Code
        ↓
testa com Firebase real
        ↓
retorna erros/resultados
        ↓
correção na branch
```

O GitHub Actions pode continuar executando lint/build automaticamente conforme o workflow versionado, mas o comportamento funcional será validado pelo proprietário.

## MVP 0.3 — implementado na branch

- FirebaseTaskRepository;
- TaskService com regras de criação/edição/status/exclusão;
- useTasks;
- formulário de criação e edição;
- listagem;
- conclusão;
- reabertura;
- status "em andamento";
- exclusão com confirmação;
- filtros;
- cálculo visual de atraso;
- links externos;
- XP potencial por dificuldade;
- documentação do modelo.

## Pendente para concluir o milestone

- validar o fluxo no VS Code;
- testar contra o Firebase real;
- confirmar regras Firestore publicadas;
- trazer eventuais erros encontrados;
- abrir Pull Request manualmente quando a branch estiver aprovada.

## Próximo milestone

**MVP 0.4 — Planner diário, semanal e mensal**

Ele reutilizará a camada de tarefas criada no MVP 0.3.
