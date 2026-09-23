# Development Workflow

Este documento define como o PORTOTYPE "0" será desenvolvido e documentado.

## Fluxo

```text
Issue / requisito
      ↓
Branch
      ↓
Implementação
      ↓
CHANGELOG + documentação
      ↓
Lint + Build
      ↓
Pull Request aberto pelo proprietário
      ↓
Revisão
      ↓
Merge
      ↓
main
```

## Responsabilidades

A integração/assistente pode:

- analisar issues e código;
- criar branches;
- criar e modificar arquivos;
- fazer commits;
- corrigir falhas de CI;
- atualizar documentação;
- atualizar changelog;
- preparar branches para validação manual no VS Code.

O proprietário do repositório:

- abre Pull Requests;
- revisa as alterações;
- decide quando fazer merge;
- executa os testes funcionais/manuais no VS Code e no Firebase real;
- retorna erros e resultados para correção na branch.

## Nomes de branches

```text
feat/<nome>       nova funcionalidade
fix/<nome>        correção
docs/<nome>       documentação
refactor/<nome>   refatoração sem nova funcionalidade
test/<nome>       testes
chore/<nome>      manutenção
```

Exemplos:

```text
feat/firebase-auth
fix/ci-typescript-config
docs/project-tracking
```

## Commits

Usar Conventional Commits quando possível:

```text
feat: adiciona login com Firebase
fix: corrige cálculo de duração
docs: atualiza arquitetura
refactor: separa repository do service
test: adiciona testes de TaskService
chore: atualiza configuração do Vite
ci: ajusta workflow de build
```

## Regra de documentação

Antes de considerar uma mudança pronta:

1. atualizar `CHANGELOG.md` em **[Unreleased]**;
2. atualizar `docs/PROJECT_STATUS.md` se o estado do projeto mudou;
3. criar ou atualizar um ADR se houver decisão arquitetural;
4. atualizar README/documentação quando mudar configuração ou uso;
5. garantir que nenhum segredo foi commitado.

## Gate de integração

Uma branch só deve ser considerada pronta quando:

```text
npm test
npm run lint
npm run build
```

estiverem passando.

O GitHub Actions pode executar lint/build automaticamente.

Testes funcionais manuais não serão executados pela integração/assistente dentro do Work, salvo solicitação explícita. A validação funcional será feita pelo proprietário no VS Code.

Testes automatizados poderão ser adicionados como gate conforme o projeto evoluir.

## Regra Firebase

Componentes e páginas React não devem importar APIs do Firestore diretamente.

Fluxo obrigatório:

```text
UI → Hook/Context → Service → Repository → Firebase
```

## Segredos

Nunca commitar:

```text
.env
.env.local
service-account.json
credenciais privadas
tokens
senhas
chaves administrativas
```

As variáveis públicas necessárias ao SDK Web do Firebase devem ser fornecidas localmente através do arquivo `.env.local`.
