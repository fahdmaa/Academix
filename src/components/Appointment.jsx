import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Appointment() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    sessionType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const apiEndpoint = isDevelopment
        ? 'http://localhost:3000/api/submit-form'
        : '/api/submit-form'

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          language: 'fr'
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi')
      }

      // Show success message
      setShowSuccess(true)

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        sessionType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="appointment-section" id="appointment">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('appointmentTitle')}</h2>
          <p className="section-description">
            {t('appointmentDescription')}
          </p>
        </div>

        <div className="appointment-container">
          <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">{t('firstName')}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('firstNamePlaceholder')}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">{t('lastName')}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('lastNamePlaceholder')}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t('phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('phonePlaceholder')}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('subject')}</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('chooseSubject')}</option>
                  <option value="financial-accounting">{t('subject1Title')}</option>
                  <option value="management-accounting">{t('subject2Title')}</option>
                  <option value="corporate-finance">{t('subject3Title')}</option>
                  <option value="financial-analysis">{t('subject4Title')}</option>
                  <option value="taxation">{t('subject5Title')}</option>
                  <option value="auditing">{t('subject6Title')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sessionType">{t('sessionType')}</label>
                <select
                  id="sessionType"
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('chooseType')}</option>
                  <option value="individual">{t('individual')}</option>
                  <option value="group">{t('group')}</option>
                  <option value="online">{t('online')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferredDate">{t('preferredDate')}</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredTime">{t('preferredTime')}</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('chooseTime')}</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">{t('message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder={t('messagePlaceholder')}
                ></textarea>
              </div>

              <div className="form-group full-width">
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <i className="fas fa-circle-check"></i>
                  <span>{isSubmitting ? t('sending') : t('bookSessionBtn')}</span>
                </button>
              </div>
            </form>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-message show">
          <div className="success-content">
            <div className="success-icon">
              <i className="fas fa-circle-check"></i>
            </div>
            <h3>{t('bookingConfirmed')}</h3>
            <p>{t('bookingThankYou')}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Appointment
