# DEC-002 — Firebase no MVP

## Status
Aceita

## Decisão
Usar Firebase Authentication e Cloud Firestore na primeira versão.

## Motivo
Reduz a infraestrutura necessária para validar o produto e permite concentrar o desenvolvimento no fluxo do usuário.

## Consequências
- acesso ao Firebase ficará isolado em adapters/repositories;
- componentes React não importarão Firestore;
- uma futura API poderá substituir os repositories sem reescrever as páginas.
