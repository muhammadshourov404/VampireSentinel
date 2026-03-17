import { useState, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState([
    '[+] Initializing Vampire Protocol...',
    '[+] Connecting to shadow network...',
    '[!] Threat level: CRITICAL',
    'Ready for target input...'
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws') // পরে Vercel URL দিয়ে চেঞ্জ করবো

    ws.onopen = () => {
      console.log('WebSocket connected')
      setMessages(prev => [...prev, '[+] WebSocket connection established'])
    }

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }

    ws.onclose = () => {
      setMessages(prev => [...prev, '[!] Connection closed. Reconnecting...'])
    }

    return () => ws.close()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, `> ${input}`])
    setInput('')
    // ভবিষ্যতে backend-এ scan request পাঠানো যাবে
  }

  return (
    <div className="min-h-screen bg-vampire-dark text-neon-red font-mono flex flex-col items-center p-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-glow">
        VAMPIRE SENTINEL
      </h1>
      <p className="text-xl md:text-2xl text-terminal-gray mb-8">
        Real-Time OSINT & Reconnaissance Platform
      </p>

      <div className="w-full max-w-4xl bg-black/70 border-2 border-blood-red rounded-lg p-6 shadow-2xl">
        <div className="h-96 overflow-y-auto mb-4 p-4 bg-vampire-dark/80 rounded">
          {messages.map((msg, idx) => (
            <p key={idx} className="mb-1">
              {msg}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter target (domain/IP/username)..."
            className="flex-1 bg-black border border-neon-red text-neon-red p-3 rounded-l focus:outline-none focus:border-crimson"
          />
          <button
            type="submit"
            className="bg-blood-red hover:bg-crimson text-white px-6 py-3 rounded-r font-bold transition-colors"
          >
            SCAN
          </button>
        </form>
      </div>

      <p className="mt-8 text-sm text-terminal-gray">
        Powered by VampireSquad • Muhammad Shourov © 2025
      </p>
    </div>
  )
}

export default App
