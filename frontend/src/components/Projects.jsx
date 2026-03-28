import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { getProjects, addProject, deleteProject } from '../services/api'
import './Projects.css'

const TECH_OPTIONS = [
  'React', 'Node.js', 'Python', 'C++', 'C', 'SQL', 'CSS',
  'Express', 'MongoDB', 'PostgreSQL', 'Supabase', 'Git',
  'HTML', 'JavaScript', 'TypeScript', 'Next.js', 'FastAPI',
  'DSA', 'Machine Learning', 'AI', 'Firebase', 'REST API',
]


const EMPTY_FORM = { title: '', description: '', tech_stack: [], github_link: '', demo_link: '', secret: '' }
export default function Projects() {
  const [projects, setProjects] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formStatus, setFormStatus] = useState('idle')
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView(0.1)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(data)
    } catch {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleTech = (tech) => {
    setForm((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter((t) => t !== tech)
        : [...prev.tech_stack, tech],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setFormStatus('loading')
    try {
      const result = await addProject(form)
      setProjects((prev) => [result.project, ...prev])
      setForm(EMPTY_FORM)
      setFormStatus('success')
      setTimeout(() => { setFormStatus('idle'); setShowAddForm(false) }, 2000)
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 2500)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm('Delete this project?')) return
    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Failed to delete')
    }
  }

  return (
    <section className="projects section" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Portfolio</p>
          <div className="projects__header-row">
            <h2 className="section-title">My Projects</h2>
            <motion.button
              className="projects__add-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {showAddForm ? '✕ Cancel' : '+ Add Project'}
            </motion.button>
          </div>
          <p className="section-subtitle">Things I've built — and am building.</p>
        </motion.div>

        {/* Add Project Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="add-project-form"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="add-project-form__title">➕ Add New Project</h3>
              <form onSubmit={handleSubmit}>
                <div className="add-project-form__row">
                  <div className="add-project-form__field">
                    <label>Title *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="My Awesome Project"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="add-project-form__field">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    placeholder="What does this project do?"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="add-project-form__field">
                  <label>Tech Stack</label>
                  <div className="tech-select">
                    {TECH_OPTIONS.map((tech) => (
                      <button
                        type="button"
                        key={tech}
                        className={`tech-select__chip ${form.tech_stack.includes(tech) ? 'selected' : ''}`}
                        onClick={() => toggleTech(tech)}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="add-project-form__row">
                  <div className="add-project-form__field">
                    <label>GitHub Link</label>
                    <input
                      type="url"
                      name="github_link"
                      placeholder="https://github.com/..."
                      value={form.github_link}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="add-project-form__field">
                    <label>Demo Link</label>
                    <input
                      type="url"
                      name="demo_link"
                      placeholder="https://..."
                      value={form.demo_link}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="add-project-form__field">
                    <label>Admin Key *</label>
                    <input
                      type="password"
                      name="secret"
                      placeholder="Enter your secret key"
                      value={form.secret}
                      onChange={handleChange}
                      required
                    />
                  </div>
                {formStatus === 'success' && (
                  <div className="form-msg form-msg--success">✓ Project added successfully!</div>
                )}
                {formStatus === 'error' && (
                  <div className="form-msg form-msg--error">✕ Failed to add project. Try again.</div>
                )}

                <motion.button
                  type="submit"
                  className="add-project-form__submit"
                  disabled={formStatus === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {formStatus === 'loading' ? 'Adding...' : 'Add Project →'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        {loading ? (
          <div className="projects__loading">
            {[1,2,3].map((i) => <div key={i} className="project-skeleton" />)}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            className="projects__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span>🚀</span>
            <p>No projects yet — add your first one above!</p>
          </motion.div>
        ) : (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                
                whileHover={{ y: -4 }}
              >
                <div className="project-card__top">
                  <div className="project-card__number">{String(i + 1).padStart(2, '0')}</div>
                  <button
                    className="project-card__delete"
                    onClick={(e) => handleDelete(project.id, e)}
                    title="Delete project"
                  >
                    🗑
                  </button>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {(Array.isArray(project.tech_stack)
                    ? project.tech_stack
                    : project.tech_stack?.split(',') || []
                  ).map((t) => (
                    <span key={t.trim()} className="project-card__tag">{t.trim()}</span>
                  ))}
                </div>

                <div className="project-card__footer">
                  
                  <div className="project-card__links">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noreferrer"
                        className="project-card__link" onClick={(e) => e.stopPropagation()} title="GitHub">
                        <GithubIcon />
                      </a>
                    )}
                    {project.demo_link && (
                      <a href={project.demo_link} target="_blank" rel="noreferrer"
                        className="project-card__link" onClick={(e) => e.stopPropagation()} title="Live Demo">
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}