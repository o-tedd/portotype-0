# Firebase Setup

Este guia configura o Firebase usado pelo MVP do PORTOTYPE "0".

## Serviços necessários

No Firebase Console, o projeto deve possuir:

- Firebase Authentication;
- Cloud Firestore.

Firebase Storage será integrado em um milestone posterior.

## 1. Registrar aplicação Web

No projeto Firebase, registre uma aplicação Web e copie os valores de configuração.

Crie localmente:

```text
.env.local
```

usando `.env.example` como modelo:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

O arquivo `.env.local` está ignorado pelo Git.

### Observação sobre segurança

A configuração Web do Firebase é entregue ao navegador durante a execução da aplicação e não deve ser tratada como uma credencial administrativa.

A segurança real dos dados depende principalmente de:

- Firebase Authentication;
- Firestore Security Rules;
- validação das operações.

Nunca exponha ou versione credenciais administrativas, como Service Account JSON, private keys ou tokens.

## 2. Habilitar autenticação por e-mail

No Firebase Console:

```text
Authentication
→ Sign-in method
→ Email/Password
→ Enable
```

Para o MVP, apenas e-mail e senha são necessários.

## 3. Criar Cloud Firestore

Crie o banco Firestore para o projeto.

A aplicação utiliza o documento:

```text
users/{uid}
```

para o perfil base e utilizará subcoleções por usuário:

```text
users/{uid}
├── tasks/{taskId}
├── sessions/{sessionId}
├── categories/{categoryId}
├── certificates/{certificateId}
└── achievements/{achievementId}
```

## 4. Security Rules

O repositório contém:

```text
firestore.rules
firebase.json
```

A regra inicial permite que um usuário autenticado acesse apenas documentos sob seu próprio UID.

Para publicar as regras com Firebase CLI:

```bash
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only firestore:rules
```

Selecione o projeto Firebase correto ao executar `firebase use --add`.

## 5. Executar localmente

```bash
npm install
npm run dev
```

## Fluxo de autenticação

```text
Login/Register Page
       ↓
AuthContext
       ↓
AuthService
       ↓
AuthRepository
       ↓
Firebase Authentication
```

Após autenticação:

```text
Firebase UID
     ↓
AuthService.getOrCreateProfile()
     ↓
UserRepository
     ↓
users/{uid}
```

## Limitação conhecida do MVP

O usuário autenticado ainda possui permissão de atualização sobre seu próprio perfil.

Isso significa que campos de gamificação, como XP e nível, ainda não são autoritativos no servidor.

Quando a gamificação se tornar funcional, operações sensíveis poderão migrar para backend próprio ou Cloud Functions para impedir manipulação direta pelo cliente.
