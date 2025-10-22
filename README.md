# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Running locally

Install dependencies: `npm install` in the project root

### Server proxy for OpenAI (do NOT expose your API key in the browser)

This project includes a small Express proxy in `server/` to keep your OpenAI API key on the server.

1. In `server/` copy `.env.example` to `.env` and paste your real key into `OPENAI_API_KEY`.

```bash
cd server
npm install
cp .env.example .env
# edit .env and set OPENAI_API_KEY=sk-...
npm start
```

2. Keep the server running while you use the frontend. The frontend now calls `/api/generate` which the server proxies to OpenAI.

Security note: never commit a file containing the real secret key into version control. Use `.env` locally and environment variables in deployed environments.

To run the frontend after the server is running:

```bash
# in project root
npm install
npm run dev
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
