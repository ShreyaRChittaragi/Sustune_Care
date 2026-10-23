from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class LeadIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = ""
    country: str = ""
    interest: str = "both"
    city: str = ""
    preferred_slot: str = ""
    message: str = ""
    quote_monthly_usd: float | None = None

class LeadOut(LeadIn):
    id: int
    status: str
    created_at: datetime
    model_config = {"from_attributes": True}

class LeadStatus(BaseModel):
    status: str = Field(pattern="^(new|contacted|scheduled|won|lost)$")

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class QuoteIn(BaseModel):
    city: str = "Bengaluru"
    aegis: bool = True
    sparsh: bool = True
    monthly_rent_inr: int = 65000
    sparsh_tier: str = "comprehensive"  # essential|comprehensive|full
    currency: str = "USD"

class VitalIn(BaseModel):
    bp_sys: int = Field(ge=60, le=260)
    bp_dia: int = Field(ge=30, le=160)
    pulse: int = Field(ge=20, le=220)
    spo2: int = Field(ge=50, le=100)
    sugar: int | None = None
    note: str = ""

class AppointmentIn(BaseModel):
    doctor: str
    hospital: str
    when: datetime
    status: str = "scheduled"
    summary: str = ""
