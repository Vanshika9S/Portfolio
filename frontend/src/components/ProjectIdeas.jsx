import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { getIdeas, submitIdea, addMyIdea } from '../services/api'
import './ProjectIdeas.css'

const TECH_OPTIONS = [
  'React', 'Node.js', 'Python', 'C++', 'C', 'SQL', 'CSS',
  'Express', 'MongoDB', 'PostgreSQL', 'Supabase', 'Git',
  'HTML', 'JavaScript', 'TypeScript', 'Next.js', 'FastAPI',
  'DSA', 'Machine Learning', 'AI', 'Firebase', 'REST API',
]

const EMPTY_FORM = { title: '', description: '', tech_stack: [], secret: '' }

export default function ProjectIdeas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [adminForm, setAdminForm] = useState(EMPTY_FORM)
  const [formStatus, setFormStatus] = useState('idle')
  const [adminStatus, setAdminStatus] = useState('idle')
  const [ref, inView] = useInView(0.1)

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    setLoading(true)
    try {
      const data = await getIdeas()
      setIdeas(data)
    } catch {
      setIdeas([])
    } finally {
      setLoading(false)
    }
  }

  const toggleTech = (tech, isAdmin = false) => {
    if (isAdmin) {
      setAdminForm((prev) => ({
        ...prev,
        tech_stack: prev.tech_stack.includes(tech)
          ? prev.tech_stack.filter((t) => t !== tech)
          : [...prev.tech_stack, tech],
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        tech_stack: prev.tech_stack.includes(tech)
          ? prev.tech_stack.filter((t) => t !== tech)
          : [...prev.tech_stack, tech],
      }))
    }
  }

  const handleVisitorSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setFormStatus('loading')
    try {
      const result = await submitIdea(form)
      setIdeas((prev) => [result.idea, ...prev])
      setForm(EMPTY_FORM)
      setFormStatus('success')
      setTimeout(() => { setFormStatus('idle'); setShowForm(false) }, 2000)
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 2500)
    }
  }

  const handleAdminSubmit = async (e) => {
    e.preventDefault()
    if (!adminForm.title.trim() || !adminForm.description.trim()) return
    setAdminStatus('loading')
    try {
      const result = await addMyIdea(adminForm)
      setIdeas((prev) => [result.idea, ...prev])
      setAdminForm(EMPTY_FORM)
      setAdminStatus('success')
      setTimeout(() => { setAdminStatus('idle'); setShowAdminForm(false) }, 2000)
    } catch {
      setAdminStatus('error')
      setTimeout(() => setAdminStatus('idle'), 2500)
    }
  }

  return (
    <section className="ideas section" id="ideas" ref={ref}>
      <div className="container">
        <motion.div
          className="ideas__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Brainstorm</p>
          <div className="ideas__header-row">
            <h2 className="section-title">Project Ideas</h2>
            <div className="ideas__header-btns">
              <motion.button
                className="ideas__btn ideas__btn--admin"
                onClick={() => { setShowAdminForm(!showAdminForm); setShowForm(false) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {showAdminForm ? '✕ Cancel' : '✦ My Idea'}
              </motion.button>
              <motion.button
                className="ideas__btn ideas__btn--visitor"
                onClick={() => { setShowForm(!showForm); setShowAdminForm(false) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {showForm ? '✕ Cancel' : '+ Share Idea'}
              </motion.button>
            </div>
          </div>
          <p className="section-subtitle">
            Ideas I'm thinking about building — and ideas shared by visitors.
          </p>
        </motion.div>

        {/* Admin / My Idea Form */}
        <AnimatePresence>
          {showAdminForm && (
            <motion.div
              className="idea-form idea-form--admin"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="idea-form__title">✦ Add My Project Idea</h3>
              <IdeaForm
                form={adminForm}
                setForm={setAdminForm}
                onToggleTech={(t) => toggleTech(t, true)}
                onSubmit={handleAdminSubmit}
                status={adminStatus}
                label="Add Idea"
                showSecret={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visitor Idea Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="idea-form idea-form--visitor"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="idea-form__title">💡 Share a Project Idea</h3>
              <p className="idea-form__sub">Got an idea you'd like to see built? Share it here!</p>
              <IdeaForm
                form={form}
                setForm={setForm}
                onToggleTech={(t) => toggleTech(t, false)}
                onSubmit={handleVisitorSubmit}
                status={formStatus}
                label="Submit Idea"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ideas Grid */}
        {loading ? (
          <div className="ideas__loading">
            {[1, 2, 3].map((i) => <div key={i} className="idea-skeleton" />)}
          </div>
        ) : ideas.length === 0 ? (
          <motion.div className="ideas__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span>💡</span>
            <p>No ideas yet — be the first to add one!</p>
          </motion.div>
        ) : (
          <div className="ideas__grid">
            {ideas.map((idea, i) => (
              <motion.div
                key={idea.id}
                className="idea-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div className="idea-card__top">
                  <span className={`idea-badge ${idea.added_by === 'me' ? 'idea-badge--me' : 'idea-badge--visitor'}`}>
                    {idea.added_by === 'me' ? '✦ Added by Me' : '👤 Visitor'}
                  </span>
                </div>
                <h3 className="idea-card__title">{idea.title}</h3>
                <p className="idea-card__desc">{idea.description}</p>
                <div className="idea-card__tags">
                  {(Array.isArray(idea.tech_stack)
                    ? idea.tech_stack
                    : idea.tech_stack?.split(',') || []
                  ).map((t) => (
                    <span key={t.trim()} className="idea-card__tag">{t.trim()}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function IdeaForm({ form, setForm, onToggleTech, onSubmit, status, label, showSecret })  {
  return (
    <form onSubmit={onSubmit}>
      <div className="idea-form__row">
        <div className="idea-form__field">
          <label>Title *</label>
          <input
            type="text"
            placeholder="A cool project idea..."
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="idea-form__field">
        <label>Description *</label>
        <textarea
          placeholder="What would this project do?"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          required
        />
      </div>
      <div className="idea-form__field">
        <label>Tech Stack</label>
        <div className="tech-select">
          {TECH_OPTIONS.map((tech) => (
            <button
              type="button"
              key={tech}
              className={`tech-select__chip ${form.tech_stack.includes(tech) ? 'selected' : ''}`}
              onClick={() => onToggleTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {status === 'success' && <div className="form-msg form-msg--success">✓ Idea submitted!</div>}
      {status === 'error' && <div className="form-msg form-msg--error">✕ Failed. Try again.</div>}
      {showSecret && (
            <div className="idea-form__field">
              <label>Admin Key *</label>
              <input
                type="password"
                placeholder="Enter your secret key"
                value={form.secret || ''}
                onChange={(e) => setForm((p) => ({ ...p, secret: e.target.value }))}
                required
              />
            </div>
          )}
      <motion.button
        type="submit"
        className="idea-form__submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {status === 'loading' ? 'Submitting...' : `${label} →`}
      </motion.button>
    </form>
  )
}