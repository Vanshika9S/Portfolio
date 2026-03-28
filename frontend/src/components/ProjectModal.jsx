import { motion } from 'framer-motion'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  return (
    <>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal__header">
          <h2 className="modal__title">{project.title}</h2>
          <p className="modal__desc">{project.description}</p>
        </div>

        {project.long_description && (
          <div className="modal__section">
            <h3 className="modal__section-title">Overview</h3>
            <p className="modal__text">{project.long_description}</p>
          </div>
        )}

        <div className="modal__section">
          <h3 className="modal__section-title">Tech Stack</h3>
          <div className="modal__tags">
            {project.tech_stack?.split(',').map((t) => (
              <span key={t.trim()} className="modal__tag">{t.trim()}</span>
            ))}
          </div>
        </div>

        <div className="modal__actions">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noreferrer"
              className="modal__btn modal__btn--secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          )}
          {project.demo_link && (
            <a
              href={project.demo_link}
              target="_blank"
              rel="noreferrer"
              className="modal__btn modal__btn--primary"
            >
              Live Demo →
            </a>
          )}
        </div>
      </motion.div>
    </>
  )
}