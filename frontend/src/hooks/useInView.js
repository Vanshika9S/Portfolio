import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}