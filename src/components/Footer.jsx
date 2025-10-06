import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-gradient"></div>
      </div>

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
            <div className="footer-badge">
              <i className="fas fa-graduation-cap"></i>
              <span>{t('since2024')}</span>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              <i className="fas fa-link"></i>
              {t('quickLinks')}
            </h4>
            <ul className="footer-links">
              <li><a href="#services"><i className="fas fa-chevron-right"></i>{t('services')}</a></li>
              <li><a href="#subjects"><i className="fas fa-chevron-right"></i>{t('subjects')}</a></li>
              <li><a href="#appointment"><i className="fas fa-chevron-right"></i>{t('reservation')}</a></li>
              <li><a href="#about"><i className="fas fa-chevron-right"></i>{t('about')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              <i className="fas fa-envelope"></i>
              {t('contact')}
            </h4>
            <ul className="footer-links footer-contact">
              <li>
                <a href="mailto:contact@academix.com">
                  <i className="fas fa-paper-plane"></i>
                  <span>contact@academix.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+33123456789">
                  <i className="fas fa-phone-alt"></i>
                  <span>+33 1 23 45 67 89</span>
                </a>
              </li>
              <li>
                <div className="footer-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{t('location')}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">
              <i className="fas fa-share-alt"></i>
              {t('followUs')}
            </h4>
            <div className="social-links-modern">
              <a href="#" aria-label="Facebook" className="social-link-fb">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link-ln">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="Instagram" className="social-link-ig">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter" className="social-link-tw">
                <i className="fab fa-twitter"></i>
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
              <i className="fas fa-copyright"></i>
              {new Date().getFullYear()} Academix. {t('allRightsReserved')}
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
