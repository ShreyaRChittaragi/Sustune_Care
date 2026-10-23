import { useState } from 'react'

const carePlans = {
  companion: { title: 'Standard Supported Living Package', hours: '10 – 20 Hours / Week', desc: 'Ideal for older adults desiring to remain safe at home with meal prep, medicine prompts, transport to appointments, and daily social wellness.', features: '• Certified Support Worker • Bi-weekly clinical log • Zero long-term lock-in' },
  rehab: { title: 'Post-Acute Hospital Reablement Program', hours: '25 – 40 Hours / Week', desc: 'Structured transitional care following surgical procedures or fractures. Focuses on physical reconditioning, wound inspection, and reducing hospital re-admission risk.', features: '• Clinical RN Oversight • Coordinated Physio Exercise • Medication Titration' },
  livein: { title: '24/7 Dedicated Live-In Sanctuary Care', hours: 'Continuous Round-The-Clock', desc: 'A carefully matched resident care specialist residing in the home. Provides constant peace of mind for clients with advanced dementia or significant mobility needs.', features: '• Dedicated Caregiver Pair • 24/7 On-Call Escalation • Full Domestic & Health Support' }
}

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [careOption, setCareOption] = useState('companion')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('General Clinical Consultation')
  const [openFaq, setOpenFaq] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen(value => !value)
  const selectCareOption = key => setCareOption(key)
  const openModal = (service) => { if (service) setSelectedService(service); setFormSubmitted(false); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setFormSubmitted(false); setSelectedService('General Clinical Consultation') }
  const openModalWithPlan = () => { const title = carePlans[careOption].title; openModal(title.includes('Reablement') ? 'Post-Acute & Reablement' : title.includes('Live-In') ? 'Complex Live-In Care' : 'Domiciliary & Personal Care') }
  const toggleFaq = id => setOpenFaq(current => current === id ? null : id)
  const submitForm = event => { event.preventDefault(); setFormSubmitted(true) }
  return (
    <>
  <aside aria-label="Announcement" className="bg-sustune-navy text-white text-xs py-2 px-4 border-b border-sustune-gold/30">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sustune-gold/20 text-sustune-gold border border-sustune-gold/40">
          CLINICAL GOVERNANCE
        </span>
        <span className="text-slate-200">ISO 9001 &amp; CQC Compliant Healthcare Services</span>
      </div>
      <div className="flex items-center gap-4 text-slate-300">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-sustune-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"/>
          </svg>
          24/7 Careline: <strong>+1 (555) 019-CARE</strong>
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <span className="hidden md:inline text-slate-300">Domain: www.sustunecare.com</span>
      </div>
    </div>
  </aside>

  
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        
        
        <a href="#home" className="flex items-center group shrink-0" aria-label="Sustune Care home">
          <img src="/assets/sustune_logo_horizontal_lockup.svg"
               alt="Sustune Care — Protected Care. Sustained Dignity."
               className="w-[190px] sm:w-[230px] h-auto max-h-14 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
               fetchPriority="high" />
        </a>

        
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-700">
          <a href="#services" className="hover:text-sustune-cerulean transition-colors duration-150">Services</a>
          <a href="#pillars" className="hover:text-sustune-cerulean transition-colors duration-150">Our Four Pillars</a>
          <a href="#care-selector" className="hover:text-sustune-cerulean transition-colors duration-150">Care Assessment</a>
          <a href="#governance" className="hover:text-sustune-cerulean transition-colors duration-150">Clinical Governance</a>
          <a href="#faq" className="hover:text-sustune-cerulean transition-colors duration-150">FAQ</a>
        </nav>

        
        <div className="hidden sm:flex items-center gap-3">
          <a href="tel:+15550192834" className="inline-flex items-center px-4 py-2 text-xs font-semibold text-sustune-navy border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
            Clinician Portal
          </a>
          <button onClick={() => openModal()} className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-white bg-sustune-cerulean hover:bg-sustune-navy rounded-md shadow-sm transition-all duration-200">
            Request Assessment
          </button>
        </div>

        
        <button id="mobileMenuBtn" aria-label="Toggle Navigation Menu" className="lg:hidden p-2 text-slate-700 hover:text-sustune-cerulean rounded-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>

      </div>
    </div>

    
    <div id="mobileDrawer" className={`${mobileMenuOpen ? '' : 'hidden'} lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-lg`}>
      <nav className="flex flex-col space-y-3 font-medium text-slate-700 text-sm">
        <a href="#services" onClick={toggleMobileMenu} className="hover:text-sustune-cerulean py-1">Services</a>
        <a href="#pillars" onClick={toggleMobileMenu} className="hover:text-sustune-cerulean py-1">Our Four Pillars</a>
        <a href="#care-selector" onClick={toggleMobileMenu} className="hover:text-sustune-cerulean py-1">Care Assessment</a>
        <a href="#governance" onClick={toggleMobileMenu} className="hover:text-sustune-cerulean py-1">Clinical Governance</a>
        <a href="#faq" onClick={toggleMobileMenu} className="hover:text-sustune-cerulean py-1">FAQ</a>
      </nav>
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
        <button onClick={() => { openModal(); toggleMobileMenu(); }} className="w-full text-center py-2.5 text-sm font-bold text-white bg-sustune-cerulean rounded-md">
          Request Free Care Consultation
        </button>
      </div>
    </div>
  </header>

  
  <section id="home" className="relative hero-radial-bg py-16 lg:py-24 border-b border-slate-200 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sustune-gold-light border border-sustune-gold/40 text-sustune-gold-deep text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-sustune-gold animate-pulse"></span>
            Gold-Standard Domiciliary &amp; Supported Care
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-sustune-navy leading-[1.15]">
            Protected Care. <br />
            <span className="text-sustune-cerulean">Sustained Dignity</span> In Your Own Home.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Sustune Care unites clinical rigor with genuine human warmth. Governed by ethical sustainability and individualized care models, we ensure individuals retain comfort, safety, and personal independence.
          </p>

          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button onClick={() => openModal()} className="px-7 py-3.5 text-sm font-bold text-white bg-sustune-cerulean hover:bg-sustune-navy rounded-md shadow-md transition-all duration-200 text-center">
              Schedule Home Assessment
            </button>
            <a href="#services" className="px-7 py-3.5 text-sm font-bold text-sustune-navy border-2 border-sustune-gold hover:bg-sustune-gold hover:text-white rounded-md transition-all duration-200 text-center">
              Explore Care Packages
            </a>
          </div>

          
          <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
            <div>
              <div className="font-display font-extrabold text-2xl text-sustune-navy">100%</div>
              <div className="text-xs text-slate-500 font-medium">Verified Carers</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-sustune-emerald">ISO 9001</div>
              <div className="text-xs text-slate-500 font-medium">Quality Certified</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-sustune-gold">Zero-Waste</div>
              <div className="text-xs text-slate-500 font-medium">Eco Protocol</div>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md bg-white rounded-2xl p-8 shadow-subtle-card border border-slate-200 text-center space-y-6">
            
            
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-sustune-gold/20 via-sustune-cerulean/20 to-sustune-emerald/20 rounded-full blur-lg opacity-70"></div>
              <img src="/assets/sustune_emblem_standalone.svg" 
                   alt="Sustune Care Heraldic Insignia" 
                   className="relative h-44 w-auto mx-auto drop-shadow-md" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl text-sustune-navy">
                The Sustune Care Assurance
              </h2>
              <p className="text-xs text-slate-600 px-4 leading-relaxed">
                Sheltered under our protective shield, uplifted by dedicated hands, and guided by medical and environmental standards.
              </p>
            </div>

            
            <div className="bg-sustune-mist rounded-xl p-4 text-left border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-sustune-navy">
                <span>Clinical Triage Ready</span>
                <span className="inline-flex items-center text-sustune-emerald gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Active 24/7
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Care plans calibrated weekly with designated nurse oversight and family transparency reports.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  
  <section id="pillars" className="py-20 bg-white border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-sustune-gold">Our Foundation</span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-sustune-navy">
          Built Upon Proven Clinical Architecture
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Every aspect of Sustune Care reflects the four geometric symbols embedded in our identity mark.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-sustune-gold/60 transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-lg bg-sustune-gold-light border border-sustune-gold/30 flex items-center justify-center text-sustune-gold font-bold mb-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 className="font-display font-bold text-lg text-sustune-navy mb-2">Protected Governance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rigorous clinical safety boundaries, verified background assessments, and continual healthcare monitoring that protects clients from neglect.
          </p>
        </div>

        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-sustune-cerulean/60 transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sustune-cerulean font-bold mb-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <h3 className="font-display font-bold text-lg text-sustune-navy mb-2">Home Comfort &amp; Shelter</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Healthcare designed around your familiar routine. We integrate advanced clinical aid directly into your domestic residence without disruption.
          </p>
        </div>

        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-sustune-emerald/60 transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-sustune-emerald font-bold mb-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 className="font-display font-bold text-lg text-sustune-navy mb-2">Sustainable Vitality</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Continuous recovery driven by green logistics, zero-waste clinical disposables, and progressive physical rehabilitation milestones.
          </p>
        </div>

        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-sustune-navy/60 transition-all duration-200 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-sustune-navy font-bold mb-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h3 className="font-display font-bold text-lg text-sustune-navy mb-2">Empathetic Hands</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unconditional human dignity at the bedside. Every caregiver is selected for compassion, emotional intelligence, and attentive listening.
          </p>
        </div>

      </div>

    </div>
  </section>

  
  <section id="services" className="py-20 bg-sustune-mist/60 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-sustune-cerulean">Clinical Services</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-sustune-navy">
            Tailored Care Pathways For Every Stage of Recovery
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-4 md:mt-0">
          All care plans are calibrated under Registered Nurse (RN) supervision and mapped to personal comfort requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="p-6 space-y-4">
            <div className="inline-block px-2.5 py-1 rounded bg-sky-100 text-sustune-cerulean font-bold text-[11px] tracking-wide uppercase">
              Daily Living
            </div>
            <h3 className="font-display font-bold text-xl text-sustune-navy">
              Domiciliary &amp; Personal Care
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assistance with daily living activities, hygiene, medication management, nutritional meals, and companionship within the familiarity of home.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Morning and evening routines
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Prescription &amp; dosage adherence
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Dignified hygiene &amp; mobility assistance
              </li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button onClick={() => openModal('Domiciliary & Personal Care')} className="w-full text-center py-2.5 px-4 text-xs font-bold text-sustune-cerulean border border-sustune-cerulean hover:bg-sustune-cerulean hover:text-white rounded-md transition-colors">
              Book Home Assessment
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-xl overflow-hidden border-2 border-sustune-gold shadow-md flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 bg-sustune-gold text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg tracking-wider">
            HIGH DEMAND
          </div>
          <div className="p-6 space-y-4">
            <div className="inline-block px-2.5 py-1 rounded bg-amber-100 text-sustune-gold-deep font-bold text-[11px] tracking-wide uppercase">
              Specialized
            </div>
            <h3 className="font-display font-bold text-xl text-sustune-navy">
              Post-Acute &amp; Reablement
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeted post-surgical rehabilitation and transitional support to restore independence rapidly and reduce preventable hospital re-admissions.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Coordinated physical therapy exercises
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Wound care &amp; vitals tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Hospital-to-home transitional bridge
              </li>
            </ul>
          </div>
          <div className="p-6 bg-amber-50/50 border-t border-slate-100">
            <button onClick={() => openModal('Post-Acute & Reablement')} className="w-full text-center py-2.5 px-4 text-xs font-bold text-white bg-sustune-gold hover:bg-sustune-gold-deep rounded-md shadow-sm transition-colors">
              Inquire Reablement Plan
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="p-6 space-y-4">
            <div className="inline-block px-2.5 py-1 rounded bg-emerald-100 text-sustune-emerald-dark font-bold text-[11px] tracking-wide uppercase">
              Continuous
            </div>
            <h3 className="font-display font-bold text-xl text-sustune-navy">
              Complex Live-In Care
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              24-hour dedicated clinical companionship for neurological conditions, advanced dementia care, or high-dependency mobility requirements.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Dedicated full-time matching caregiver
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> Specialized memory &amp; sensory engagement
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sustune-emerald font-bold">✓</span> 24/7 on-call clinical triage escalation
              </li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button onClick={() => openModal('Complex Live-In Care')} className="w-full text-center py-2.5 px-4 text-xs font-bold text-sustune-emerald border border-sustune-emerald hover:bg-sustune-emerald hover:text-white rounded-md transition-colors">
              Request Live-In Pricing
            </button>
          </div>
        </div>

      </div>

    </div>
  </section>

  
  <section id="care-selector" className="py-20 bg-white border-b border-slate-200">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="bg-sustune-navy rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <img src="/assets/sustune_emblem_standalone.svg" alt="" className="w-80 h-auto" />
        </div>

        <div className="max-w-2xl space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sustune-gold">Self-Assessment Tool</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
            Calculate Recommended Care Level
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Select the primary scenario to view recommended weekly coverage hours and service structure.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <button onClick={() => selectCareOption('companion')} id="btn-companion" className={`py-3 px-4 rounded-lg text-left text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-all ${careOption === 'companion' ? 'border-sustune-gold bg-white/15' : ''}`}>
            1. Companionship &amp; Chores
          </button>
          <button onClick={() => selectCareOption('rehab')} id="btn-rehab" className={`py-3 px-4 rounded-lg text-left text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-all ${careOption === 'rehab' ? 'border-sustune-gold bg-white/15' : ''}`}>
            2. Post-Hospital Rehab
          </button>
          <button onClick={() => selectCareOption('livein')} id="btn-livein" className={`py-3 px-4 rounded-lg text-left text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-all ${careOption === 'livein' ? 'border-sustune-gold bg-white/15' : ''}`}>
            3. Round-The-Clock Support
          </button>
        </div>

        
        <div id="care-result" className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/15 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-sustune-gold uppercase font-bold tracking-wider">Recommended Pathway</span>
              <h3 id="plan-title" className="text-lg font-bold">{carePlans[careOption].title}</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-300">Target Coverage:</span>
              <div id="plan-hours" className="text-base font-extrabold text-white">{carePlans[careOption].hours}</div>
            </div>
          </div>
          <p id="plan-desc" className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Ideal for older adults desiring to remain safe at home with meal prep, medicine prompts, transport to appointments, and daily social wellness.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div id="plan-features" className="text-[11px] text-slate-300 space-x-3">
              <span>• Certified Support Worker</span>
              <span>• Bi-weekly clinical log</span>
              <span>• Zero long-term lock-in</span>
            </div>
            <button onClick={openModalWithPlan} className="px-5 py-2 text-xs font-bold bg-sustune-gold hover:bg-amber-400 text-sustune-navy rounded-md transition-colors">
              Request Detailed Proposal
            </button>
          </div>
        </div>

      </div>

    </div>
  </section>

  
  <section id="governance" className="py-20 bg-white border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sustune-gold">Safety &amp; Compliance</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-sustune-navy">
            Clinical Governance That Leaves Nothing to Chance
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike informal registry agencies, Sustune Care operates under strict medical oversight. Every clinical protocol is validated against evidence-based care parameters and jurisdictional quality commissions.
          </p>

          <div className="space-y-4 pt-2">
            
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-sustune-emerald flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-sustune-navy">Continuous Background &amp; Competency Vetting</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-tier reference checks, enhanced criminal record verification, and continuous hands-on practical testing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-sustune-emerald flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-sustune-navy">Real-Time Electronic Medication Logs (eMAR)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Digital timestamp verification for every dose administered, accessible to designated family members in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-sustune-emerald flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-sustune-navy">Carbon-Neutral &amp; Zero Single-Use Waste Protocols</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Eco-friendly care supplies and localized caregiver routing to minimize transit emissions and environmental footprint.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
          <h3 className="font-display font-bold text-base text-sustune-navy">
            Accreditation &amp; Audit Specifications
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-sustune-gold uppercase">Standard 1</div>
              <div className="text-sm font-bold text-sustune-navy mt-1">ISO 9001:2015</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Quality Management Verified</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-sustune-cerulean uppercase">Standard 2</div>
              <div className="text-sm font-bold text-sustune-navy mt-1">Data Protection</div>
              <div className="text-[11px] text-slate-500 mt-0.5">HIPAA &amp; GDPR Compliant</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-sustune-emerald uppercase">Standard 3</div>
              <div className="text-sm font-bold text-sustune-navy mt-1">FSC Certified</div>
              <div className="text-[11px] text-slate-500 mt-0.5">100% Sustainable Collateral</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-sustune-navy uppercase">Standard 4</div>
              <div className="text-sm font-bold text-sustune-navy mt-1">Clinical Audit</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Monthly Independent Reviews</div>
            </div>
          </div>

          <div className="bg-sustune-mist rounded-lg p-4 border border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-600">
              Need proof of registration for insurance claims?
            </div>
            <a href="mailto:compliance@sustunecare.com" className="text-xs font-bold text-sustune-cerulean hover:underline">
              Request Certificate
            </a>
          </div>
        </div>

      </div>

    </div>
  </section>

  
  <section id="faq" className="py-20 bg-sustune-mist/40 border-b border-slate-200">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center space-y-2 mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-sustune-cerulean">Clarity &amp; Reassurance</span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-sustune-navy">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        
        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
          <button onClick={() => toggleFaq(1)} className="w-full text-left p-5 font-display font-bold text-sm text-sustune-navy flex justify-between items-center">
            <span>How rapidly can care services commence in an urgent situation?</span>
            <span id="faq-icon-1" className="text-sustune-gold text-lg font-mono">{openFaq === 1 ? '−' : '+'}</span>
          </button>
          <div id="faq-content-1" className={`${openFaq === 1 ? '' : 'hidden'} px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3`}>
            In urgent circumstances—such as unexpected hospital discharge or caregiver illness—our emergency triage team can perform a rapid telehealth assessment and dispatch a qualified care practitioner within 24 to 48 hours.
          </div>
        </div>

        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
          <button onClick={() => toggleFaq(2)} className="w-full text-left p-5 font-display font-bold text-sm text-sustune-navy flex justify-between items-center">
            <span>Can family members monitor caregiver visits and care delivery?</span>
            <span id="faq-icon-2" className="text-sustune-gold text-lg font-mono">{openFaq === 2 ? '−' : '+'}</span>
          </button>
          <div id="faq-content-2" className={`${openFaq === 2 ? '' : 'hidden'} px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3`}>
            Yes. Families receive secure credentials to the Sustune Care Family Portal. You can verify caregiver arrival times, review daily notes, check hydration and nutrition logs, and view completed medication records in real time.
          </div>
        </div>

        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
          <button onClick={() => toggleFaq(3)} className="w-full text-left p-5 font-display font-bold text-sm text-sustune-navy flex justify-between items-center">
            <span>What makes Sustune Care an environmentally sustainable provider?</span>
            <span id="faq-icon-3" className="text-sustune-gold text-lg font-mono">{openFaq === 3 ? '−' : '+'}</span>
          </button>
          <div id="faq-content-3" className={`${openFaq === 3 ? '' : 'hidden'} px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3`}>
            We adhere to strict zero-waste procurement policies. All non-hazardous consumables are compostable or recyclable, stationery is 100% FSC-certified cotton/recycled paper, and travel schedules are route-optimized to minimize transit carbon emissions.
          </div>
        </div>

        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
          <button onClick={() => toggleFaq(4)} className="w-full text-left p-5 font-display font-bold text-sm text-sustune-navy flex justify-between items-center">
            <span>Are your caregivers directly employed or independent contractors?</span>
            <span id="faq-icon-4" className="text-sustune-gold text-lg font-mono">{openFaq === 4 ? '−' : '+'}</span>
          </button>
          <div id="faq-content-4" className={`${openFaq === 4 ? '' : 'hidden'} px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3`}>
            All Sustune Care personnel are fully employed, insured, and clinically supervised members of our team. We do not use third-party freelance gig-workers, ensuring consistent quality, training, and caregiver continuity.
          </div>
        </div>

      </div>

    </div>
  </section>

  
  <section className="py-16 bg-sustune-navy text-white text-center relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-5">
      <div className="inline-block p-2 rounded-full bg-sustune-gold/20 border border-sustune-gold/40 text-sustune-gold text-xs font-bold uppercase tracking-wider">
        Begin With Total Peace of Mind
      </div>
      <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
        Speak With a Senior Care Consultant Today
      </h2>
      <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
        Let us build a customized care plan tailored around your family’s unique clinical and personal requirements. No commitments, no hidden obligations.
      </p>
      <div className="pt-2">
        <button onClick={() => openModal()} className="px-8 py-4 text-sm font-bold text-sustune-navy bg-sustune-gold hover:bg-amber-400 rounded-md shadow-lg transition-all transform hover:-translate-y-0.5">
          Request Confidential Assessment
        </button>
      </div>
    </div>
  </section>

  
  <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t-2 border-sustune-gold">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/assets/sustune_emblem_standalone.svg" 
                 alt="Sustune Care Logo" 
                 className="h-9 w-auto brightness-110" />
            <span className="font-display font-bold text-lg text-white">SUSTUNE CARE</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Sustune Care Ltd. operates under full jurisdictional clinical accreditation. Delivering protected domiciliary support and dignified clinical care.
          </p>
          <div className="text-[10px] text-slate-500">
            Registration No: 09841243<br />
            ISO 9001:2015 Registered
          </div>
        </div>

        
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Care Pathways</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="#services" className="hover:text-white transition-colors">Domiciliary &amp; Personal Care</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Post-Hospital Reablement</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Specialized Dementia Support</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">24-Hour Live-In Nursing Aid</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Palliative &amp; Respite Care</a></li>
          </ul>
        </div>

        
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Governance</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="#governance" className="hover:text-white transition-colors">Safeguarding Standards</a></li>
            <li><a href="#governance" className="hover:text-white transition-colors">Electronic Medication Logs</a></li>
            <li><a href="#governance" className="hover:text-white transition-colors">Sustainable Care Charter</a></li>
            <li><a href="#governance" className="hover:text-white transition-colors">Caregiver Vetting Protocol</a></li>
            <li><a href="#governance" className="hover:text-white transition-colors">Family Transparency Portal</a></li>
          </ul>
        </div>

        
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Contact &amp; Headquarters</h4>
          <div className="space-y-1.5 text-[11px] text-slate-400">
            <p>100 Care Parkway, Suite 400</p>
            <p>Clinical Dispatch: 24/7 Mon–Sun</p>
            <p className="pt-1 text-white font-semibold">T: +1 (555) 019-CARE</p>
            <p className="text-sustune-cerulean font-semibold">E: contact@sustunecare.com</p>
            <p className="text-sustune-gold font-semibold">W: www.sustunecare.com</p>
          </div>
        </div>

      </div>

      
      <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-500">
        <div>
          &copy; 2026 Sustune Care Ltd. All rights reserved. Protected Care. Sustained Dignity.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Care Delivery</a>
          <a href="#" className="hover:text-slate-300">Modern Slavery Statement</a>
          <a href="#" className="hover:text-slate-300">Environmental Policy</a>
        </div>
      </div>

    </div>
  </footer>

  
  <div id="careModal" role="dialog" aria-modal="true" aria-labelledby="care-modal-title" onClick={event => { if (event.target === event.currentTarget) closeModal() }} className={`fixed inset-0 z-50 ${modalOpen ? '' : 'hidden'} bg-sustune-navy/80 backdrop-blur-sm flex items-center justify-center p-4`}>
    <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
      
      
      <button onClick={closeModal} aria-label="Close Modal" className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sustune-emerald"></span>
          <span className="text-xs font-bold text-sustune-cerulean uppercase tracking-wider">Confidential Intake</span>
        </div>

        <h3 id="care-modal-title" className="font-display font-bold text-xl text-sustune-navy">
          Request Care Consultation
        </h3>
        <p className="text-xs text-slate-500">
          Our registered triage team will review your details and reach out within 2 hours.
        </p>

        <form id="consultationForm" onSubmit={submitForm} className={`${formSubmitted ? 'hidden' : ''} space-y-3.5 pt-1`}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="modalName">Full Name</label>
            <input type="text" id="modalName" required className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-sustune-cerulean focus:outline-none" placeholder="Eleanor Vance" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="modalPhone">Contact Phone</label>
              <input type="tel" id="modalPhone" required className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-sustune-cerulean focus:outline-none" placeholder="+1 (555) 000-0000" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="modalEmail">Email Address</label>
              <input type="email" id="modalEmail" required className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-sustune-cerulean focus:outline-none" placeholder="name@domain.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="modalService">Primary Care Pathway</label>
            <select id="modalService" value={selectedService} onChange={event => setSelectedService(event.target.value)} className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-sustune-cerulean focus:outline-none bg-white">
              <option value="Domiciliary & Personal Care">Domiciliary &amp; Personal Care</option>
              <option value="Post-Acute & Reablement">Post-Acute &amp; Reablement</option>
              <option value="Complex Live-In Care">Complex Live-In Care</option>
              <option value="General Clinical Consultation">General Clinical Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="modalNotes">Brief Notes / Urgent Circumstances</label>
            <textarea id="modalNotes" rows="2" className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-sustune-cerulean focus:outline-none" placeholder="E.g., Anticipating hospital discharge on Thursday; needs mobility and meal assistance."></textarea>
          </div>

          <button type="submit" className="w-full py-3 text-xs font-bold text-white bg-sustune-cerulean hover:bg-sustune-navy rounded-md shadow-md transition-colors">
            Confirm &amp; Request Clinical Callback
          </button>
        </form>

        <div id="modalSuccess" className={`${formSubmitted ? '' : 'hidden'} p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center`}>
          <p className="text-xs font-bold text-sustune-emerald">Consultation Request Received</p>
          <p className="text-[11px] text-slate-600 mt-1">A registered nurse triage supervisor will contact you shortly.</p>
        </div>

      </div>

    </div>
  </div>

  

    </>
  )
}
