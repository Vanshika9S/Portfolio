import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

// GET all ideas
router.get('/', async (_req, res) => {
  if (!supabase) return res.json([])
  try {
    const { data, error } = await supabase
      .from('project_ideas')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    res.json(data || [])
  } catch (err) {
    console.error('[Ideas] GET error:', err.message)
    res.status(500).json({ error: 'Failed to fetch ideas' })
  }
})

// POST add idea (visitor)
router.post('/', async (req, res) => {
  const { title, description, tech_stack } = req.body
  if (!title?.trim() || !description?.trim()) {
    return res.status(400).json({ error: 'Title and description are required' })
  }
  try {
    const { data, error } = await supabase
      .from('project_ideas')
      .insert([{
        title: title.trim(),
        description: description.trim(),
        tech_stack: Array.isArray(tech_stack) ? tech_stack : [],
        added_by: 'visitor',
      }])
      .select()
      .single()
    if (error) throw error
    res.json({ success: true, idea: data })
  } catch (err) {
    console.error('[Ideas] POST error:', err.message)
    res.status(500).json({ error: 'Failed to submit idea' })
  }
})

// POST add idea (admin/me)
router.post('/admin', async (req, res) => {
  const { title, description, tech_stack, secret } = req.body

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!title?.trim() || !description?.trim()) {
    return res.status(400).json({ error: 'Title and description are required' })
  }
  try {
    const { data, error } = await supabase
      .from('project_ideas')
      .insert([{
        title: title.trim(),
        description: description.trim(),
        tech_stack: Array.isArray(tech_stack) ? tech_stack : [],
        added_by: 'me',
      }])
      .select()
      .single()
    if (error) throw error
    res.json({ success: true, idea: data })
  } catch (err) {
    console.error('[Ideas] POST admin error:', err.message)
    res.status(500).json({ error: 'Failed to submit idea' })
  }
})

export default router