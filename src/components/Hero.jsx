import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const { t, language } = useLanguage()

  const stats = [
    {
      value: '1-à-1',
      label: language === 'fr' ? 'Accompagnement Sur-Mesure' : 'Tailored 1-on-1 Mentorship',
      icon: 'fa-user-graduate'
    },
    {
      value: '100%',
      label: language === 'fr' ? 'Flexible & Personnalisé' : '100% Flexible Sessions',
      icon: 'fa-clock'
    },
    {
      value: '+500h',
      label: language === 'fr' ? 'De cours dispensés' : 'Hours of Tutoring Delivered',
      icon: 'fa-chalkboard-teacher'
    },
    {
      value: 'L1 → Master',
      label: language === 'fr' ? 'Tous niveaux académiques' : 'All Academic Levels',
      icon: 'fa-award'
    }
  ]

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-sparkle">✦</span>
            <span className="hero-badge-text">
              {language === 'fr' ? 'Excellence en Finance & Comptabilité' : 'Excellence in Finance & Accounting'}
            </span>
          </div>

          <h1 className="hero-title">
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
            <a href="#subjects" className="btn-secondary-glass">
              <span>{language === 'fr' ? 'Explorer les Matières' : 'Explore Subjects'}</span>
              <i className="fas fa-chevron-down"></i>
            </a>
          </div>

          <div className="hero-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="hero-stat-card">
                <div className="hero-stat-icon">
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

