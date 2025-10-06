import { useLanguage } from '../context/LanguageContext'

function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: 'fa-user',
      titleKey: 'service1Title',
      descriptionKey: 'service1Description'
    },
    {
      icon: 'fa-users',
      titleKey: 'service2Title',
      descriptionKey: 'service2Description'
    },
    {
      icon: 'fa-globe',
      titleKey: 'service3Title',
      descriptionKey: 'service3Description'
    }
  ]

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('servicesTitle')}</h2>
          <p className="section-description">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="service-title">{t(service.titleKey)}</h3>
              <p className="service-description">{t(service.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
