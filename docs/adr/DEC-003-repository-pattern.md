# DEC-003 — Repository Pattern

## Status
Aceita

## Decisão
Toda persistência será acessada através de contratos de Repository e Services.

## Regra
Componentes e páginas não devem importar diretamente APIs de Firestore.

## Fluxo

```text
Tela → Hook → Service → Repository → Firebase
```

Futuro:

```text
Tela → Hook → Service → Repository → REST API → PostgreSQL
```
