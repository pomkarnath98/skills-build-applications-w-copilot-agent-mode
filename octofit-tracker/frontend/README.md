# OctoFit Tracker presentation tier

The frontend uses React 19, Vite, React Router, and Bootstrap.

## Configure the API URL

In GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local`. Vite exposes only variables prefixed
with `VITE_` to browser code.

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Replace `your-codespace-name` with the value of the Codespaces
`CODESPACE_NAME` environment variable. The frontend builds its API URL as
`https://${VITE_CODESPACE_NAME}-8000.app.github.dev`. Restart the Vite server
after changing `.env.local`.

If `VITE_CODESPACE_NAME` is unset, the frontend uses
`http://localhost:8000`. Ensure the Express API is running on port `8000` for
local development.

## Development

Start Vite on port `5173`:

```bash
npm --prefix octofit-tracker/frontend run dev
```

Build and lint:

```bash
npm --prefix octofit-tracker/frontend run build
npm --prefix octofit-tracker/frontend run lint
```
