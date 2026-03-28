import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

const FALLBACK = [
  {
    id: '1', title: 'AI Chat Platform',
    description: 'A real-time collaborative AI chat platform with rooms, history, and multi-model support.',
    tech_stack: 'React, Node.js, Socket.io, OpenAI',
    github_link: 'https://github.com', demo_link: 'https://example.com',
  },
  {
    id: '2', title: 'E-Commerce Dashboard',
    description: 'Full-stack admin dashboard with analytics, inventory management, and order tracking.',
    tech_stack: 'Next.js, PostgreSQL, Prisma, TailwindCSS',
    github_link: 'https://github.com', demo_link: 'https://example.com',
  },
  {
    id: '3', title: 'DevTrack',
    description: 'Open-source issue tracker with kanban boards, GitHub integration, and team collaboration.',
    tech_stack: 'React, Express, MongoDB, GitHub API',
    github_link: 'https://github.com', demo_link: 'https://example.com',
  },
  {
    id: '4', title: 'NeuroNote',
    description: 'AI-powered note-taking app that auto-summarizes, tags, and connects related notes.',
    tech_stack: 'React, Python, FastAPI, Supabase',
    github_link: 'https://github.com', demo_link: 'https://example.com',
  },
  {
    id: '5', title: 'CloudDeploy CLI',
    description: 'Zero-config deployment CLI tool that automates Docker + AWS ECS deployments.',
    tech_stack: 'Node.js, Docker, AWS SDK, CLI',
    github_link: 'https://github.com', demo_link: 'https://example.com',
  },
  {
    id: '6', title: 'Pulse Analytics',
    description: 'Privacy-first web analytics platform with real-time dashboards and reporting.',
    tech_stack: 'SvelteKit, ClickHouse, Go, WebSockets',
    github_link: 'https://github.com', demo_link: 'https://example.com',
  },
]

router.get('/', async (_req, res) => {
  if (!supabase) {
    return res.json(FALLBACK)
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      

    if (error) throw error
    res.json(data?.length ? data : FALLBACK)
  } catch (err) {
    console.error('[Projects] Supabase error:', err.message)
    res.json(FALLBACK)
  }
})

export default router