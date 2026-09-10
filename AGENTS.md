# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.

## Backend (Express + Prisma + MySQL)

The `server/` directory contains the full-stack API (Express + TypeScript + Prisma + MySQL). The frontend talks to it via the Vite dev proxy (`/api` → `http://localhost:4000`).

### Requirements & setup

1. Start the database (Docker required):
   - `docker compose up -d` — runs MySQL 8 on host port `3307` (mapped from container `3306`).
2. Configure `server/.env` (copy from `server/.env.example`). The app DB user needs full privileges so Prisma can create its shadow database; the compose container grants this on first run via the compose `mysql` entrypoint.
3. Install & migrate:
   - `cd server && npm install`
   - `npx prisma migrate dev` (creates schema) and `npx prisma db seed` (seeds the 6 listings).
4. Run the API: `cd server && npm run dev` (port `4000`).

### Environment variables

- Server (`server/.env`): `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`, `FRONTEND_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `PORT`.
- Client (root `.env`, `VITE_`-prefixed): `VITE_API_URL` (default `/api`), `VITE_PAYSTACK_PUBLIC_KEY`.

### API surface

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
- Listings: `GET /api/listings` (query `q`, `city`, `type`, `availability`), `GET /api/listings/:id`.
- Bookings (JWT): `POST /api/bookings`, `GET /api/bookings`, `GET /api/bookings/:id`.
- Payments (JWT): `POST /api/payments/initialize`, `POST /api/payments/verify`.
- Webhook: `POST /api/webhooks/paystack` (HMAC-SHA512 verified, no auth).
- Contact: `POST /api/contact`.
- Health: `GET /api/health`.

### Paystack & email notes

- Paystack amounts are in kobo (naira × 100). Test card: `4084 0840 8408 4081`, any future expiry, CVV `000`, PIN `1234`.
- Email uses Nodemailer SMTP. When `SMTP_USER` is empty the server logs `[email:mock]` instead of sending — use Ethereal/Mailtrap for development.
