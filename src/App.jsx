import StaggeredMenuNew from './components/StaggeredMenuNew'
import Hero from './components/Hero'
import Services from './components/Services'
import Subjects from './components/Subjects'
import Appointment from './components/Appointment'
import Footer from './components/Footer'
import PlasmaBackground from './components/PlasmaBackground'

const menuItems = [
  { label: 'Accueil', ariaLabel: 'Aller à l\'accueil', link: '#home' },
  { label: 'Services', ariaLabel: 'Voir nos services', link: '#services' },
  { label: 'Matières', ariaLabel: 'Découvrir les matières', link: '#subjects' },
  { label: 'Réservation', ariaLabel: 'Réserver une séance', link: '#appointment' }
];

function App() {
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
