import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { submitContact } from '../services/api'
import './Contact.css'

export default function Contact() {
  const [ref, inView] = useInView(0.2)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="contact section" id="contact" ref={ref}>
      <div className="container">
        <div className="contact__inner">
          {/* Left: Text */}
          <div className="contact__left">
            <motion.p className="section-label" {...fadeUp(0)}>
              Get In Touch
            </motion.p>
            <motion.h2 className="section-title" {...fadeUp(0.1)}>
              Let's build something<br />
              <span className="contact__title-accent">great together</span>
            </motion.h2>
            <motion.p className="contact__text" {...fadeUp(0.2)}>
              Whether you have a project in mind, a question, or just want to say
              hi — my inbox is always open. I'll get back to you within 24 hours.
            </motion.p>

            <motion.div className="contact__info" {...fadeUp(0.3)}>
              <div className="contact__info-item">
                <span className="contact__info-icon">✉</span>
                <a href="mailto:vanshika.umbri@gmail.com" className="contact__info-link">
                  vanshika.umbri@gmail.com
                </a>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">🌐</span>
                <a href="https://github.com/vanshika9s" target="_blank" rel="noreferrer" className="contact__info-link">
                  github.com/vanshika9s
                </a>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">💼</span>
                <a href="https://in.linkedin.com/in/vanshika-shah-a52639314" target="_blank" rel="noreferrer" className="contact__info-link">
                  linkedin.com/in/vanshika-shah-a52639314
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            className="contact__form-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label className="contact__label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="contact__input"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="contact__input"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label className="contact__label">Message</label>
                <textarea
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project or just say hello…"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'success' && (
                <motion.div
                  className="contact__success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="contact__error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✕ Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="contact__submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'loading' ? (
                  <span className="contact__spinner" />
                ) : (
                  'Send Message →'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <div className="container">
          <div className="footer__inner">
            <span className="footer__copy">
              © 2025 Vanshika. Built with React & ☕
            </span>
            <div className="footer__links">
              <a href="https://github.com/vanshika9s" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://in.linkedin.com/in/vanshika-shah-a52639314" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}