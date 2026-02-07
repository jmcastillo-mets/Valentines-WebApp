Deployment guide

Goal: Host frontend on Vercel and backend logging server on Render (or another Node host).

Backend (Render) — quick steps:

1. Push repo to GitHub (if not already).
2. Create a new Web Service on Render (https://render.com/new/service).
   - Connect your GitHub repo and select the `main` branch.
   - Build Command: leave empty or `npm install`.
   - Start Command: `npm start`
   - Environment: Node 18+ recommended.
3. Render will detect `package.json` and run `npm start` to run `server.js`.
4. After deploy you will have a URL like `https://my-logger.onrender.com`.

Render environment variables (set these in the Render service settings):

- `NOTIFY_EMAIL` (required) — the email address to receive notifications.
- `SMTP_HOST` (required for email) — e.g. `smtp.sendgrid.net` or your provider.
- `SMTP_PORT` (optional) — default `587`.
- `SMTP_SECURE` (optional) — set to `true` for port `465`, otherwise `false`.
- `SMTP_USER` (optional) — SMTP username (if required).
- `SMTP_PASS` (optional) — SMTP password (if required).
- `SMTP_FROM` (optional) — `From:` address for notification emails.

Example (Render UI):
- Key: `NOTIFY_EMAIL`  Value: `yourname@example.com`
- Key: `SMTP_HOST`     Value: `smtp.sendgrid.net`
- Key: `SMTP_PORT`     Value: `587`
- Key: `SMTP_USER`     Value: `apikey` (for SendGrid)
- Key: `SMTP_PASS`     Value: `<your-sendgrid-api-key>`

Important: Render will run `npm install` during deploy and will install `nodemailer` from `package.json`.

Frontend (Vercel) — quick steps:

1. In Vercel, import the same GitHub repo and deploy the project.
2. In Vercel project settings, add an Environment Variable:
   - Key: `VITE_LOG_URL`
   - Value: `https://my-logger.onrender.com` (your backend URL)
3. Deploy. Vercel will build the site using Vite and expose the frontend.

Notes & tips:
- The frontend fetch to log interactions uses `import.meta.env.VITE_LOG_URL`.
  If not set, it defaults to `http://localhost:3001` for local dev.
- CORS: `server.js` enables CORS for all origins by default. For production lock
  it down to your Vercel domain for extra security.
- If you want persistent logs in a managed DB, update `server.js` to write to
  a database (Supabase/Postgres) instead of a local JSON file.

Commands to test locally:

Run server:
```bash
npm run server
```

Run frontend dev:
```bash
npm run dev
```

Run both (dev environment):
```bash
npm run dev:all
```

Viewing logs:
- The log file saved locally is `interaction_log.json` at the repo root.
- The backend exposes `/api/logs` to retrieve logs.

If you'd like, I can:
- Convert `server.js` to use a small Postgres DB on Render or Supabase.
- Create a Vercel serverless `api/log` function instead and move logs to Vercel KV or Supabase.

