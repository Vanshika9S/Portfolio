import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function About() {
  const [ref, inView] = useInView(0.2)

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about__inner"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <div className="about__left">
            <motion.p className="section-label" variants={fadeUp}>About Me</motion.p>
            <motion.h2 className="section-title" variants={fadeUp}>
              Turning ideas into<br />
              <span className="about__title-accent">digital reality</span>
            </motion.h2>
            <motion.p className="about__bio" variants={fadeUp}>
              Hey! I'm Vanshika, a CS student who genuinely enjoys building things with code. I'm still learning and exploring — every project teaches me something new and I love that.
            </motion.p>
            <motion.p className="about__bio" variants={fadeUp}>
              When I'm not coding, you'll find me binge-watching shows, learning a new sport, or just playing around with friends. Also diving deep into DSA — loving the problem solving!
            </motion.p>

            <motion.div className="about__links" variants={fadeUp}>
              <a
                href="https://github.com/vanshika9s"
                target="_blank"
                rel="noreferrer"
                className="about__link"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/vanshika-shah-a52639314"
                target="_blank"
                rel="noreferrer"
                className="about__link"
              >
                LinkedIn ↗
              </a>
              <a href="/resume.pdf" className="about__link about__link--accent">
                Resume ↗
              </a>
            </motion.div>
          </div>

          <div className="about__right">
            <motion.div className="about__card" variants={fadeUp}>
              <div className="about__card-icon">🎓</div>
              <div>
                <h3 className="about__card-title">Education</h3>
                <p className="about__card-text">B.Tech in Computer Science</p>
                <p className="about__card-sub">Veermata Jijabai Technological Institute, Mumbai · 2024–2028</p>
              </div>
            </motion.div>


            <motion.div className="about__card" variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="about__card-icon">🎯</div>
              <div>
                <h3 className="about__card-title">Goal</h3>
                <p className="about__card-text">Build things that actually matter</p>
                <p className="about__card-sub">Grow through real projects, curiosity & collaboration</p>
              </div>
            </motion.div>

            <motion.div className="about__card" variants={fadeUp} transition={{ delay: 0.3 }}>
              <div className="about__card-icon">🌱</div>
              <div>
                <h3 className="about__card-title">Currently</h3>
                <p className="about__card-text">Learning & exploring</p>
                <p className="about__card-sub">Diving into DSA & always open to new technologies</p>
              </div>
            </motion.div>

            <motion.div className="about__card" variants={fadeUp} transition={{ delay: 0.4 }}>
              <div className="about__card-icon">🎮</div>
              <div>
                <h3 className="about__card-title">Outside Code</h3>
                <p className="about__card-text">Binge-watching & sports</p>
                <p className="about__card-sub">Learning new games & spending time with friends</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
          
  )
}