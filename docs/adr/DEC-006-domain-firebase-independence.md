# DEC-006 — Domínio independente de tipos Firebase

## Status

Aceita

## Contexto

O Firebase será usado para acelerar o MVP, mas poderá ser substituído por uma API própria.

## Decisão

Interfaces de domínio não usarão tipos específicos do Firebase como `Timestamp`, `DocumentReference` ou snapshots.

## Exemplo

Domínio:

```ts
createdAt: Date
```

Adapter Firebase:

```text
Firestore Timestamp ↔ Date
```

## Consequências

- services permanecem independentes do banco;
- testes ficam mais simples;
- futura migração para REST + SQL exige principalmente novos repository adapters.
