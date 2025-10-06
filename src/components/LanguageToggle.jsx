import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import '../styles/LanguageToggle.css'

function LanguageToggle() {
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' }
  ]

  const currentLang = languages.find(l => l.code === language) || languages[0]

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="language-toggle">
      <button
        className="language-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="lang-flag">{currentLang.flag}</span>
        <span className="lang-code">{currentLang.label}</span>
        <i className={`fas fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-label">{lang.label}</span>
              {language === lang.code && <i className="fas fa-check"></i>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageToggle
