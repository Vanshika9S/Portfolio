import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { getSkills } from '../services/api'
import './Skills.css'

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

const CATEGORIES = [
  { label: 'Languages', icon: '⬡', skills: ['Python', 'C++', 'C', 'SQL'] },
  { label: 'Web', icon: '⬡', skills: ['React', 'Node.js', 'CSS'] },
  { label: 'Tools', icon: '⬡', skills: ['Git', 'GitHub', 'Supabase'] },
  { label: 'Exploring', icon: '⬡', skills: ['TypeScript', 'Docker',  'System Design'] },
]

export default function Skills() {
  const [skills, setSkills] = useState(FALLBACK_SKILLS)
  const [ref, inView] = useInView(0.15)

  useEffect(() => {
    getSkills()
      .then((data) => { if (data?.length) setSkills(data) })
      .catch(() => {})
  }, [])

  return (
    <section className="skills section" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="skills__header"
        >
          <p className="section-label">What I Know</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A curated set of tools and technologies I've worked with across
            full-stack development.
          </p>
        </motion.div>

        <div className="skills__grid">
          {/* Progress bars */}
          <div className="skills__bars">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-bar"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="skill-bar__header">
                  <span className="skill-bar__name">{skill.name}</span>
                  <span className="skill-bar__level">{skill.level}%</span>
                </div>
                <div className="skill-bar__track">
                  <motion.div
                    className="skill-bar__fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.07 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Category tags */}
          <div className="skills__categories">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                className="skill-cat"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
              >
                <div className="skill-cat__header">
                  <span className="skill-cat__icon">{cat.icon}</span>
                  <h3 className="skill-cat__label">{cat.label}</h3>
                </div>
                <div className="skill-cat__tags">
                  {cat.skills.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}