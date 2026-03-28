import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

// GET all projects
router.get('/', async (_req, res) => {
  if (!supabase) return res.json([])
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    res.json(data || [])
  } catch (err) {
    console.error('[Projects] GET error:', err.message)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// POST add new project
router.post('/', async (req, res) => {
  const { title, description, tech_stack, github_link, demo_link, secret } = req.body

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!title?.trim() || !description?.trim()) {
    return res.status(400).json({ error: 'Title and description are required' })
  }
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: title.trim(),
        description: description.trim(),
        tech_stack: Array.isArray(tech_stack) ? tech_stack : [],
        github_link: github_link?.trim() || '',
        demo_link: demo_link?.trim() || '',
      }])
      .select()
      .single()
    if (error) throw error
    res.json({ success: true, project: data })
  } catch (err) {
    console.error('[Projects] POST error:', err.message)
    res.status(500).json({ error: 'Failed to add project' })
  }
})

// DELETE project
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    console.error('[Projects] DELETE error:', err.message)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router