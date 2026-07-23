# Pioneer Enterprises API

Express, TypeScript, Prisma, and PostgreSQL backend for the Pioneer Enterprises website, division apps, customer portal, and admin panel.

## Local setup

1. Copy `server/.env.example` to `server/.env`.
2. Set `DATABASE_URL`, `JWT_SECRET`, and `CLIENT_ORIGIN`.
3. From the repository root, run:

```bash
npm run api:install
npm run api:generate
npm run api:migrate
npm run api:dev
```

The API defaults to `http://localhost:4000`.

## Database migrations and tests

Apply the checked-in migrations before starting the API:

```bash
npm run prisma:deploy
```

The integration suite requires a disposable PostgreSQL database. Set
`DATABASE_URL` to that database, apply the migrations, and run:

```bash
npm test
```

The backend CI workflow provisions PostgreSQL and performs these steps automatically.

## Current endpoints

- `GET /health`
- `GET /ready` (includes database connectivity)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/public/quotes`
- `POST /api/public/service-requests`

## Frontend configuration

Set the frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:4000
```

The shared frontend API client is located at `src/services/api`.

## Deployment

The backend is isolated under `server/`, so it can be deployed independently from the Vite frontend. Before production deployment:

- provision PostgreSQL;
- set all environment variables;
- run `npm run prisma:deploy` during deployment;
- replace the local frontend API URL with the deployed backend URL;
- restrict `CLIENT_ORIGIN` to the production website origin;
- use a long randomly generated `JWT_SECRET`.

The API emits JSON request logs with an `X-Request-Id` correlation value. Baseline
security headers and separate API, authentication, and public-submission rate
limits are enabled by default. Render uses `/ready` so a deployment is considered
healthy only when PostgreSQL is reachable.
