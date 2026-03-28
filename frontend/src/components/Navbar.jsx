import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onChatOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-mark">V</span>
          <span className="navbar__logo-text">anshika</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            className="navbar__chat-btn"
            onClick={() => { onChatOpen(); setMenuOpen(false) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            ✦ Ask AI
          </motion.button>
        </nav>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </motion.header>
  )
}