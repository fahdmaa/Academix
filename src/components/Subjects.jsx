import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import SubjectModal from './SubjectModal'

function Subjects() {
  const { t } = useLanguage()
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const subjects = [
    {
      icon: 'fa-calculator',
      titleKey: 'subject1Title',
      descriptionKey: 'subject1Description',
      fullDescription: 'La comptabilité financière est le pilier de toute entreprise. Ce cours vous permettra de maîtriser l\'enregistrement des transactions, la préparation des états financiers (bilan, compte de résultat, flux de trésorerie), et les principes comptables fondamentaux selon les normes internationales.',
      topics: [
        'Principes comptables et normes IFRS/GAAP',
        'Enregistrement des opérations courantes',
        'Préparation du bilan et compte de résultat',
        'Analyse des flux de trésorerie',
        'Consolidation des états financiers',
        'Régularisations et provisions'
      ],
      skills: ['Rigueur', 'Analyse', 'Conformité', 'Documentation'],
      duration: '3-6 mois (selon niveau)',
      level: 'Débutant à Avancé'
    },
    {
      icon: 'fa-chart-pie',
      titleKey: 'subject2Title',
      descriptionKey: 'subject2Description',
      fullDescription: 'La comptabilité de gestion est un outil stratégique pour optimiser les performances de l\'entreprise. Apprenez à calculer les coûts, établir des budgets prévisionnels, analyser les écarts et prendre des décisions éclairées pour maximiser la rentabilité.',
      topics: [
        'Calcul et analyse des coûts (complets, partiels)',
        'Méthodes de costing (ABC, coûts standards)',
        'Budgets prévisionnels et suivi',
        'Analyse des écarts (budget vs réalisé)',
        'Tableaux de bord et KPIs',
        'Prise de décision opérationnelle'
      ],
      skills: ['Analyse stratégique', 'Budgétisation', 'Optimisation', 'Reporting'],
      duration: '2-4 mois',
      level: 'Intermédiaire'
    },
    {
      icon: 'fa-building',
      titleKey: 'subject3Title',
      descriptionKey: 'subject3Description',
      fullDescription: 'Maîtrisez les décisions financières stratégiques de l\'entreprise : investissements, financement, structure du capital et gestion de la valeur. Apprenez à évaluer les projets d\'investissement et optimiser le mix de financement.',
      topics: [
        'Évaluation des projets d\'investissement (VAN, TRI)',
        'Structure optimale du capital',
        'Politique de dividendes',
        'Gestion du fonds de roulement',
        'Levées de fonds et modes de financement',
        'Valorisation d\'entreprise'
      ],
      skills: ['Évaluation financière', 'Stratégie', 'Modélisation', 'Décision d\'investissement'],
      duration: '3-5 mois',
      level: 'Intermédiaire à Avancé'
    },
    {
      icon: 'fa-chart-line',
      titleKey: 'subject4Title',
      descriptionKey: 'subject4Description',
      fullDescription: 'L\'analyse financière est essentielle pour évaluer la santé et la performance d\'une entreprise. Apprenez à décrypter les états financiers, calculer les ratios clés et porter un diagnostic complet sur la situation financière d\'une organisation.',
      topics: [
        'Analyse du bilan (structure, liquidité, solvabilité)',
        'Analyse du compte de résultat (rentabilité, marges)',
        'Ratios financiers (liquidité, rentabilité, gearing)',
        'Analyse de la rentabilité (ROE, ROA, ROCE)',
        'Diagnostic financier global',
        'Analyse comparative et sectorielle'
      ],
      skills: ['Diagnostic financier', 'Analyse de ratios', 'Évaluation', 'Synthèse'],
      duration: '2-3 mois',
      level: 'Tous niveaux'
    },
    {
      icon: 'fa-file-invoice-dollar',
      titleKey: 'subject5Title',
      descriptionKey: 'subject5Description',
      fullDescription: 'La fiscalité est un levier stratégique pour optimiser la charge fiscale tout en respectant la réglementation. Ce cours couvre la fiscalité des entreprises et des particuliers, l\'optimisation fiscale légale et la conformité aux obligations déclaratives.',
      topics: [
        'Impôt sur les sociétés (IS)',
        'Taxe sur la valeur ajoutée (TVA)',
        'Impôt sur le revenu (IR)',
        'Fiscalité internationale et prix de transfert',
        'Optimisation fiscale légale',
        'Déclarations et obligations fiscales'
      ],
      skills: ['Conformité fiscale', 'Optimisation', 'Veille réglementaire', 'Planification'],
      duration: '3-5 mois',
      level: 'Intermédiaire à Avancé'
    },
    {
      icon: 'fa-clipboard-check',
      titleKey: 'subject6Title',
      descriptionKey: 'subject6Description',
      fullDescription: 'L\'audit est un processus systématique d\'évaluation des états financiers et des contrôles internes. Apprenez les normes d\'audit internationales, les techniques de vérification, et comment conduire une mission d\'audit de A à Z.',
      topics: [
        'Normes d\'audit internationales (ISA)',
        'Planification et stratégie d\'audit',
        'Évaluation du contrôle interne',
        'Techniques d\'échantillonnage',
        'Procédures substantives et tests',
        'Rapport d\'audit et opinions'
      ],
      skills: ['Contrôle', 'Évaluation des risques', 'Méthodologie', 'Indépendance'],
      duration: '4-6 mois',
      level: 'Avancé'
    }
  ]

  const handleOpenModal = (subject) => {
    setSelectedSubject(subject)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedSubject(null), 300)
  }

  return (
    <>
      <section className="subjects-section" id="subjects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('subjectsTitle')}</h2>
            <p className="section-description">
              {t('subjectsDescription')}
            </p>
          </div>

          <div className="subject-grid">
            {subjects.map((subject, index) => (
              <div key={index} className="subject-card">
                <div className="subject-icon">
                  <i className={`fas ${subject.icon}`}></i>
                </div>
                <h3 className="subject-title">{t(subject.titleKey)}</h3>
                <p className="subject-description">{t(subject.descriptionKey)}</p>
                <button className="learn-more-btn" onClick={() => handleOpenModal(subject)}>
                  {t('learnMore')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubjectModal
        subject={selectedSubject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Subjects
