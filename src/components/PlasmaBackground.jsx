import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import '../styles/plasma.css'

function PlasmaBackground() {
  const { theme } = useTheme()
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Update theme attribute
    container.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="plasma-background" ref={containerRef} data-theme={theme}>
      <div className="plasma-gradient plasma-gradient-1"></div>
      <div className="plasma-gradient plasma-gradient-2"></div>
      <div className="plasma-gradient plasma-gradient-3"></div>
      <div className="plasma-gradient plasma-gradient-4"></div>
      <div className="plasma-gradient plasma-gradient-5"></div>
      <div className="plasma-noise"></div>
    </div>
  )
}

export default PlasmaBackground
