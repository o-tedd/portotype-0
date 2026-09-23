# Project Status

> Snapshot: 2026-09-23

Este documento mostra o estado técnico atual do PORTOTYPE "0". Ele deve ser atualizado a cada milestone ou mudança estrutural importante.

## Fase atual

**MVP 0.1 — Foundation**

A fundação React foi criada e mesclada na `main`.

## Estado por área

| Área | Estado | Observação |
| --- | --- | --- |
| React + TypeScript + Vite | Concluído | Estrutura inicial criada |
| Tailwind CSS | Concluído | Integrado ao Vite |
| React Router | Concluído | Rotas base disponíveis |
| Layout responsivo | Concluído | Desktop + mobile |
| Firebase config | Concluído | Variáveis via `.env.local` |
| Repository Pattern | Em andamento | Contratos iniciais criados |
| Authentication | Próximo | MVP 0.2 |
| Tasks CRUD | Pendente | MVP 0.3 |
| Planner | Pendente | MVP 0.4 |
| Study sessions | Modelo criado | Implementação posterior |
| Gamificação | Pendente | XP, nível e streak |
| Certificados | Pendente | Upload em fase posterior |

## CI

O primeiro CI executado na `main` após o merge do MVP 0.1 falhou com o erro TypeScript `TS5096`.

Causa: a versão antiga de `tsconfig.node.json` chegou à `main` antes da correção.

Correção preparada em:

```text
fix/ci-typescript-config
```

A configuração corrigida foi validada com sucesso em branch antes de ser preparada para integração na `main`.

## Branches de trabalho relevantes

```text
main
├── fix/ci-typescript-config
└── docs/project-tracking
```

## Issues

- Roadmap: #1
- MVP 0.2 — Authentication: #2

## Próximo milestone

**MVP 0.2 — Firebase Authentication**

Escopo planejado:

- AuthRepository;
- FirebaseAuthRepository;
- AuthService;
- AuthContext;
- useAuth;
- cadastro;
- login;
- logout;
- recuperação de senha;
- persistência de sessão;
- ProtectedRoute;
- criação do perfil inicial em `users/{uid}`.

## Responsabilidade de Pull Request

O código e a documentação podem ser preparados em branches pela integração/assistente.

A abertura e o merge dos Pull Requests ficam sob responsabilidade do proprietário do repositório.
