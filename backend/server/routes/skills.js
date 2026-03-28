import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

const FALLBACK = [
  { id: '1', name: 'React', level: 90 },
  { id: '2', name: 'Node.js', level: 85 },
  { id: '3', name: 'TypeScript', level: 80 },
  { id: '4', name: 'PostgreSQL', level: 75 },
  { id: '5', name: 'Python', level: 78 },
  { id: '6', name: 'Docker', level: 68 },
  { id: '7', name: 'GraphQL', level: 72 },
  { id: '8', name: 'AWS', level: 65 },
]

router.get('/', async (_req, res) => {
  if (!supabase) {
    return res.json(FALLBACK)
  }

  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('level', { ascending: false })

    if (error) throw error
    res.json(data?.length ? data : FALLBACK)
  } catch (err) {
    console.error('[Skills] Supabase error:', err.message)
    res.json(FALLBACK)
  }
})

export default router