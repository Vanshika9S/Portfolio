import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'
import './styles/app.css'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="app">
      <Navbar onChatOpen={() => setChatOpen(true)} />
      <main>
        <Hero onChatOpen={() => setChatOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Floating chat button */}
      <motion.button
        className="chat-fab"
        onClick={() => setChatOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        aria-label="Open AI Chat"
      >
        <span className="chat-fab__icon">✦</span>
        <span className="chat-fab__label">Ask AI</span>
      </motion.button>

      <AnimatePresence>
        {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}