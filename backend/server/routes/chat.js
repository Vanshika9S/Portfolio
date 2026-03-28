import { Router } from 'express'
import Groq from 'groq-sdk'
import { supabase } from '../config/supabase.js'

const router = Router()

const FALLBACK_PROJECTS = [
  { title: 'AI Chat Platform', description: 'Real-time collaborative AI chat', tech_stack: 'React, Node.js, Socket.io' },
  { title: 'E-Commerce Dashboard', description: 'Full-stack admin dashboard with analytics', tech_stack: 'Next.js, PostgreSQL' },
]
const FALLBACK_SKILLS = [
  { name: 'Python', level: 75 },
  { name: 'C++', level: 70 },
  { name: 'C', level: 72 },
  { name: 'DSA', level: 55 },
  { name: 'React', level: 65 },
  { name: 'Node.js', level: 60 },
  { name: 'SQL', level: 65 },
  { name: 'CSS', level: 70 },
  { name: 'Git / GitHub', level: 67 },
]

router.post('/', async (req, res) => {
  const { message } = req.body

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' })
  }

  let projects = FALLBACK_PROJECTS
  let skills = FALLBACK_SKILLS

  if (supabase) {
    try {
      const [pRes, sRes] = await Promise.all([
        supabase.from('projects').select('title, description, tech_stack, github_link, demo_link'),
        supabase.from('skills').select('name, level'),
      ])
      if (pRes.data?.length) projects = pRes.data
      if (sRes.data?.length) skills = sRes.data
    } catch (err) {
      console.warn('[Chat] Supabase fetch failed, using fallback:', err.message)
    }
  }

  const systemPrompt = `You are Vanshika's personal AI assistant embedded in her portfolio website.
Answer questions about Vanshika in a friendly, concise, and professional manner.
Only answer based on the portfolio data below. If something isn't covered, say you don't have that info.

=== ABOUT VANSHIKA ===
Name: Vanshika
Role: CS Student (1st year)
Education: B.Tech in Computer Science, Veermata Jijabai Technological Institute (VJTI), Mumbai (2024–2028) in second year college.
Still learning and exploring — open to new technologies and opportunities.
Hobbies: Binge-watching, learning new sports, playing with friends.

=== PROJECTS ===
${projects.map((p, i) => `${i + 1}. ${p.title}: ${p.description} (Stack: ${p.tech_stack})`).join('\n')}

=== SKILLS ===
${skills.map((s) => `${s.name}: ${s.level}%`).join(', ')}

=== GUIDELINES ===
- Be warm, friendly, and concise.
- Keep answers under 150 words.
- Do not make up information not present above.`

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) {
    return res.json({
      reply: "I'm currently offline — the AI backend isn't configured yet.",
    })
  }

  try {
    const groq = new Groq({ apiKey: groqKey })

    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message.trim() },
      ],
      max_tokens: 400,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content?.trim()
    if (!reply) throw new Error('Empty response from Groq')

    res.json({ reply })
  } catch (err) {
    console.error('[Chat] Groq error:', err.message)
    res.status(500).json({
      reply: "Sorry, I'm having trouble connecting to the AI right now. Please try again.",
    })
  }
})

export default router