# Planner — Dia, Semana e Mês

Este documento descreve o comportamento temporal do Planner do PORTOTYPE "0".

## Conceitos

O Planner trabalha com duas datas diferentes:

```text
scheduledAt
```

indica quando a tarefa foi planejada para ser executada.

```text
dueDate
```

indica o prazo limite da tarefa.

Exemplo:

```text
Planejada para: terça-feira 19:00
Prazo: sexta-feira 23:59
```

A tarefa aparece no calendário de terça-feira, mas só será considerada atrasada depois do prazo de sexta-feira.

## Visualização diária

Exibe tarefas cujo `scheduledAt` pertence ao dia selecionado.

Permite:

- navegar para o dia anterior;
- voltar para hoje;
- avançar para o próximo dia;
- criar uma tarefa já planejada para o dia selecionado;
- editar e alterar o status de tarefas do dia.

## Visualização semanal

A semana começa na segunda-feira e termina no domingo.

Cada coluna representa um dia e mostra as tarefas planejadas.

Ao selecionar um dia, o Planner muda para a visualização diária daquele dia.

## Visualização mensal

O calendário mensal usa uma grade de 42 dias (6 semanas), incluindo dias do mês anterior e seguinte quando necessário.

Cada dia mostra até três tarefas.

Quando houver mais tarefas:

```text
+N tarefa(s)
```

é exibido.

Selecionar a data leva para a visão diária.

Selecionar uma tarefa abre sua edição.

## Navegação

A barra do Planner possui:

```text
←   Hoje   →
```

O deslocamento depende da visualização:

- Dia: ±1 dia;
- Semana: ±7 dias;
- Mês: ±1 mês.

## Tarefas sem data planejada

Uma tarefa pode existir sem `scheduledAt`.

Essas tarefas ficam na seção:

```text
Sem data planejada
```

Isso funciona como uma caixa de entrada para atividades ainda não colocadas no calendário.

## Filtros

Os filtros existentes continuam aplicados às visualizações:

- Todas;
- Planejadas;
- Em andamento;
- Concluídas;
- Atrasadas.

"Atrasada" continua sendo calculada por `dueDate`, e não por `scheduledAt`.

## Responsividade

As visões semanal e mensal utilizam rolagem horizontal local em telas estreitas.

Isso preserva a legibilidade dos sete dias sem forçar o restante da página a ultrapassar a largura da tela.

## Persistência

Nenhuma nova coleção foi criada.

O Planner continua usando:

```text
users/{uid}/tasks/{taskId}
```

com o campo opcional:

```text
scheduledAt: Timestamp
```

A conversão para `Date` continua isolada em `FirebaseTaskRepository`.

## Próximo passo

O próximo milestone é:

```text
MVP 0.5 — Study sessions + cronômetro
```

O botão de link externo será então integrado ao início de uma sessão de estudo.
