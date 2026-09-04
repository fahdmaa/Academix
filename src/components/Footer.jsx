import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo-wrapper">
              <h3 className="footer-title">Academix</h3>
              <div className="footer-accent-line"></div>
            </div>
            <p className="footer-description">
              {t('footerTagline')}
            </p>
            <div className="footer-status-pill">
              <span className="status-dot"></span>
              <span>{language === 'fr' ? 'Sessions ouvertes • Année 2024-2025' : 'Bookings Open • Academic Year 2024-2025'}</span>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              {t('quickLinks')}
            </h4>
            <ul className="footer-links">
              <li><a href="#home">{language === 'fr' ? 'Accueil' : 'Home'}</a></li>
              <li><a href="#services">{t('services')}</a></li>
              <li><a href="#subjects">{t('subjects')}</a></li>
              <li><a href="#appointment">{t('reservation')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              {t('contact')}
            </h4>
            <ul className="footer-links footer-contact">
              <li>
                <a href="mailto:contact@ouiiprof.me">
                  <i className="fas fa-envelope"></i>
                  <span>contact@ouiiprof.me</span>
                </a>
              </li>
              <li>
                <a href="tel:+33123456789">
                  <i className="fas fa-phone"></i>
                  <span>+33 1 23 45 67 89</span>
                </a>
              </li>
              <li>
                <div className="footer-location">
                  <i className="fas fa-location-dot"></i>
                  <span>{t('location')}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              {t('followUs')}
            </h4>
            <div className="social-links-modern">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
            <div className="footer-newsletter">
              <p className="newsletter-text">{t('stayInformed')}</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Academix Education. {t('allRightsReserved')}
            </p>
            <div className="footer-legal">
              <a href="#privacy">{t('privacy')}</a>
              <span className="footer-separator">•</span>
              <a href="#terms">{t('terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

