# Project Status

> Snapshot: 2026-09-23

Este documento mostra o estado técnico atual do PORTOTYPE "0".

## Fase atual

**MVP 0.4 — Planner diário, semanal e mensal — em desenvolvimento**

Branch atual:

```text
feat/planner-views
```

Ela foi criada sobre `feat/tasks-crud`.

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
| Planner diário | Implementado | Tarefas por `scheduledAt` |
| Planner semanal | Implementado | Segunda a domingo |
| Planner mensal | Implementado | Grade de seis semanas |
| Tarefas sem data | Implementado | Caixa de entrada separada |
| Study sessions | Modelo criado | MVP 0.5 |
| Dashboard dinâmico | Pendente | MVP 0.6 |
| Gamificação | Pendente | MVP 0.7 |
| Certificados | Pendente | MVP 0.8 |

## Regra temporal

```text
scheduledAt = quando a tarefa será executada
dueDate     = quando a tarefa vence
```

As visualizações do Planner usam `scheduledAt`.

O cálculo de atraso usa `dueDate`.

## Branches de trabalho

Enquanto as branches anteriores não forem integradas manualmente:

```text
main
└── docs/project-tracking
    └── feat/firebase-auth
        └── feat/tasks-crud
            └── feat/planner-views
```

A ordem recomendada de integração é a mesma da árvore.

## Issues

- #1 — Roadmap geral
- #2 — MVP 0.2 Authentication
- #5 — MVP 0.3 Tasks CRUD
- #6 — MVP 0.4 Planner views

## Validação

Testes funcionais/manuais serão executados pelo proprietário no VS Code/Firebase.

Fluxo:

```text
implementação no GitHub
        ↓
usuário abre a branch no VS Code
        ↓
testa comportamento real
        ↓
retorna erros/resultados
        ↓
correções na mesma branch
```

## MVP 0.4 — implementado na branch

- campo "Planejada para";
- separação entre planejamento e prazo;
- visão diária;
- visão semanal;
- visão mensal;
- anterior / hoje / próximo;
- clique em dia levando à visão diária;
- criação pré-agendada para o dia escolhido;
- edição de tarefa a partir do calendário;
- tarefas sem data planejada em seção própria;
- filtros existentes aplicados às visualizações;
- rolagem horizontal local para semana/mês em telas estreitas;
- documentação do comportamento temporal.

## Pendente para concluir o milestone

- validar no VS Code a navegação Dia/Semana/Mês;
- criar tarefas com `scheduledAt` e confirmar posicionamento;
- verificar diferença entre data planejada e prazo;
- validar tarefas sem data;
- validar responsividade;
- trazer eventuais erros;
- abrir Pull Request manualmente após aprovação.

## Próximo milestone

**MVP 0.5 — Study sessions + cronômetro**

Esse milestone conectará tarefas e links externos ao registro real de sessões de estudo.
