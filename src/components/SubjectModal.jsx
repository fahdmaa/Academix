import { useEffect } from 'react'
import '../styles/SubjectModal.css'

function SubjectModal({ subject, isOpen, onClose }) {
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

  return (
    <div className="subject-modal-overlay" onClick={onClose}>
      <div className="subject-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="subject-modal-close" onClick={onClose} aria-label="Fermer">
          <i className="fas fa-times"></i>
        </button>

        <div className="subject-modal-header">
          <div className="subject-modal-icon">
            <i className={`fas ${subject.icon}`}></i>
          </div>
          <h2 className="subject-modal-title">{subject.title}</h2>
        </div>

        <div className="subject-modal-body">
          <p className="subject-modal-description">{subject.fullDescription}</p>

          {subject.topics && subject.topics.length > 0 && (
            <div className="subject-modal-section">
              <h3 className="subject-modal-subtitle">
                <i className="fas fa-book-open"></i>
                Thèmes Abordés
              </h3>
              <ul className="subject-modal-topics">
                {subject.topics.map((topic, index) => (
                  <li key={index} className="subject-modal-topic">
                    <i className="fas fa-check-circle"></i>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {subject.skills && subject.skills.length > 0 && (
            <div className="subject-modal-section">
              <h3 className="subject-modal-subtitle">
                <i className="fas fa-lightbulb"></i>
                Compétences Développées
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
                  <strong>Durée recommandée</strong>
                  <p>{subject.duration}</p>
                </div>
              </div>
              {subject.level && (
                <div className="subject-modal-info-item">
                  <i className="fas fa-signal"></i>
                  <div>
                    <strong>Niveau</strong>
                    <p>{subject.level}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="subject-modal-cta">
            <a href="#appointment" className="subject-modal-btn" onClick={onClose}>
              <i className="fas fa-calendar-check"></i>
              Réserver une Séance
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectModal
