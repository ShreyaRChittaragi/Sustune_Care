import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .models import User, Property, Parent, Vital, Appointment
from .security import hash_password

def seed(db: Session):
    if db.query(User).count():
        return
    db.add(User(email=os.getenv("ADMIN_EMAIL", "admin@sustunecare.com"), name="Sustune Admin", role="admin",
                password_hash=hash_password(os.getenv("ADMIN_PASSWORD", "ChangeMe123!"))))
    demo = User(email="demo@sustunecare.com", name="Ananya Sengupta", role="client", country="USA",
                password_hash=hash_password("demo1234"))
    db.add(demo); db.flush()
    db.add_all([
        Property(user_id=demo.id, name="Whitefield 3BHK Apartment", city="Bengaluru", monthly_rent_inr=65000,
                 tenant="Corporate tenant (verified)", rent_status="Escrowed – payout on 5th", last_inspection="2026-09-28", inspection_score=96),
        Property(user_id=demo.id, name="Indiranagar 2BHK", city="Bengaluru", monthly_rent_inr=48000,
                 tenant="Vacant – 3 viewings scheduled", rent_status="Awaiting tenant", last_inspection="2026-09-28", inspection_score=91),
    ])
    mom = Parent(user_id=demo.id, name="Lakshmi Sengupta", age=71, city="Bengaluru", companion="Sister Mary")
    db.add(mom); db.flush()
    now = datetime.utcnow()
    for i, (s, d, p, o, g) in enumerate([(128, 82, 74, 98, 112), (134, 86, 78, 97, 126), (126, 80, 72, 98, 108)]):
        db.add(Vital(parent_id=mom.id, recorded_at=now - timedelta(days=14 * (i + 1)), bp_sys=s, bp_dia=d, pulse=p, spo2=o, sugar=g,
                     note="Routine bi-weekly home screening"))
    db.add_all([
        Appointment(parent_id=mom.id, doctor="Dr. R. Menon", hospital="Manipal Hospital, Old Airport Rd", when=now + timedelta(days=6),
                    summary="Quarterly cardiology review"),
        Appointment(parent_id=mom.id, doctor="Dr. S. Iyer", hospital="Apollo, Bannerghatta Rd", when=now - timedelta(days=20),
                    status="completed", summary="BP stable. Continue current medication. Repeat lipid panel in 3 months."),
    ])
    db.commit()
