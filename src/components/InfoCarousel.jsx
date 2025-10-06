import { useState, useEffect } from 'react'

function InfoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: 'fa-clock',
      title: 'Horaires Flexibles',
      description: 'Choisissez des créneaux qui s\'adaptent à votre emploi du temps chargé'
    },
    {
      icon: 'fa-laptop',
      title: 'En Ligne et Présentiel',
      description: 'Options d\'apprentissage flexibles pour répondre à vos préférences'
    },
    {
      icon: 'fa-user-graduate',
      title: 'Guidance d\'Expert',
      description: 'Apprenez auprès de professionnels de la finance expérimentés'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="info-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="carousel-icon">
              <i className={`fas ${slide.icon}`}></i>
            </div>
            <h3 className="carousel-title">{slide.title}</h3>
            <p className="carousel-description">{slide.description}</p>
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default InfoCarousel
