# Changelog

Todas as alterações relevantes do PORTOTYPE "0" devem ser registradas neste arquivo.

O formato é inspirado em **Keep a Changelog**. Durante o MVP, as versões representam marcos funcionais do projeto.

## [Unreleased]

### Added

- estrutura formal de documentação do projeto;
- acompanhamento de status em `docs/PROJECT_STATUS.md`;
- fluxo de desenvolvimento em `docs/DEVELOPMENT_WORKFLOW.md`;
- visão geral da arquitetura em `docs/ARCHITECTURE.md`;
- template de Pull Request;
- ADRs complementares sobre sessões, isolamento por UID, independência do Firebase e autenticação;
- `AuthRepository` e `UserRepository`;
- `FirebaseAuthRepository` e `FirebaseUserRepository`;
- `AuthService`, `AuthContext` e `useAuth`;
- login com e-mail e senha;
- cadastro com e-mail e senha;
- logout;
- recuperação de senha;
- persistência local da sessão;
- rotas públicas e rotas protegidas;
- criação automática do perfil inicial em `users/{uid}`;
- páginas de Login, Cadastro e Recuperação de Senha;
- `firestore.rules` com isolamento inicial por UID;
- guia `docs/FIREBASE_SETUP.md`;
- guia `docs/LOCAL_DEVELOPMENT.md` para uso manual com Git e VS Code;
- recomendações compartilhadas de extensões e configurações do VS Code;
- configuração opcional de Dev Container para ambiente Node 22 portátil;
- `FirebaseTaskRepository` persistindo tarefas em `users/{uid}/tasks`;
- `useTasks` para conectar o Planner ao `TaskService`;
- criação, edição, conclusão, reabertura e exclusão de tarefas;
- formulário de tarefas com prioridade, dificuldade, prazo, duração estimada, link externo e observações;
- filtros de tarefas por status e atraso;
- indicadores de total, ativas, concluídas e atrasadas no Planner;
- documentação `docs/TASKS.md`;
- ADR DEC-008 separando CRUD de tarefas da concessão de XP;
- campo `scheduledAt` exposto no formulário de tarefas;
- visualização diária do Planner;
- visualização semanal de segunda a domingo;
- visualização mensal em grade de seis semanas;
- navegação temporal anterior/hoje/próximo;
- criação de tarefa pré-agendada a partir de um dia selecionado;
- seção de tarefas sem data planejada;
- documentação `docs/PLANNER.md`;
- ADR DEC-009 separando data planejada de prazo.

### Changed

- definido que Pull Requests e merges serão abertos/executados manualmente pelo proprietário do repositório;
- definido que mudanças funcionais devem atualizar este changelog antes do merge;
- layout autenticado agora exibe usuário e ação de logout;
- cabeçalho passa a identificar o milestone MVP 0.3;
- conclusão de tarefa deixa de marcar `xpGranted` diretamente; XP real fica reservado ao módulo de gamificação;
- validação funcional passa a ser realizada manualmente pelo proprietário no VS Code, enquanto alterações continuam sendo versionadas no GitHub;
- Planner passa a usar `scheduledAt` para posicionamento temporal e `dueDate` exclusivamente para prazo/atraso;
- cabeçalho passa a identificar o milestone MVP 0.4.

### Security

- acesso aos documentos de usuário no Firestore passa a ser limitado ao UID autenticado pelas regras versionadas no repositório.

---

## MVP 0.1 — Foundation — 2026-09-23

### Added

- React + TypeScript + Vite;
- Tailwind CSS;
- React Router;
- layout responsivo com sidebar no desktop e navegação inferior no mobile;
- páginas iniciais de Dashboard, Planner, Estatísticas, Certificados e Perfil;
- configuração do Firebase através de variáveis de ambiente;
- tipos de domínio `Task` e `StudySession`;
- contratos `TaskRepository` e `SessionRepository`;
- `TaskService` inicial;
- Architecture Decision Records;
- ESLint;
- GitHub Actions para lint e build;
- roadmap inicial através de GitHub Issues.

### Fixed

- configuração TypeScript do CI corrigida posteriormente no PR #4.

---

## Convenção

Cada mudança futura deve ser adicionada primeiro em **[Unreleased]**.

Ao concluir um milestone, as entradas de **[Unreleased]** devem ser movidas para uma nova seção identificada pela versão/marco e data.
