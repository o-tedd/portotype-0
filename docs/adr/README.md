# Architecture Decision Records

Os ADRs registram decisões arquiteturais importantes do PORTOTYPE "0".

| ID | Decisão | Status |
| --- | --- | --- |
| [DEC-001](DEC-001-foundation.md) | React + TypeScript + Vite | Aceita |
| [DEC-002](DEC-002-firebase-mvp.md) | Firebase no MVP | Aceita |
| [DEC-003](DEC-003-repository-pattern.md) | Repository Pattern | Aceita |
| [DEC-004](DEC-004-study-sessions.md) | Sessões independentes das tarefas | Aceita |
| [DEC-005](DEC-005-user-data-isolation.md) | Isolamento de dados por UID | Aceita |
| [DEC-006](DEC-006-domain-firebase-independence.md) | Domínio independente de tipos Firebase | Aceita |
| [DEC-007](DEC-007-authentication-boundary.md) | Autenticação atrás de Repository e Service | Aceita |

## Quando criar um ADR

Criar um novo registro quando uma decisão alterar de forma relevante:

- arquitetura;
- persistência;
- autenticação/autorização;
- modelo de dados;
- estratégia de deploy;
- integração externa;
- regras centrais de gamificação ou sessões.

Não é necessário ADR para ajustes visuais pequenos ou correções locais sem impacto arquitetural.
