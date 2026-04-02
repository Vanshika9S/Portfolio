import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const TYPED_STRINGS = [
  'CS Student',
  'Problem Solver',
  'Open Source Enthusiast',
  'Always Learning',
]

export default function Hero({ onChatOpen }) {
  const [textIndex, setTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = TYPED_STRINGS[textIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % TYPED_STRINGS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, textIndex])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section className="hero" id="home">
      <div className="grid-bg" />

      {/* Ambient glows */}
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="hero__badge" variants={item}>
            <span className="hero__badge-dot" />
            Available for opportunities
          </motion.div>

          <motion.h1 className="hero__name" variants={item}>
            Hi, I'm <span className="hero__name-accent">Vanshika</span>
          </motion.h1>

          <motion.div className="hero__typed-wrapper" variants={item}>
            <span className="hero__typed">{displayed}</span>
            <span className="hero__cursor" />
          </motion.div>

          <motion.p className="hero__bio" variants={item}>
            I'm a CS student who loves building things with code. Still learning, still exploring — passionate about solving real problems and growing one project at a time.
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <motion.button
              className="hero__btn hero__btn--primary"
              onClick={onChatOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>✦</span> Ask Me Anything
            </motion.button>
            <motion.a
              href="#projects"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              View Projects →
            </motion.a>
          </motion.div>

          <motion.div className="hero__stats" variants={item}>
            {[
              { value: '100+', label: 'Problems Solved' },
              { value: '1.5+', label: 'Years Coding' },
              { value: 'Always', label: 'Learning' },
            ].map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative orb */}
        <motion.div
          className="hero__orb"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__orb-inner">
            <div className="hero__orb-ring hero__orb-ring--1" />
            <div className="hero__orb-ring hero__orb-ring--2" />
            <div className="hero__orb-ring hero__orb-ring--3" />
            <div className="hero__orb-core">
              <span>V</span>
            </div>
          </div>
        </motion.div>
      </div>

     
    </section>
  )
}