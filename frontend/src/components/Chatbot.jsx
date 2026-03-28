import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendMessage } from '../services/api'
import './Chatbot.css'

const SUGGESTIONS = [
  'What projects has Vanshika built?',
  'What are her top skills?',
  'Is she available for work?',
  'Tell me about her experience',
]

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Vanshika's AI assistant ✦ Ask me anything about her projects, skills, or experience.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    try {
      const data = await sendMessage(msg)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't connect to the server right now. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <motion.div
        className="chat-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="chatbot"
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 60, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="chatbot__header">
          <div className="chatbot__header-info">
            <div className="chatbot__avatar">✦</div>
            <div>
              <div className="chatbot__name">Vanshika's AI</div>
              <div className="chatbot__status">
                <span className="chatbot__status-dot" />
                Online
              </div>
            </div>
          </div>
          <button className="chatbot__close" onClick={onClose} aria-label="Close chat">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot__messages">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`chat-msg chat-msg--${msg.role}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {msg.role === 'assistant' && (
                  <div className="chat-msg__avatar">✦</div>
                )}
                <div className="chat-msg__bubble">
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                className="chat-msg chat-msg--assistant"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                key="loading"
              >
                <div className="chat-msg__avatar">✦</div>
                <div className="chat-msg__bubble chat-msg__bubble--typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="chatbot__suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="chatbot__suggestion"
                onClick={() => handleSend(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot__input-row">
          <textarea
            ref={inputRef}
            className="chatbot__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything about Vanshika…"
            rows={1}
            disabled={loading}
          />
          <motion.button
            className="chatbot__send"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <SendIcon />
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}