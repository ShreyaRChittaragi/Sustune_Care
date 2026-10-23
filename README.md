# Sustune Care – Full Stack (FastAPI + React)

## Run
**Backend**
    cd backend && python -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt && cp .env.example .env
    uvicorn app.main:app --reload        # http://localhost:8000/docs

**Frontend**
    cd frontend && npm install && npm run dev   # http://localhost:5173 (proxies /api to :8000)

## Logins (seeded on first run)
- Admin: admin@sustunecare.com / value of ADMIN_PASSWORD in .env  → /admin
- Demo client: demo@sustunecare.com / demo1234 → /portal  (public demo at /portal/demo)

## API
| Method | Path | Auth |
|---|---|---|
| POST | /api/leads | public – consultation booking, triggers email/WhatsApp notify |
| POST | /api/quote | public – estimator |
| POST | /api/auth/login, GET /api/auth/me | – |
| GET | /api/portal/me, /api/portal/demo | client / public |
| GET/PATCH | /api/admin/leads | admin |
| POST | /api/admin/parents/{id}/vitals, /appointments | admin |

## Before production
Set a strong SECRET_KEY, switch DATABASE_URL to Postgres, and add HTTPS, rate limiting, and audit logging for health data.
