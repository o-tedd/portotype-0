# Tasks — Modelo e fluxo do MVP

Este documento descreve o módulo de tarefas do PORTOTYPE "0".

## Persistência

Cada tarefa pertence ao usuário autenticado e fica armazenada em:

```text
users/{uid}/tasks/{taskId}
```

O `userId` existe no tipo de domínio para facilitar regras de negócio, mas não precisa ser duplicado dentro do documento Firestore porque o UID já faz parte do caminho.

## Arquitetura

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
Cloud Firestore
```

Nenhum componente React acessa Firestore diretamente.

## Campos

Uma tarefa pode possuir:

- título;
- descrição;
- prioridade;
- dificuldade;
- status;
- data de criação;
- data de atualização;
- prazo;
- data planejada;
- duração estimada;
- link externo;
- observações;
- XP potencial;
- referência futura de certificado.

Campos de categoria, sessões, anexos e certificados serão ligados gradualmente nos próximos milestones.

## Status

Estados disponíveis no domínio:

```text
planned
in_progress
completed
cancelled
```

Fluxo inicial:

```text
Planejada
   ↓
Em andamento
   ↓
Concluída
   ↓
Reabrir
   ↓
Planejada
```

O estado `cancelled` já existe no domínio para uso futuro, mas não possui ação dedicada na interface do MVP 0.3.

## Status visual

As cores são apenas apoio visual. Todo estado também possui texto.

- concluída → verde;
- atrasada → vermelho;
- em andamento → azul;
- planejada → amarelo;
- cancelada → neutro.

O estado "atrasada" é derivado e não armazenado no banco.

Uma tarefa é considerada atrasada quando:

```text
dueDate < agora
AND status != completed
AND status != cancelled
```

## Dificuldade e XP potencial

O MVP mantém a configuração inicial:

```text
Fácil   → 25 XP
Média   → 50 XP
Difícil → 100 XP
```

No MVP 0.3 esse valor representa apenas o **XP potencial da tarefa**.

Concluir uma tarefa ainda não concede XP ao perfil.

A concessão real será responsabilidade do módulo de gamificação, evitando misturar CRUD de tarefas com regras futuras de XP e anti-abuso.

## Links externos

O formulário aceita somente URLs HTTP ou HTTPS.

No MVP 0.3, "Abrir link" apenas abre o recurso em nova aba.

O fluxo "Iniciar atividade + criar sessão + iniciar cronômetro" será implementado no milestone de sessões.

## Operações disponíveis

### Criar

```text
TaskForm
  ↓
TaskService.createTask()
  ↓
FirebaseTaskRepository.create()
```

### Editar

Campos editáveis:

- título;
- descrição;
- prioridade;
- dificuldade;
- prazo;
- duração estimada;
- link;
- observações.

### Concluir

Atualiza:

```text
status = completed
completedAt = agora
updatedAt = agora
```

### Reabrir

Atualiza:

```text
status = planned
completedAt = removido
updatedAt = agora
```

### Excluir

A exclusão é definitiva no MVP e pede confirmação na interface.

Soft delete poderá ser adotado futuramente se houver necessidade de auditoria ou lixeira.

## Consulta

A listagem atual usa:

```text
users/{uid}/tasks
ORDER BY createdAt DESC
```

Não há necessidade de índice composto para essa consulta inicial.

## Próximo passo

O MVP 0.4 adicionará visualizações:

- diária;
- semanal;
- mensal.

Essas visualizações reutilizarão o mesmo `TaskService` e `TaskRepository`.
