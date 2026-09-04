import { useLanguage } from './context/LanguageContext'
import StaggeredMenuNew from './components/StaggeredMenuNew'
import Hero from './components/Hero'
import Services from './components/Services'
import Subjects from './components/Subjects'
import Appointment from './components/Appointment'
import Footer from './components/Footer'
import PlasmaBackground from './components/PlasmaBackground'

function App() {
  const { t, language } = useLanguage()

  const menuItems = [
    { 
      label: language === 'fr' ? 'Accueil' : 'Home', 
      ariaLabel: language === 'fr' ? 'Aller à l\'accueil' : 'Go to home', 
      link: '#home' 
    },
    { 
      label: t('services'), 
      ariaLabel: language === 'fr' ? 'Voir nos services' : 'View our services', 
      link: '#services' 
    },
    { 
      label: t('subjects'), 
      ariaLabel: language === 'fr' ? 'Découvrir les matières' : 'Discover subjects', 
      link: '#subjects' 
    },
    { 
      label: t('reservation'), 
      ariaLabel: language === 'fr' ? 'Réserver une séance' : 'Book a session', 
      link: '#appointment' 
    }
  ]

  return (
    <>
      <PlasmaBackground />
      <StaggeredMenuNew
        position="right"
        items={menuItems}
        displayItemNumbering={true}
      />

      <main>
        <Hero />
        <Services />
        <Subjects />
        <Appointment />
      </main>

      <Footer />
    </>
  )
}

export default App

