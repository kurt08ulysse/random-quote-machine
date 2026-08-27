import { useEffect, useState } from 'react'
import './App.css'

const quotes = [
  { text: 'L’avenir appartient à ceux qui croient à la beauté de leurs rêves.', author: 'Eleanor Roosevelt' },
  { text: 'Fais ce que ton cœur te dit d’être juste, car tu seras critiqué de toute façon.', author: 'Eleanor Roosevelt' },
  { text: 'Tout ce que tu peux imaginer est réel.', author: 'Pablo Picasso' },
  { text: 'Cela semble toujours impossible, jusqu’à ce qu’on le fasse.', author: 'Nelson Mandela' },
  { text: 'Nous sommes ce que nous faisons de manière répétée. L’excellence est donc une habitude.', author: 'Aristote' },
  { text: 'Le vieux se chauffe avec le bois qu’il a coupé dans sa jeunesse.', author: 'Proverbe gabonais' },
  { text: 'Un seul doigt ne peut pas laver le visage.', author: 'Proverbe gabonais' },
  { text: 'La rivière qui coule ne porte pas toujours de l’eau claire.', author: 'Proverbe gabonais' },
  { text: 'Celui qui marche seul va plus vite, mais celui qui marche avec les autres va plus loin.', author: 'Proverbe gabonais' },
  { text: 'La patience est la clé qui ouvre toutes les portes.', author: 'Proverbe gabonais' },
  { text: 'L’enfant qui demande son chemin ne se perd jamais dans la forêt.', author: 'Proverbe gabonais' },
  { text: 'Quand deux éléphants se battent, c’est l’herbe qui souffre.', author: 'Proverbe africain' },
  { text: 'La parole est comme l’eau : une fois versée, on ne peut plus la ramasser.', author: 'Proverbe africain' },
  { text: 'Le soleil ne s’oublie jamais dans le village où il s’est levé.', author: 'Proverbe africain' },
  { text: 'Celui qui a planté un arbre avant de mourir n’a pas vécu inutilement.', author: 'Proverbe africain' },
  { text: 'Le succès, c’est tomber sept fois et se relever huit fois.', author: 'Proverbe japonais' },
  { text: 'La vie est un mystère qu’il faut vivre, et non un problème à résoudre.', author: 'Gandhi' },
  { text: 'Chaque jour est une nouvelle chance de changer sa vie.', author: 'Anonyme' },
  { text: 'Le meilleur moment pour commencer, c’était hier. Le deuxième meilleur moment, c’est maintenant.', author: 'Proverbe chinois' },
  { text: 'La créativité demande du courage.', author: 'Henri Matisse' },
]

async function fetchFrenchQuote() {
  const response = await fetch('https://dummyjson.com/quotes/random')
  if (!response.ok) throw new Error('Quote request failed')
  const remoteQuote = await response.json()
  const translationResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(remoteQuote.quote)}&langpair=en|fr`)
  if (!translationResponse.ok) throw new Error('Translation request failed')
  const translation = await translationResponse.json()
  return { text: translation.responseData.translatedText, author: remoteQuote.author }
}

function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length))
  const [quote, setQuote] = useState(() => quotes[quoteIndex])
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${quote.text}” — ${quote.author}`)}`

  useEffect(() => {
    fetchFrenchQuote().then(setQuote).catch(() => {})
  }, [])

  function showNewQuote() {
    setQuoteIndex((current) => {
      const nextIndex = (current + 1) % quotes.length
      setQuote(quotes[nextIndex])
      return nextIndex
    })
    fetchFrenchQuote().then(setQuote).catch(() => {})
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <img className="mark" src={`${import.meta.env.BASE_URL}e67df28d-372e-4c9d-a287-ae661730fbbe.png`} alt="The Daily Pause" />
        <span className="brand">The daily pause</span>
        <span className="issue">No. 0{quoteIndex + 1}</span>
      </header>
      <section id="quote-box" className="quote-box">
        <div className="quote-intro"><span className="eyebrow">Une pensée à retenir</span><span className="rule" aria-hidden="true"></span></div>
        <div className="quote-content">
          <span className="quote-symbol" aria-hidden="true">“</span>
          <div className="quote-copy"><p id="text">{quote.text}</p><p id="author">— {quote.author}</p></div>
        </div>
        <div className="quote-actions">
          <a id="tweet-quote" href={tweetUrl} target="_blank" rel="noreferrer" aria-label="Partager la citation actuelle"><span aria-hidden="true">↗</span> Partager cette pensée</a>
          <button id="new-quote" type="button" onClick={showNewQuote}>Nouvelle citation <span aria-hidden="true">→</span></button>
        </div>
      </section>
      <footer className="site-footer"><span>Des mots pour ralentir</span><span className="footer-dot" aria-hidden="true">·</span><span>Conçu par Kurt Ulysse</span></footer>
    </main>
  )
}

export default App
