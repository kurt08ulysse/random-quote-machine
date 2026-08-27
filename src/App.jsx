import { useEffect, useState } from 'react'
import './App.css'

const quotes = [
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'Do what you feel in your heart to be right, for you’ll be criticized anyway.', author: 'Eleanor Roosevelt' },
  { text: 'Everything you can imagine is real.', author: 'Pablo Picasso' },
  { text: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
  { text: 'Le vieux se chauffe avec le bois qu’il a coupé dans sa jeunesse.', author: 'Proverbe gabonais' },
  { text: 'Un seul doigt ne peut pas laver le visage.', author: 'Proverbe gabonais' },
  { text: 'La rivière qui coule ne porte pas toujours de l’eau claire.', author: 'Proverbe gabonais' },
  { text: 'Celui qui marche seul va plus vite, mais celui qui marche avec les autres va plus loin.', author: 'Proverbe gabonais' },
]

function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length))
  const [quote, setQuote] = useState(() => quotes[quoteIndex])
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${quote.text}” — ${quote.author}`)}`

  useEffect(() => {
    fetch('https://dummyjson.com/quotes/random')
      .then((response) => {
        if (!response.ok) throw new Error('Quote request failed')
        return response.json()
      })
      .then((remoteQuote) => setQuote({ text: remoteQuote.quote, author: remoteQuote.author }))
      .catch(() => {})
  }, [])

  function showNewQuote() {
    setQuoteIndex((current) => (current + 1) % quotes.length)
    setQuote(quotes[(quoteIndex + 1) % quotes.length])
    fetch('https://dummyjson.com/quotes/random')
      .then((response) => {
        if (!response.ok) throw new Error('Quote request failed')
        return response.json()
      })
      .then((remoteQuote) => setQuote({ text: remoteQuote.quote, author: remoteQuote.author }))
      .catch(() => {})
  }

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
          <button id="new-quote" type="button" onClick={showNewQuote}>New quote <span aria-hidden="true">→</span></button>
        </div>
      </section>
      <footer className="site-footer"><span>Words for slower moments</span><span className="footer-dot" aria-hidden="true">·</span><span>Designed and built by Kurt Ulysse</span></footer>
    </main>
  )
}

export default App
