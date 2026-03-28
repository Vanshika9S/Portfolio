import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const payload = {
    name: name.trim().slice(0, 100),
    email: email.trim().toLowerCase().slice(0, 254),
    message: message.trim().slice(0, 2000),
  }

  // Always log it
  console.log('[Contact] Message received:', payload)

  // Try saving to Supabase but don't fail if it errors
  if (supabase) {
    try {
      const { error } = await supabase.from('messages').insert([payload])
      if (error) console.warn('[Contact] Supabase insert warning:', error.message)
    } catch (err) {
      console.warn('[Contact] Supabase error (non-fatal):', err.message)
    }
  }

  // Always return success
  res.json({ success: true, message: 'Message sent successfully!' })
})

export default router