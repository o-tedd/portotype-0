# DEC-005 — Isolamento de dados por UID

## Status

Aceita

## Contexto

Cada usuário deve visualizar e alterar somente seus próprios dados.

## Decisão

No Firebase MVP, dados operacionais serão organizados sob o UID autenticado.

```text
users/{uid}/tasks
users/{uid}/sessions
users/{uid}/categories
users/{uid}/certificates
```

## Consequências

- regras do Firestore ficam mais simples;
- consultas naturalmente partem do usuário autenticado;
- reduz risco de acesso cruzado entre usuários;
- repositories escondem esse detalhe da UI.
