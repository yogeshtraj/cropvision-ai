import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── The 7 steps of how AgroXAI works ─────────────────────────────────
const STEPS = [
  {
    number: '01',
    icon: '📍',
    title: 'Enter Your Location & Soil',
    color: '#166534',
    bgColor: '#dcfce7',
    description:
      'Start by selecting your state and district — or switch to Expert Mode and enter your exact soil test values: Nitrogen (N), Phosphorus (P), Potassium (K), and soil pH level.',
    details: [
      'Farmer Mode: just pick your state, district and season',
      'Standard Mode: enter weather data + soil type',
      'Expert Mode: enter precise N, P, K, pH lab values',
      'Weather is auto-filled from your location using Open-Meteo API',
    ],
    tag: 'Input',
  },
  {
    number: '02',
    icon: '🌦️',
    title: 'Real-Time Weather Fetched',
    color: '#1e40af',
    bgColor: '#dbeafe',
    description:
      'AgroXAI automatically detects your location using GPS or IP address and fetches live Temperature, Humidity, and Rainfall data from Open-Meteo — so you never have to look up weather yourself.',
    details: [
      'GPS or IP-based location detection (Nominatim API)',
      'Real-time temperature in °C pulled automatically',
      'Current humidity % and rainfall mm auto-filled',
      'You can also enter weather manually if preferred',
    ],
    tag: 'Auto',
  },
  {
    number: '03',
    icon: '🤖',
    title: 'XGBoost AI Analyses Your Data',
    color: '#7c3aed',
    bgColor: '#ede9fe',
    description:
      'Your soil and weather data is sent securely to our XGBoost machine learning model — trained on thousands of real Indian crop production records. It calculates the probability of success for every crop.',
    details: [
      'XGBoost Gradient Boosted Tree Classifier',
      'Trained on real India crop production statistics',
      'Analyses 9 parameters simultaneously',
      'Returns a confidence score for each possible crop',
    ],
    tag: 'AI Model',
  },
  {
    number: '04',
    icon: '🔍',
    title: 'SHAP Explains WHY',
    color: '#b45309',
    bgColor: '#fef3c7',
    description:
      'Unlike any other tool, AgroXAI uses SHAP (SHapley Additive Explanations) to show you exactly which factors drove the recommendation. You see a bar chart of the top 3 reasons — not just a black-box answer.',
    details: [
      'SHAP TreeExplainer runs on every prediction',
      'Top 3 driving factors displayed as a visual bar chart',
      'Green bars = factors pushing toward this crop',
      'Red bars = factors reducing confidence',
    ],
    tag: 'XAI',
  },
  {
    number: '05',
    icon: '⚠️',
    title: 'Risk & Confidence Assessment',
    color: '#b91c1c',
    bgColor: '#fee2e2',
    description:
      'Every prediction comes with a colour-coded risk card. If the model is very confident (≥ 80%), you see green. If uncertain (< 60%), you see red with specific steps to reduce risk before investing.',
    details: [
      '🟢 ≥ 80% confidence → LOW RISK — proceed with confidence',
      '🟡 60–79% confidence → MEDIUM RISK — review soil conditions',
      '🔴 < 60% confidence → HIGH RISK — consult KVK before investing',
      'Margin analysis shows gap between top two crops',
    ],
    tag: 'Risk',
  },
  {
    number: '06',
    icon: '💰',
    title: 'Revenue & Feasibility Report',
    color: '#065f46',
    bgColor: '#d1fae5',
    description:
      'Enter your land area in acres and AgroXAI calculates your expected gross revenue, net profit after costs, and ROI — using the official Government of India MSP 2024-25 rates. It also compares all top 5 crops.',
    details: [
      'Gross revenue = MSP × adjusted yield × your land area',
      'Soil quality and rainfall adjust the yield estimate',
      'Full cost breakdown: seed + fertilizer + labour + irrigation',
      'Top 5 crop comparison with feasibility radar scores',
    ],
    tag: 'Revenue',
  },
  {
    number: '07',
    icon: '📋',
    title: 'Your Full Farming Plan',
    color: '#1a2e1a',
    bgColor: '#f0fdf4',
    description:
      'AgroXAI generates a complete, ready-to-use farming plan: a month-by-month growing calendar, step-by-step cultivation guide, labour requirements, applicable government subsidies, soil improvement tips, and an organic farming transition roadmap.',
    details: [
      '📅 Month-by-month growing calendar with sowing/harvest dates',
      '👷 Labour plan with worker count, stage timings and costs',
      '🏛️ Government scheme eligibility with apply-now links',
      '🌿 3-year organic farming transition guide',
    ],
    tag: 'Plan',
  },
]

