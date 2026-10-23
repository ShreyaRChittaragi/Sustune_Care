import os
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db, SessionLocal
from . import models, schemas, notify
from .pricing import build_quote
from .security import verify_password, make_token, current_user, admin_only
from .seed import seed

Base.metadata.create_all(engine)
with SessionLocal() as _db:
    seed(_db)

app = FastAPI(title="Sustune Care API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/api/health")
def health():
    return {"status": "ok"}

# ---------- public ----------
@app.post("/api/quote")
def quote(q: schemas.QuoteIn):
    return build_quote(q.city, q.aegis, q.sparsh, q.monthly_rent_inr, q.sparsh_tier, q.currency)

@app.post("/api/leads", response_model=schemas.LeadOut, status_code=201)
def create_lead(body: schemas.LeadIn, bg: BackgroundTasks, db: Session = Depends(get_db)):
    lead = models.Lead(**body.model_dump())
    db.add(lead); db.commit(); db.refresh(lead)
    bg.add_task(notify.new_lead, lead)
    return lead

# ---------- auth ----------
@app.post("/api/auth/login")
def login(body: schemas.LoginIn, db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(email=body.email.lower()).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(401, "Incorrect email or password")
    return {"token": make_token(user), "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}}

@app.get("/api/auth/me")
def me(user: models.User = Depends(current_user)):
    return {"id": user.id, "name": user.name, "email": user.email, "role": user.role}

# ---------- portal ----------
def _portal(user: models.User):
    return {
        "client": {"name": user.name, "country": user.country},
        "properties": [{"id": p.id, "name": p.name, "city": p.city, "monthly_rent_inr": p.monthly_rent_inr, "tenant": p.tenant,
                        "rent_status": p.rent_status, "last_inspection": p.last_inspection, "inspection_score": p.inspection_score}
                       for p in user.properties],
        "parents": [{
            "id": pr.id, "name": pr.name, "age": pr.age, "city": pr.city, "companion": pr.companion,
            "vitals": [{"recorded_at": v.recorded_at.isoformat(), "bp": f"{v.bp_sys}/{v.bp_dia}", "pulse": v.pulse, "spo2": v.spo2,
                        "sugar": v.sugar, "note": v.note} for v in pr.vitals[:10]],
            "appointments": [{"id": a.id, "doctor": a.doctor, "hospital": a.hospital, "when": a.when.isoformat(),
                              "status": a.status, "summary": a.summary} for a in pr.appointments[:10]],
        } for pr in user.parents],
    }

@app.get("/api/portal/demo")
def portal_demo(db: Session = Depends(get_db)):
    demo = db.query(models.User).filter_by(email="demo@sustunecare.com").first()
    if not demo:
        raise HTTPException(404, "Demo not available")
    return _portal(demo)

@app.get("/api/portal/me")
def portal_me(user: models.User = Depends(current_user)):
    return _portal(user)

# ---------- admin ----------
@app.get("/api/admin/leads", response_model=list[schemas.LeadOut])
def list_leads(status: str | None = None, db: Session = Depends(get_db), _: models.User = Depends(admin_only)):
    q = db.query(models.Lead).order_by(models.Lead.created_at.desc())
    return q.filter_by(status=status).all() if status else q.all()

@app.patch("/api/admin/leads/{lead_id}", response_model=schemas.LeadOut)
def update_lead(lead_id: int, body: schemas.LeadStatus, db: Session = Depends(get_db), _: models.User = Depends(admin_only)):
    lead = db.get(models.Lead, lead_id)
    if not lead:
        raise HTTPException(404, "Lead not found")
    lead.status = body.status; db.commit(); db.refresh(lead)
    return lead

@app.get("/api/admin/clients")
def list_clients(db: Session = Depends(get_db), _: models.User = Depends(admin_only)):
    return [{"id": u.id, "name": u.name, "email": u.email, "parents": [{"id": p.id, "name": p.name} for p in u.parents]}
            for u in db.query(models.User).filter_by(role="client").all()]

@app.post("/api/admin/parents/{parent_id}/vitals", status_code=201)
def add_vital(parent_id: int, body: schemas.VitalIn, db: Session = Depends(get_db), _: models.User = Depends(admin_only)):
    if not db.get(models.Parent, parent_id):
        raise HTTPException(404, "Parent not found")
    db.add(models.Vital(parent_id=parent_id, **body.model_dump())); db.commit()
    return {"ok": True}

@app.post("/api/admin/parents/{parent_id}/appointments", status_code=201)
def add_appointment(parent_id: int, body: schemas.AppointmentIn, db: Session = Depends(get_db), _: models.User = Depends(admin_only)):
    if not db.get(models.Parent, parent_id):
        raise HTTPException(404, "Parent not found")
    db.add(models.Appointment(parent_id=parent_id, **body.model_dump())); db.commit()
    return {"ok": True}
