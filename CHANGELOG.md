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
- ADRs complementares sobre sessões, isolamento por UID e independência do Firebase.

### Changed

- definido que Pull Requests e merges serão abertos/executados manualmente pelo proprietário do repositório;
- definido que mudanças funcionais devem atualizar este changelog antes do merge.

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

### Known issues

- o primeiro build da `main` após o merge da Foundation falhou por configuração incompatível em `tsconfig.node.json`;
- a correção foi preparada separadamente na branch `fix/ci-typescript-config`.

---

## Convenção

Cada mudança futura deve ser adicionada primeiro em **[Unreleased]**.

Ao concluir um milestone, as entradas de **[Unreleased]** devem ser movidas para uma nova seção identificada pela versão/marco e data.
