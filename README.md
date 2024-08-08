<a href="https://linked-forge-ai.vercel.app">
  <img src="/public/landing/linked6.png">
  <h1 align="center">🤖 Linked Forge AI</h1>
</a>

### 📚 Overview
<p>
 This platform allows you to design and deploy AI-powered chatbots that can be easily embedded as widgets on any website.
</p>

### ✨ Features:

- 🛠️ Custom AI Chatbots: Create and customize AI-driven chatbots tailored to your specific needs.
- 🌐 Embeddable Widget: Easily embed your chatbot on any website with a simple snippet of code.
- 🧪 Playground for Testing: Test and interact with the chatbot you’ve created in a dedicated playground environment.
- 🔒 Secure Authentication: Integrates NextAuth V4 for secure user authentication.

### 🛠 Tech Stack:
- ⚛️ Next.js: React-based framework for building server-side rendered and statically generated web applications.
- 📋 Prisma: An ORM for managing and interacting with the database.
- 🐚 CockroachDB: A distributed SQL database designed for high availability and horizontal scalability.
- 🔑 NextAuth V4: A complete solution for authentication in Next.js applications.
- 🚀 Vercel: Deployment and hosting platform optimized for Next.js applications.

### Customize and prompt your bot assistant
<img src="/public/landing/linked3.png">

### Test your bot with the playground functionality
<img src="/public/landing/pg.png">


### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/DracoR22/Linked_Forge
```

### Install packages

```shell
npm install
```

### Setup .env file

```js
DATABASE_URL=

ACTIVATION_SECRET=
RESET_PASSWORD_SECRET=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email
SMTP_PASSWORD=password

OPENAI_API_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=https://linkedforgeai.com

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `pnpm [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |