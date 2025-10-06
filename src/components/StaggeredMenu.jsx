import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

function StaggeredMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme()

  const menuItems = [
    { href: '#home', text: 'Accueil' },
    { href: '#services', text: 'Services' },
    { href: '#subjects', text: 'Matières' },
    { href: '#appointment', text: 'Réservation' }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <img
                src={theme === 'light' ? '/images/logos/logo-light.png' : '/images/logos/logo-dark.png'}
                alt="Academix Logo"
                className="logo-image"
              />
            </div>

            <div className="nav-actions">
              <ThemeToggle />

              <button
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="nav-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <a
                    href={item.href}
                    className="nav-link"
                    onClick={handleMenuClick}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default StaggeredMenu
