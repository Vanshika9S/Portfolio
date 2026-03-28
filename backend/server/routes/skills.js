import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

const FALLBACK = [
  { id: '1',name: 'Python', level: 75 },
  { id: '2',name: 'C++', level: 70 },
  { id: '3',name: 'C', level: 72 },
  { id: '4',name: 'DSA', level: 55 },
  { id: '5',name: 'React', level: 65 },
  { id: '6',name: 'Node.js', level: 60 },
  { id: '7',name: 'SQL', level: 65 },
  { id: '8',name: 'CSS', level: 70 },
  { id: '9',name: 'Git / GitHub', level: 67 },
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