import { useLanguage } from '../context/LanguageContext'

function Services() {
  const { t, language } = useLanguage()

  const services = [
    {
      num: '01',
      icon: 'fa-user-tie',
      titleKey: 'service1Title',
      descriptionKey: 'service1Description',
      tag: language === 'fr' ? 'Le plus populaire' : 'Most Popular',
      features: language === 'fr' 
        ? ['Diagnostic initial & plan personnalisé', 'Rythme adapté à vos échéances', 'Correction d\'exercices et cas réels']
        : ['Initial diagnostic & custom roadmap', 'Paced to your exam deadlines', 'Real-world case studies & practice']
    },
    {
      num: '02',
      icon: 'fa-users-gear',
      titleKey: 'service2Title',
      descriptionKey: 'service2Description',
      tag: language === 'fr' ? 'Collaboratif' : 'Collaborative',
      features: language === 'fr'
        ? ['Petits groupes de 2 à 4 étudiants', 'Émulation & partage d\'astuces', 'Tarifs avantageux & dynamiques']
        : ['Small groups of 2–4 students', 'Collaborative problem solving', 'Cost-effective dynamic learning']
    },
    {
      num: '03',
      icon: 'fa-laptop-code',
      titleKey: 'service3Title',
      descriptionKey: 'service3Description',
      tag: language === 'fr' ? '100% Flexible' : '100% Remote',
      features: language === 'fr'
        ? ['Plateforme interactive HD & tableau blanc', 'Replay et supports de cours partagés', 'Créneaux flexibles 7j/7']
        : ['HD interactive whiteboard setup', 'Full replay & shared study decks', 'Flexible schedule 7 days a week']
    }
  ]

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            {language === 'fr' ? 'Formats d\'apprentissage' : 'Learning Formats'}
          </div>
          <h2 className="section-title">{t('servicesTitle')}</h2>
          <p className="section-description">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card-top">
                <div className="service-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <span className="service-num">{service.num}</span>
              </div>

              {service.tag && <span className="service-tag">{service.tag}</span>}

              <h3 className="service-title">{t(service.titleKey)}</h3>
              <p className="service-description">{t(service.descriptionKey)}</p>

              <ul className="service-features">
                {service.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <i className="fas fa-circle-check"></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a href="#appointment" className="service-cta-link">
                <span>{t('bookSession')}</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

