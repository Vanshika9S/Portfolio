import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { getProjects } from '../services/api'
import ProjectModal from './ProjectModal'
import './Projects.css'

const FALLBACK_PROJECTS = [
  {
    id: '1',
    title: 'AI Chat Platform',
    description: 'A real-time collaborative AI chat platform with rooms, history, and multi-model support.',
    tech_stack: 'React, Node.js, Socket.io, OpenAI',
    github_link: 'https://github.com',
    demo_link: 'https://demo.example.com',
    long_description: 'Built with React and Socket.io for real-time communication. Features include conversation rooms, message history, multiple AI model switching, and user authentication. Deployed on AWS with auto-scaling.',
  },
  {
    id: '2',
    title: 'E-Commerce Dashboard',
    description: 'Full-stack admin dashboard with analytics, inventory management, and order tracking.',
    tech_stack: 'Next.js, PostgreSQL, Prisma, TailwindCSS',
    github_link: 'https://github.com',
    demo_link: 'https://demo.example.com',
    long_description: 'A production-ready admin dashboard featuring real-time sales analytics, inventory management, order processing, and customer insights. Includes dark/light mode and role-based access control.',
  },
  {
    id: '3',
    title: 'DevTrack',
    description: 'Open-source issue tracker with kanban boards, GitHub integration, and team collaboration.',
    tech_stack: 'React, Express, MongoDB, GitHub API',
    github_link: 'https://github.com',
    demo_link: 'https://demo.example.com',
    long_description: 'A developer-focused issue tracker that integrates with GitHub repositories. Features kanban boards, sprint planning, team mention system, and automated workflow triggers.',
  },
  {
    id: '4',
    title: 'NeuroNote',
    description: 'AI-powered note-taking app that auto-summarizes, tags, and connects related notes.',
    tech_stack: 'React, Python, FastAPI, Supabase',
    github_link: 'https://github.com',
    demo_link: 'https://demo.example.com',
    long_description: 'Smart notes powered by AI. Uses LLM embeddings to find semantic connections between notes, auto-generates summaries, suggests tags, and features a beautiful graph view of your knowledge.',
  },
  {
    id: '5',
    title: 'CloudDeploy CLI',
    description: 'Zero-config deployment CLI tool that automates Docker + AWS ECS deployments.',
    tech_stack: 'Node.js, Docker, AWS SDK, CLI',
    github_link: 'https://github.com',
    demo_link: 'https://demo.example.com',
    long_description: 'A command-line tool that streamlines the entire deployment pipeline. Auto-detects project type, builds Docker images, pushes to ECR, and deploys to ECS with a single command.',
  },
  {
    id: '6',
    title: 'Pulse Analytics',
    description: 'Privacy-first web analytics platform with beautiful dashboards and real-time reporting.',
    tech_stack: 'SvelteKit, ClickHouse, Go, WebSockets',
    github_link: 'https://github.com',
    demo_link: 'https://demo.example.com',
    long_description: 'A GDPR-compliant analytics platform that tracks user behavior without cookies. Features real-time dashboards, funnel analysis, heatmaps, and custom event tracking.',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [selected, setSelected] = useState(null)
  const [ref, inView] = useInView(0.1)

  useEffect(() => {
    getProjects()
      .then((data) => { if (data?.length) setProjects(data) })
      .catch(() => {})
  }, [])

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
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of things I've built — from developer tools to full-stack
            applications.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(project)}
              whileHover={{ y: -4 }}
            >
              <div className="project-card__number">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__tags">
                {project.tech_stack?.split(',').map((t) => (
                  <span key={t.trim()} className="project-card__tag">
                    {t.trim()}
                  </span>
                ))}
              </div>

              <div className="project-card__footer">
                <button
                  className="project-card__detail-btn"
                  onClick={(e) => { e.stopPropagation(); setSelected(project) }}
                >
                  View Details →
                </button>
                <div className="project-card__links">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                    onClick={(e) => e.stopPropagation()}
                    title="GitHub"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                    onClick={(e) => e.stopPropagation()}
                    title="Live Demo"
                  >
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
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