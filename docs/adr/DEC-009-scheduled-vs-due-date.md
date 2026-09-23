# DEC-009 — Data planejada é separada do prazo

## Status

Aceita

## Contexto

Uma tarefa pode ser executada antes do prazo.

Usar apenas `dueDate` como posição no calendário misturaria duas perguntas diferentes:

- quando quero fazer esta tarefa?
- até quando esta tarefa precisa estar pronta?

Isso também faria tarefas com prazo distante aparecerem somente no último dia, mesmo quando o usuário pretendesse estudá-las antes.

## Decisão

O domínio manterá dois campos distintos:

```text
scheduledAt
```

para planejamento;

e

```text
dueDate
```

para prazo.

## Regras

O Planner diário/semanal/mensal usa `scheduledAt`.

O cálculo de atraso usa `dueDate`.

Uma tarefa sem `scheduledAt` continua válida e aparece em "Sem data planejada".

Uma tarefa sem `dueDate` nunca é considerada atrasada.

## Consequências

Permite:

- organizar estudos antecipadamente;
- reagendar uma tarefa sem alterar seu prazo;
- manter alertas de atraso semanticamente corretos;
- evoluir o Planner para drag-and-drop futuramente;
- calcular carga de estudo por dia independentemente de deadlines.
