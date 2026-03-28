import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './Achievements.css'

const ACHIEVEMENTS = [
  {
    id: 1,
    icon: '🏆',
    title: 'MHT CET',
    badge: '100 Percentile',
    badgeType: 'gold',
    description: 'Scored a perfect 100 percentile in MHT CET — Maharashtra\'s state engineering entrance exam.',
    year: '2024',
  },
  {
    id: 2,
    icon: '🎯',
    title: 'JEE Main',
    badge: '99.697 Percentile',
    badgeType: 'gold',
    description: 'Achieved 99.697 percentile in JEE Main — one of India\'s most competitive engineering entrance exams.',
    year: '2024',
  },
  {
    id: 3,
    icon: '🌟',
    title: 'Hacktoberfest',
    badge: 'Super Contributor',
    badgeType: 'teal',
    description: 'Earned the Super Contributor badge at Hacktoberfest by making meaningful open source contributions.',
    year: '2025',
  },
]

export default function Achievements() {
  const [ref, inView] = useInView(0.15)

  return (
    <section className="achievements section" id="achievements" ref={ref}>
      <div className="container">
        <motion.div
          className="achievements__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Milestones</p>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">
            A few things I'm proud of so far — with a lot more to come.
          </p>
        </motion.div>

        <div className="achievements__grid">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.id}
              className="achievement-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <div className="achievement-card__top">
                <span className="achievement-card__icon">{item.icon}</span>
                <span className={`achievement-card__badge achievement-card__badge--${item.badgeType}`}>
                  {item.badge}
                </span>
              </div>

              <div className="achievement-card__body">
                <h3 className="achievement-card__title">{item.title}</h3>
                <p className="achievement-card__desc">{item.description}</p>
              </div>

              <div className="achievement-card__footer">
                <span className="achievement-card__year">{item.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}