export default function HowItWorksModal({ isOpen, onClose }) {

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.72)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
            }}
          />

          {/* ── MODAL PANEL ── */}
          <motion.div
            key="modal"
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0,      opacity: 1   }}
            exit={{    y: '100%', opacity: 0   }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 28,
              mass: 0.9,
            }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1001,
              background: '#ffffff',
              borderRadius: '24px 24px 0 0',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 -24px 80px rgba(0,0,0,0.3)',
            }}
          >
            {/* ── DRAG HANDLE ── */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 14,
              paddingBottom: 8,
              position: 'sticky',
              top: 0,
              background: '#ffffff',
              zIndex: 10,
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: 44,
                height: 4,
                background: 'rgba(0,0,0,0.15)',
                borderRadius: 2,
              }} />
            </div>

            {/* ── MODAL CONTENT ── */}
            <div style={{ padding: '28px 40px 48px', maxWidth: 860, margin: '0 auto' }}>

              {/* HEADER */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8,
              }}>
                <div>
                  {/* Tag */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#dcfce7',
                    border: '1px solid #86efac',
                    borderRadius: 100,
                    padding: '4px 14px',
                    marginBottom: 12,
                  }}>
                    <span style={{ fontSize: 11 }}>🤖</span>
                    <span style={{
                      fontFamily: 'inherit',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#166534',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>
                      Powered by XGBoost + SHAP
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'inherit',
                    fontSize: 'clamp(26px, 4vw, 38px)',
                    fontWeight: 900,
                    color: '#1a1d14',
                    letterSpacing: '-1.5px',
                    lineHeight: 1.1,
                    margin: 0,
                  }}>
                    How AgroXAI Works
                  </h2>
                  <p style={{
                    fontFamily: 'inherit',
                    fontSize: 14,
                    color: '#6b7462',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    marginTop: 10,
                    maxWidth: 520,
                  }}>
                    From entering your soil data to receiving a complete farming plan —
                    here is the exact 7-step process AgroXAI follows every time.
                  </p>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.08, background: '#f3f4f2' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(0,0,0,0.14)',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    color: '#3a4a38',
                    flexShrink: 0,
                    marginLeft: 20,
                    marginTop: 4,
                    transition: 'background 0.18s',
                  }}
                >
                  ✕
                </motion.button>
              </div>

              {/* PROGRESS DOTS */}
              <div style={{
                display: 'flex',
                gap: 6,
                marginBottom: 36,
                marginTop: 20,
              }}>
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 3,
                      flex: 1,
                      borderRadius: 2,
                      background: '#1a2e1a',
                      opacity: 0.12 + (i * 0.12),
                    }}
                  />
                ))}
              </div>

              {/* STEPS LIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0   }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <StepCard step={step} index={i} />
                  </motion.div>
                ))}
              </div>

              {/* BOTTOM CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.7, duration: 0.4 }}
                style={{
                  marginTop: 40,
                  padding: '28px 32px',
                  background: '#1a2e1a',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'inherit',
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.5px',
                    marginBottom: 6,
                  }}>
                    Ready to find your best crop?
                  </div>
                  <div style={{
                    fontFamily: 'inherit',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.55)',
                    fontWeight: 300,
                  }}>
                    Takes less than 60 seconds. No soil lab needed for Farmer Mode.
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(253,251,78,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: '#fdfb4e',
                    color: '#1a1d14',
                    border: 'none',
                    borderRadius: 12,
                    padding: '14px 28px',
                    fontFamily: 'inherit',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.2px',
                  }}
                >
                  Start Recommendation →
                </motion.button>
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Individual Step Card ────────────────────────────────────────────────
function StepCard({ step, index }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{
        display: 'flex',
        gap: 20,
        padding: '20px 24px',
        borderRadius: 18,
        border: '1px solid rgba(0,0,0,0.07)',
        background: '#ffffff',
        cursor: 'default',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.09)'
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.14)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'
      }}
    >
      {/* LEFT — Step number + icon */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
      }}>
        {/* Number badge */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: step.bgColor,
          border: `2px solid ${step.color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 800,
          color: step.color,
          letterSpacing: '-0.5px',
          flexShrink: 0,
        }}>
          {step.number}
        </div>

        {/* Connector line (except last step) */}
        {index < 6 && (
          <div style={{
            width: 1,
            flex: 1,
            minHeight: 20,
            background: 'rgba(0,0,0,0.08)',
          }} />
        )}
      </div>

      {/* RIGHT — Content */}
      <div style={{ flex: 1, paddingTop: 10, paddingBottom: 6 }}>

        {/* Title row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 8,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 20 }}>{step.icon}</span>
          <span style={{
            fontFamily: 'inherit',
            fontSize: 16,
            fontWeight: 700,
            color: '#1a1d14',
            letterSpacing: '-0.3px',
          }}>
            {step.title}
          </span>
          {/* Tag badge */}
          <span style={{
            background: step.bgColor,
            color: step.color,
            border: `1px solid ${step.color}33`,
            borderRadius: 100,
            padding: '2px 10px',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            fontFamily: 'inherit',
          }}>
            {step.tag}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'inherit',
          fontSize: 13,
          color: '#4a5a48',
          fontWeight: 300,
          lineHeight: 1.72,
          marginBottom: 14,
          margin: '0 0 14px 0',
        }}>
          {step.description}
        </p>

        {/* Detail bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {step.details.map((detail, di) => (
            <div
              key={di}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <div style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: step.color,
                flexShrink: 0,
                marginTop: 6,
                opacity: 0.7,
              }} />
              <span style={{
                fontFamily: 'inherit',
                fontSize: 12,
                color: '#6b7462',
                lineHeight: 1.6,
                fontWeight: 400,
              }}>
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
