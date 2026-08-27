import { useState } from 'react'
import './App.css'

const quotes = [
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'Do what you feel in your heart to be right, for you’ll be criticized anyway.', author: 'Eleanor Roosevelt' },
  { text: 'Everything you can imagine is real.', author: 'Pablo Picasso' },
  { text: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
]

function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length))
  const quote = quotes[quoteIndex]
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${quote.text}” — ${quote.author}`)}`

  return (
    <main className="page-shell">
      <header className="site-header">
        <span className="mark" aria-hidden="true">Q</span>
        <span className="brand">The daily pause</span>
        <span className="issue">No. 0{quoteIndex + 1}</span>
      </header>
      <section id="quote-box" className="quote-box">
        <div className="quote-intro"><span className="eyebrow">A thought worth keeping</span><span className="rule" aria-hidden="true"></span></div>
        <div className="quote-content">
          <span className="quote-symbol" aria-hidden="true">“</span>
          <div className="quote-copy"><p id="text">{quote.text}</p><p id="author">— {quote.author}</p></div>
        </div>
        <div className="quote-actions">
          <a id="tweet-quote" href={tweetUrl} target="_blank" rel="noreferrer" aria-label="Tweet the current quote"><span aria-hidden="true">↗</span> Share this thought</a>
          <button id="new-quote" type="button" onClick={() => setQuoteIndex((current) => (current + 1) % quotes.length)}>New quote <span aria-hidden="true">→</span></button>
        </div>
      </section>
      <footer className="site-footer"><span>Words for slower moments</span><span className="footer-dot" aria-hidden="true">·</span><span>Made for today</span></footer>
    </main>
  )
}

export default App
