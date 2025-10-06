import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const { t } = useLanguage()
  const titleRef = useRef(null)

  useEffect(() => {
    // Split text animation
    const splitText = (element) => {
      const text = element.textContent.trim()
      const words = text.split(' ')
      element.innerHTML = ''
      element.classList.add('split-text')

      let charIndex = 0
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span')
        wordSpan.className = 'word'

        for (let i = 0; i < word.length; i++) {
          const char = word[i]
          const span = document.createElement('span')
          span.className = 'char'
          span.textContent = char
          span.style.animationDelay = `${charIndex * 0.03}s`
          wordSpan.appendChild(span)
          charIndex++
        }

        element.appendChild(wordSpan)
        if (wordIndex < words.length - 1) {
          const space = document.createTextNode(' ')
          element.appendChild(space)
          charIndex++
        }
      })
    }

    if (titleRef.current) {
      splitText(titleRef.current)
    }
  }, [t])

  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <img
          src="/images/hero-classroom.jpg"
          alt="Finance classroom"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" ref={titleRef}>
              {t('heroTitle')}
            </h1>
            <p className="hero-description">
              {t('heroDescription')}
            </p>
            <div className="hero-buttons">
              <a href="#appointment" className="btn-primary">
                <span>{t('bookSession')}</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
