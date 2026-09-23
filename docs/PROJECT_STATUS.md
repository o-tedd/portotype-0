# Project Status

> Snapshot: 2026-09-23

Este documento mostra o estado técnico atual do PORTOTYPE "0". Ele deve ser atualizado a cada milestone ou mudança estrutural importante.

## Fase atual

**MVP 0.2 — Firebase Authentication — em desenvolvimento**

A fundação foi integrada à `main` e a correção do CI foi mesclada pelo PR #4.

A implementação de autenticação está sendo desenvolvida em:

```text
feat/firebase-auth
```

## Estado por área

| Área | Estado | Observação |
| --- | --- | --- |
| React + TypeScript + Vite | Concluído | Estrutura inicial criada |
| Tailwind CSS | Concluído | Integrado ao Vite |
| React Router | Concluído | Rotas base disponíveis |
| Layout responsivo | Concluído | Desktop + mobile |
| Firebase config | Concluído | Variáveis via `.env.local` |
| Desenvolvimento local | Concluído | Git + VS Code documentados |
| Dev Container | Disponível | Opcional para ambiente portátil/Codespaces |
| Repository Pattern | Em andamento | Auth/User + Task/Session contracts |
| Authentication | Em desenvolvimento | Login, cadastro, logout, reset e sessão |
| Rotas protegidas | Implementado na branch | Validação pendente no Firebase real |
| Perfil inicial | Implementado na branch | `users/{uid}` |
| Firestore Rules | Implementado na branch | Deploy manual ainda necessário |
| Tasks CRUD | Pendente | MVP 0.3 |
| Planner | Pendente | MVP 0.4 |
| Study sessions | Modelo criado | Implementação posterior |
| Gamificação | Pendente | XP, nível e streak |
| Certificados | Pendente | Upload em fase posterior |

## CI

O erro `TS5096` encontrado após o MVP 0.1 foi corrigido e integrado através do PR #4.

Branches `feat/**`, `fix/**` e `main` são validadas pelo GitHub Actions.

Gate atual:

```text
npm run lint
npm run build
```

## Branches de trabalho relevantes

```text
main
└── docs/project-tracking
    └── feat/firebase-auth
```

`feat/firebase-auth` foi criada a partir da branch de documentação para manter changelog, status e ADRs no mesmo histórico.

Ao abrir os Pull Requests manualmente, integrar `docs/project-tracking` antes de `feat/firebase-auth` reduzirá ruído no diff.

## Issues

- Roadmap: #1
- MVP 0.2 — Authentication: #2

## MVP 0.2 — escopo implementado na branch

- AuthRepository;
- UserRepository;
- FirebaseAuthRepository;
- FirebaseUserRepository;
- AuthService;
- AuthContext;
- useAuth;
- cadastro;
- login;
- logout;
- recuperação de senha;
- persistência local de sessão;
- ProtectedRoute;
- PublicOnlyRoute;
- perfil inicial em `users/{uid}`;
- Security Rules iniciais;
- documentação de setup Firebase.

## Validação técnica

O CI da branch `feat/firebase-auth` passou em `npm run lint` e `npm run build`.

## Pendente para concluir o milestone

- configurar credenciais Web reais em `.env.local`;
- habilitar Email/Password no Firebase Console;
- publicar `firestore.rules`;
- testar cadastro, logout, login e recuperação de senha contra o projeto Firebase real;
- revisar comportamento de erros e estados de carregamento.

## Responsabilidade de Pull Request

O código e a documentação podem ser preparados em branches pela integração/assistente.

A abertura e o merge dos Pull Requests ficam sob responsabilidade do proprietário do repositório.
