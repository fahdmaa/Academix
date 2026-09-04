import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import '../styles/SubjectModal.css'

function SubjectModal({ subject, isOpen, onClose }) {
  const { t, language } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !subject) return null

  const subjectTitle = subject.titleKey ? t(subject.titleKey) : subject.title

  return (
    <div className="subject-modal-overlay" onClick={onClose}>
      <div className="subject-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="subject-modal-grabber" aria-hidden="true"></div>

        <button className="subject-modal-close" onClick={onClose} aria-label={t('close') || 'Fermer'}>
          <i className="fas fa-xmark"></i>
        </button>

        <div className="subject-modal-header">
          <div className="subject-modal-icon">
            <i className={`fas ${subject.icon}`}></i>
          </div>
          <h2 className="subject-modal-title">{subjectTitle}</h2>
          {subject.level && <span className="subject-modal-badge">{subject.level}</span>}
        </div>

        <div className="subject-modal-body">
          <p className="subject-modal-description">{subject.fullDescription}</p>

          {subject.topics && subject.topics.length > 0 && (
            <div className="subject-modal-section">
              <h3 className="subject-modal-subtitle">
                <i className="fas fa-book-bookmark"></i>
                {language === 'fr' ? 'Thèmes Abordés' : 'Key Topics Covered'}
              </h3>
              <ul className="subject-modal-topics">
                {subject.topics.map((topic, index) => (
                  <li key={index} className="subject-modal-topic">
                    <i className="fas fa-circle-check"></i>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {subject.skills && subject.skills.length > 0 && (
            <div className="subject-modal-section">
              <h3 className="subject-modal-subtitle">
                <i className="fas fa-bolt"></i>
                {language === 'fr' ? 'Compétences Développées' : 'Core Skills Acquired'}
              </h3>
              <div className="subject-modal-skills">
                {subject.skills.map((skill, index) => (
                  <span key={index} className="subject-modal-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {subject.duration && (
            <div className="subject-modal-info">
              <div className="subject-modal-info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>{language === 'fr' ? 'Durée Recommandée' : 'Recommended Duration'}</strong>
                  <p>{subject.duration}</p>
                </div>
              </div>
              {subject.level && (
                <div className="subject-modal-info-item">
                  <i className="fas fa-layer-group"></i>
                  <div>
                    <strong>{language === 'fr' ? 'Niveau Ciblé' : 'Target Level'}</strong>
                    <p>{subject.level}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="subject-modal-cta">
            <a href="#appointment" className="subject-modal-btn" onClick={onClose}>
              <span>{t('bookSession')}</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectModal
