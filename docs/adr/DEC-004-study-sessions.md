# DEC-004 — Sessões independentes das tarefas

## Status

Aceita

## Contexto

Uma atividade pode ser estudada em vários dias e em várias sessões.

Armazenar somente um tempo acumulado na tarefa eliminaria o histórico necessário para estatísticas futuras.

## Decisão

`StudySession` será uma entidade independente relacionada à tarefa por `taskId`.

## Consequências

Permite:

- múltiplas sessões por tarefa;
- histórico detalhado;
- pausa e retomada;
- estatísticas temporais;
- cálculo confiável do tempo acumulado.
