import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ end, duration = 2, delay = 0, suffix = '' }) {
  const [count, setCount]   = useState(0)
  const ref                 = useRef(null)
  const isInView            = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start     = null
    const step    = (timestamp) => {
      if (!start) start = timestamp + delay * 1000
      if (timestamp < start) { requestAnimationFrame(step); return }
      const elapsed  = timestamp - start
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration, delay])

  return <span ref={ref}>{count}{suffix}</span>
}
