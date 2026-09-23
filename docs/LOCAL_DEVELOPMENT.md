# Desenvolvimento local e VS Code

Este guia permite trabalhar no PORTOTYPE "0" manualmente em qualquer computador usando Git + VS Code.

## Pré-requisitos

Instale:

- Git;
- Node.js 22.12 ou superior;
- VS Code.

## Clonar o projeto

No terminal:

```bash
git clone https://github.com/o-tedd/portotype-0.git
cd portotype-0
```

Abra no VS Code:

```bash
code .
```

## Escolher a branch

Para trabalhar na versão principal:

```bash
git switch main
git pull
```

Para trabalhar na autenticação enquanto ela ainda não estiver na `main`:

```bash
git fetch origin
git switch feat/firebase-auth
git pull
```

## Instalar dependências

```bash
npm install
```

## Criar o arquivo de ambiente

O arquivo real do Firebase não é versionado.

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

No Linux/macOS/Git Bash:

```bash
cp .env.example .env.local
```

Depois preencha `.env.local` com os dados da aplicação Web do Firebase.

## Executar o projeto

```bash
npm run dev
```

O Vite normalmente exibirá no terminal o endereço local do projeto.

## Validar antes de enviar alterações

```bash
npm run lint
npm run build
```

Os dois comandos devem terminar sem erro.

## Criar uma alteração manualmente

Antes de começar:

```bash
git switch main
git pull
git switch -c feat/minha-alteracao
```

Faça as alterações no VS Code.

Depois:

```bash
git status
git add .
git commit -m "feat: descreve a alteração"
git push -u origin feat/minha-alteracao
```

O Pull Request pode então ser aberto manualmente no GitHub.

## Continuar o trabalho em outro computador

No segundo computador:

```bash
git clone https://github.com/o-tedd/portotype-0.git
cd portotype-0
git fetch origin
git switch nome-da-branch
npm install
```

Depois crie novamente o `.env.local`.

O código viaja pelo GitHub. O arquivo `.env.local` não viaja porque não deve ser commitado.

## Atualizar uma branch existente

```bash
git switch nome-da-branch
git pull
```

Após editar:

```bash
git add .
git commit -m "tipo: descrição"
git push
```

## Extensões recomendadas do VS Code

Ao abrir o repositório, o VS Code poderá sugerir as extensões listadas em:

```text
.vscode/extensions.json
```

Principais:

- ESLint;
- Tailwind CSS IntelliSense;
- GitHub Pull Requests and Issues;
- GitLens.

## Configurações compartilhadas

O arquivo:

```text
.vscode/settings.json
```

contém somente preferências seguras e específicas do projeto, como ESLint ao salvar e uso do TypeScript instalado no projeto.

Configurações pessoais do editor não precisam ser versionadas.

## Trabalhar pela nuvem

O repositório também possui uma configuração opcional de Dev Container em:

```text
.devcontainer/devcontainer.json
```

Ela pode ser usada por VS Code Dev Containers e por ambientes compatíveis, como GitHub Codespaces, para criar um ambiente Node consistente sem configurar a máquina manualmente.

## Arquivos que nunca devem ir para o Git

Não versionar:

```text
.env
.env.local
service-account.json
private keys
tokens
senhas
node_modules/
dist/
```

Antes de qualquer `git push`, confira:

```bash
git status
```

## Fluxo recomendado

```text
GitHub
  ↓ clone / pull
VS Code
  ↓ editar
lint + build
  ↓
commit
  ↓
git push
  ↓
GitHub
  ↓
Pull Request manual
```
