# DEC-007 — Autenticação atrás de Repository e Service

## Status

Aceita

## Contexto

O Firebase Authentication acelera o MVP, mas o frontend deve permanecer preparado para futura autenticação através de uma API própria.

Importar Firebase Authentication diretamente em páginas e componentes criaria acoplamento semelhante ao que queremos evitar com Firestore.

## Decisão

A autenticação seguirá o mesmo limite arquitetural da persistência:

```text
React
  ↓
AuthContext / useAuth
  ↓
AuthService
  ↓
AuthRepository
  ↓
FirebaseAuthRepository
  ↓
Firebase Authentication
```

O perfil do usuário será persistido separadamente através de `UserRepository`.

## Consequências

- páginas de autenticação não conhecem Firebase;
- Firebase pode ser substituído por uma API própria;
- estado de autenticação fica centralizado em `AuthContext`;
- rotas protegidas dependem somente do contexto da aplicação;
- o perfil em Firestore pode evoluir independentemente do provedor de identidade.
