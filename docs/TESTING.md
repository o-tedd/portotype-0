# Testing

Este documento registra o que é validado automaticamente e o que ainda depende de teste manual no PORTOTYPE "0".

## Pipeline automático

O GitHub Actions executa, nesta ordem:

```bash
npm test
npm run lint
npm run build
```

## Último resultado registrado

Branch:

```text
feat/planner-views
```

Resultado:

```text
Automated tests  ✅
Lint             ✅
Production build ✅
```

### Testes automatizados

Total atual:

```text
4 arquivos de teste
21 testes
21 aprovados
0 falhas
```

Cobertura funcional atual:

| Área | Testes |
| --- | ---: |
| AuthService | 3 |
| TaskService | 6 |
| Date/Planner utilities | 7 |
| Task status utilities | 5 |
| **Total** | **21** |

## O que os testes cobrem

### AuthService

- reutiliza perfil existente;
- cria perfil inicial com defaults seguros;
- usa prefixo do e-mail quando displayName não existe.

### TaskService

- normalização de campos;
- XP potencial por dificuldade;
- validação de título;
- validação de URL HTTP/HTTPS;
- conclusão sem concessão indevida de XP;
- reabertura removendo completedAt;
- exclusão de tarefa existente.

### Planner / datas

- semana começando na segunda-feira;
- domingo pertencendo à semana correta;
- geração de sete dias;
- calendário mensal com 42 dias;
- navegação de dia e mês sem mutar a data original;
- comparação por dia de calendário;
- horário padrão de 09:00 para planejamento futuro.

### Status de tarefas

- detecção de atraso por dueDate;
- tarefas concluídas não ficam atrasadas;
- scheduledAt não define atraso;
- status visual vermelho para atrasadas;
- conclusão tem precedência visual sobre atraso.

## Testes manuais ainda necessários

Os itens abaixo dependem do navegador e/ou do projeto Firebase real:

- cadastro real via Firebase Authentication;
- login real;
- logout;
- persistência da sessão após recarregar a página;
- envio real do e-mail de recuperação;
- criação do perfil em `users/{uid}`;
- criação/edição/exclusão real de tarefas no Firestore;
- Security Rules publicadas;
- isolamento entre dois usuários reais;
- navegação Dia/Semana/Mês no navegador;
- criação de tarefa a partir de um dia do calendário;
- responsividade em tamanhos reais de tela;
- abertura de links externos;
- experiência visual e acessibilidade.

Esses testes são executados manualmente pelo proprietário no VS Code/Firebase.

## Build

O build de produção atual é concluído com sucesso.

Na validação registrada:

```text
CSS: 23.89 kB
JS:  854.07 kB minificado
JS:  254.60 kB gzip
```

### Aviso atual

O Vite informa que o chunk JavaScript principal supera 500 kB após minificação.

Esse aviso:

- não falha o build;
- não impede o funcionamento;
- não é prioridade para o MVP atual.

Otimizações futuras possíveis:

- lazy loading de rotas;
- code splitting;
- carregamento sob demanda de módulos Firebase;
- análise do bundle.

## GitHub Actions

As actions oficiais foram atualizadas para versões atuais:

```text
actions/checkout@v7
actions/setup-node@v7
```

Isso remove a dependência das versões antigas do runtime das actions.

## Regra

Uma branch com mudança funcional deve, no mínimo, ter:

```text
npm test        ✅
npm run lint    ✅
npm run build   ✅
```

antes de ser considerada tecnicamente pronta para validação manual e Pull Request.
