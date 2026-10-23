# Sustune Care – API
    python -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    cp .env.example .env   # set SECRET_KEY + admin password
    uvicorn app.main:app --reload
Docs: http://localhost:8000/docs
Seeded logins: admin@sustunecare.com / (ADMIN_PASSWORD), demo@sustunecare.com / demo1234
