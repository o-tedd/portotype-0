# DEC-008 — CRUD de tarefas não concede XP

## Status

Aceita

## Contexto

A tarefa possui dificuldade e um valor potencial de XP.

Uma implementação inicial chegou a marcar `xpGranted = true` diretamente ao concluir uma tarefa, mesmo sem atualizar de forma autoritativa o XP do usuário.

Isso mistura duas responsabilidades:

- lifecycle da tarefa;
- gamificação.

Também dificultaria implementar posteriormente regras de anti-abuso e transações de XP.

## Decisão

O módulo de tarefas será responsável apenas por:

- criar;
- editar;
- alterar status;
- concluir/reabrir;
- excluir.

O campo `xpReward` continuará armazenando o valor potencial da atividade.

O campo `xpGranted` permanecerá falso até que o módulo de gamificação execute uma concessão válida.

## Consequências

Fluxo atual:

```text
Concluir tarefa
      ↓
status = completed
      ↓
nenhum XP é concedido ainda
```

Fluxo futuro:

```text
Concluir tarefa
      ↓
GamificationService
      ↓
validação
      ↓
XP transaction
      ↓
xpGranted = true
```

Isso mantém o CRUD independente das regras de gamificação e facilita mover a concessão de XP para backend/Cloud Function posteriormente.
