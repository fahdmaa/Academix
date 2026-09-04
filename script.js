// ========================================
// ACADEMIX - VANILLA JAVASCRIPT & APPLE DESIGN SYSTEM
// ========================================

// === SUBJECTS DATA (BILINGUAL) ===
const SUBJECTS_DATA = {
  'financial-accounting': {
    icon: 'ti-calculator',
    title: {
      fr: 'Comptabilité Financière',
      en: 'Financial Accounting'
    },
    shortDesc: {
      fr: 'Maîtrisez les principes fondamentaux de la comptabilité financière et des états financiers.',
      en: 'Master the core principles of financial accounting and financial statement analysis.'
    },
    fullDesc: {
      fr: "La comptabilité financière est le pilier de toute organisation. Ce programme sur-mesure vous permet de maîtriser l'enregistrement des flux, la préparation des états de synthèse (bilan, compte de résultat, tableau des flux de trésorerie), et la conformité aux normes internationales IFRS / French GAAP.",
      en: 'Financial accounting is the backbone of every enterprise. This tailored roadmap enables you to master transaction recording, preparation of primary financial statements (balance sheet, income statement, cash flow statement), and strict compliance with IFRS & GAAP accounting standards.'
    },
    topics: {
      fr: [
        'Principes comptables fondamentaux & cadre conceptuel IFRS',
        'Enregistrement des opérations courantes et d\'inventaire',
        'Élaboration du Bilan, Compte de Résultat & Annexes',
        'Tableau des flux de trésorerie & analyse de liquidité',
        'Consolidation des comptes de groupe & retraitements',
        'Provisions, dépréciations d\'actifs & amortissements'
      ],
      en: [
        'Fundamental accounting principles & IFRS conceptual framework',
        'Daily business transaction recording & journal entries',
        'Balance Sheet, Income Statement & Notes preparation',
        'Cash Flow Statement formulation & liquidity evaluation',
        'Financial statement consolidation & group adjustments',
        'Asset depreciation, amortisation & risk provisions'
      ]
    },
    skills: {
      fr: ['Rigueur comptable', 'Analyse d\'états financiers', 'Conformité IFRS', 'Synthèse financière'],
      en: ['Accounting Rigor', 'Financial Statement Analysis', 'IFRS Compliance', 'Financial Synthesis']
    },
    duration: {
      fr: '3 - 6 mois (selon niveau)',
      en: '3 - 6 months (custom pace)'
    },
    level: {
      fr: 'Débutant à Avancé',
      en: 'Beginner to Advanced'
    }
  },

  'management-accounting': {
    icon: 'ti-chart-pie',
    title: {
      fr: 'Comptabilité de Gestion',
      en: 'Management Accounting'
    },
    shortDesc: {
      fr: 'Apprenez les outils de prise de décision, calcul de coûts et contrôle de gestion.',
      en: 'Master managerial decision tools, cost modeling, and strategic budget control.'
    },
    fullDesc: {
      fr: "La comptabilité de gestion est un levier stratégique pour piloter la rentabilité opérationnelle. Apprenez à modéliser les structures de coûts, établir des budgets prévisionnels, isoler les écarts de performance et concevoir des tableaux de bord dynamiques.",
      en: 'Management accounting provides the actionable metrics required to steer profitability. Learn to calculate full and marginal costs, craft forward-looking budgets, analyze variances, and design executive KPI dashboards.'
    },
    topics: {
      fr: [
        'Méthodes de coûts complets, variables et par activités (ABC)',
        'Calcul du seuil de rentabilité & point mort opérationnel',
        'Élaboration et suivi des budgets d\'exploitation',
        'Analyse méthodique des écarts (prix, volume, mix)',
        'Tableaux de bord opérationnels et KPIs de performance',
        'Prise de décision : rentabilité de gamme & investissement'
      ],
      en: [
        'Full costing, direct costing & Activity-Based Costing (ABC)',
        'Break-even point modeling & margin of safety calculations',
        'Operational budget forecasting and execution tracking',
        'Rigorous variance analysis (price, volume, capacity, mix)',
        'Executive dashboards and actionable performance KPIs',
        'Strategic decisions: product line profitability & outsourcing'
      ]
    },
    skills: {
      fr: ['Contrôle de gestion', 'Modélisation des coûts', 'Budgétisation', 'Pilotage de la marge'],
      en: ['Management Control', 'Cost Modeling', 'Budget Planning', 'Margin Optimization']
    },
    duration: {
      fr: '2 - 4 mois',
      en: '2 - 4 months'
    },
    level: {
      fr: 'Intermédiaire',
      en: 'Intermediate'
    }
  },

  'corporate-finance': {
    icon: 'ti-building-bank',
    title: {
      fr: 'Finance d\'Entreprise',
      en: 'Corporate Finance'
    },
    shortDesc: {
      fr: 'Comprenez le financement, l\'évaluation d\'entreprises et le choix d\'investissements.',
      en: 'Understand valuation, capital structuring, M&A dynamics, and investment decisions.'
    },
    fullDesc: {
      fr: "Maîtrisez les décisions financières stratégiques des directions financières et banques d'affaires : valorisation d'actifs, calcul du coût moyen pondéré du capital (WACC), optimisation de la structure financière, et évaluation des projets d'investissement (VAN, TRI).",
      en: 'Master the high-impact strategic decisions made by CFOs and investment bankers: DCF valuation, weighted average cost of capital (WACC), optimal capital structure, leverage dynamics, and investment appraisal (NPV, IRR).'
    },
    topics: {
      fr: [
        'Critères de choix d\'investissement (VAN, TRI, Payback)',
        'Modélisation des flux de trésorerie disponibles (FCFF / FCFE)',
        'Coût du capital & WACC (Modèle MEDAF / CAPM)',
        'Structure financière optimale et politique de dividendes',
        'Méthodes de valorisation : DCF, multiples boursiers & transactions',
        'Gestion stratégique du Besoin en Fonds de Roulement (BFR)'
      ],
      en: [
        'Investment appraisal metrics (NPV, IRR, Payback period)',
        'Free Cash Flow modeling (FCFF / FCFE)',
        'Cost of Capital & WACC (CAPM framework)',
        'Capital structure optimization & dividend policy',
        'Valuation techniques: DCF, trading multiples & precedent M&A',
        'Working Capital Requirement (WCR) optimization'
      ]
    },
    skills: {
      fr: ['Valorisation financière', 'Modélisation DCF', 'Stratégie financière', 'Décision d\'investissement'],
      en: ['Financial Valuation', 'DCF Modeling', 'Capital Strategy', 'M&A Fundamentals']
    },
    duration: {
      fr: '3 - 5 mois',
      en: '3 - 5 months'
    },
    level: {
      fr: 'Intermédiaire à Avancé',
      en: 'Intermediate to Advanced'
    }
  },

  'financial-analysis': {
    icon: 'ti-trending-up',
    title: {
      fr: 'Analyse Financière',
      en: 'Financial Analysis'
    },
    shortDesc: {
      fr: 'Développez vos compétences pour diagnostiquer la santé et la rentabilité financière.',
      en: 'Sharpen your ability to dissect balance sheets and diagnose corporate financial health.'
    },
    fullDesc: {
      fr: "L'analyse financière permet de porter un diagnostic objectif et approfondi sur la solvabilité, la liquidité et la rentabilité d'une entreprise. Apprenez à retraiter les états comptables, calculer les soldes intermédiaires de gestion (SIG) et interpréter les ratios de rentabilité économique et financière.",
      en: 'Financial analysis provides the diagnostic toolkit to evaluate solvency, liquidity, and economic performance. Learn how to reconstruct financial statements, compute intermediate management balances (SIG), and interpret ROE, ROCE, and gearing ratios.'
    },
    topics: {
      fr: [
        'Soldes Intermédiaires de Gestion (SIG) & capacité d\'autofinancement',
        'Bilan fonctionnel : FRNG, BFR, Trésorerie Nette',
        'Ratios de rentabilité (ROE, ROA, ROCE) et effet de levier',
        'Ratios de liquidité, solvabilité et couverture de la dette',
        'Diagnostic du risque de faillite (modèles de score type Altman)',
        'Analyse comparative sectorielle et benchmarking'
      ],
      en: [
        'Intermediate Operating Balances (SIG) & Cash Flow Generation',
        'Functional Balance Sheet: Working Capital, WCR & Net Cash',
        'Profitability ratios (ROE, ROA, ROCE) & Financial Leverage',
        'Liquidity, Solvency and Debt Service Coverage metrics',
        'Distress diagnosis & Bankruptcy scoring (Altman Z-Score)',
        'Cross-sectional peer benchmarking & industry analysis'
      ]
    },
    skills: {
      fr: ['Diagnostic financier', 'Analyse de ratios', 'Audit de solvabilité', 'Synthèse stratégique'],
      en: ['Financial Diagnostic', 'Ratio Analysis', 'Solvency Audit', 'Executive Synthesis']
    },
    duration: {
      fr: '2 - 3 mois',
      en: '2 - 3 months'
    },
    level: {
      fr: 'Tous niveaux',
      en: 'All Levels'
    }
  },

  'taxation': {
    icon: 'ti-receipt-tax',
    title: {
      fr: 'Fiscalité des Entreprises',
      en: 'Corporate Taxation'
    },
    shortDesc: {
      fr: 'Maîtrisez les concepts fiscaux, la TVA, l\'impôt sur les sociétés et la conformité.',
      en: 'Master corporate tax mechanics, VAT treatment, tax planning, and compliance.'
    },
    fullDesc: {
      fr: "La fiscalité est une composante essentielle de la gestion d'entreprise. Ce module vous donne une maîtrise claire de l'impôt sur les sociétés (IS), de la taxe sur la valeur ajoutée (TVA), des crédits d'impôt et des règles d'optimisation légale.",
      en: 'Taxation directly impacts net margins and cash flows. This comprehensive module provides deep mastery over corporate income tax (CIT), value-added tax (VAT), cross-border transactions, tax deductions, and legal optimization.'
    },
    topics: {
      fr: [
        'Impôt sur les Sociétés (IS) : résultat fiscal et réintégrations/déductions',
        'Mécanismes de TVA : exigibilité, déductibilité et déclarations',
        'Fiscalité des groupes : intégration fiscale et prix de transfert',
        'Régimes d\'imposition des plus-values et amortissements fiscaux',
        'Crédits d\'impôt (CIR, CII) et incitations fiscales',
        'Contrôle fiscal & gestion des risques de conformité'
      ],
      en: [
        'Corporate Income Tax (CIT): taxable income adjustments',
        'VAT mechanics: chargeability, input deductions & filings',
        'Group taxation: tax consolidation & transfer pricing guidelines',
        'Capital gains tax regimes & accelerated fiscal depreciation',
        'Research & Innovation Tax Credits (R&D credits)',
        'Tax audit readiness & regulatory compliance management'
      ]
    },
    skills: {
      fr: ['Calcul du résultat fiscal', 'Gestion de la TVA', 'Optimisation légale', 'Veille réglementaire'],
      en: ['Taxable Income Calculation', 'VAT Management', 'Legal Tax Planning', 'Compliance']
    },
    duration: {
      fr: '3 - 5 mois',
      en: '3 - 5 months'
    },
    level: {
      fr: 'Intermédiaire à Avancé',
      en: 'Intermediate to Advanced'
    }
  },

  'auditing': {
    icon: 'ti-clipboard-check',
    title: {
      fr: 'Audit & Contrôle Interne',
      en: 'Auditing & Internal Control'
    },
    shortDesc: {
      fr: 'Apprenez les normes d\'audit professionnel (ISA) et la méthodologie de certification.',
      en: 'Learn professional auditing standards (ISA), risk assessments, and test procedures.'
    },
    fullDesc: {
      fr: "L'audit légal et contractuel garantit la sincérité et la régularité des comptes. Apprenez la démarche d'un auditeur : cartographie des risques d'anomalies significatives, évaluation du contrôle interne, tests de substance et rédaction du rapport d'audit.",
      en: 'Financial auditing ensures transparency and credibility for investors and stakeholders. Learn the complete auditor journey: material misstatement risk assessment, internal control system evaluation, substantive testing, sampling, and opinion drafting.'
    },
    topics: {
      fr: [
        'Normes Internationales d\'Audit (ISA) et déontologie',
        'Planification de mission & seuils de signification',
        'Évaluation du contrôle interne (COSO) et tests de procédures',
        'Techniques d\'échantillonnage et sondages d\'audit',
        'Procédures analytiques et vérifications substantielles',
        'Rapports d\'audit et formulation des opinions'
      ],
      en: [
        'International Standards on Auditing (ISA) & professional ethics',
        'Audit planning & materiality threshold determination',
        'Internal control evaluation (COSO framework) & compliance testing',
        'Statistical and non-statistical audit sampling techniques',
        'Substantive procedures, confirmations & inventory counts',
        'Audit reporting & formal opinion formulation'
      ]
    },
    skills: {
      fr: ['Méthodologie ISA', 'Cartographie des risques', 'Contrôle interne', 'Certification'],
      en: ['ISA Methodology', 'Risk Mapping', 'Internal Control', 'Certification']
    },
    duration: {
      fr: '4 - 6 mois',
      en: '4 - 6 months'
    },
    level: {
      fr: 'Avancé',
      en: 'Advanced'
    }
  }
};

// === TRANSLATIONS DICTIONARY ===
const TRANSLATIONS = {
  fr: {
    navHome: 'Accueil',
    navServices: 'Services',
    navSubjects: 'Matières',
    navBooking: 'Réservation',
    heroBadge: 'Excellence en Finance & Comptabilité',
    heroTitle: 'Cours Particuliers de Finance',
    heroDescription: 'Maîtrisez la finance et la comptabilité avec un accompagnement sur-mesure, adapté à vos objectifs universitaires et professionnels.',
    bookSession: 'Réserver une Séance',
    exploreSubjects: 'Explorer les Matières',
    stat1Value: '1-à-1',
    stat1Label: 'Accompagnement Sur-Mesure',
    stat2Value: '100%',
    stat2Label: 'Flexible & Personnalisé',
    stat3Value: '+500h',
    stat3Label: 'De cours dispensés',
    stat4Value: 'L1 → Master',
    stat4Label: 'Tous niveaux académiques',
    servicesEyebrow: 'Formats d\'apprentissage',
    servicesTitle: 'Nos Services',
    servicesDescription: 'Des formules flexibles conçues pour garantir votre réussite académique et professionnelle.',
    service1Tag: 'Le plus populaire',
    service1Title: 'Cours Individuels',
    service1Desc: 'Attention personnalisée en tête-à-tête avec un programme adapté précisément à votre rythme.',
    service1F1: 'Diagnostic initial & plan personnalisé',
    service1F2: 'Rythme adapté à vos échéances d\'examens',
    service1F3: 'Correction d\'exercices et cas réels',
    service2Tag: 'Collaboratif',
    service2Title: 'Sessions de Groupe',
    service2Desc: 'Apprentissage dynamique en petits comités pour stimuler la réflexion et le partage.',
    service2F1: 'Petits groupes de 2 à 4 étudiants',
    service2F2: 'Émulation & partage d\'astuces',
    service2F3: 'Tarifs avantageux & dynamiques',
    service3Tag: '100% Flexible',
    service3Title: 'Cours en Ligne',
    service3Desc: 'Sessions interactives HD à distance avec supports partagés et flexibilité maximale.',
    service3F1: 'Plateforme interactive HD & tableau blanc',
    service3F2: 'Replay et supports de cours partagés',
    service3F3: 'Créneaux flexibles 7j/7',
    subjectsEyebrow: 'Curriculum & Spécialités',
    subjectsTitle: 'Matières Enseignées',
    subjectsDescription: 'Une expertise éprouvée sur l\'ensemble des disciplines financières et comptables.',
    learnMore: 'En savoir plus',
    appointmentEyebrow: 'Réservation en Ligne',
    appointmentTitle: 'Réservez Votre Séance',
    appointmentDescription: 'Planifiez votre premier cours personnalisé en quelques clics.',
    sessionTypeLabel: 'Type de Séance',
    typeIndividual: 'Individuel',
    typeGroup: 'Groupe',
    typeOnline: 'En Ligne',
    firstNameLabel: 'Prénom',
    firstNamePlaceholder: 'Votre prénom',
    lastNameLabel: 'Nom',
    lastNamePlaceholder: 'Votre nom',
    emailLabel: 'Email',
    emailPlaceholder: 'votre.email@exemple.com',
    phoneLabel: 'Téléphone',
    phonePlaceholder: '+33 1 23 45 67 89',
    subjectLabel: 'Matière',
    chooseSubject: 'Choisir une matière...',
    dateLabel: 'Date Préférée',
    timeLabel: 'Créneau Horaire',
    chooseTime: 'Choisir une heure...',
    messageLabel: 'Objectifs & Message (Optionnel)',
    messagePlaceholder: 'Décrivez vos échéances, examens cibles ou difficultés particulières...',
    submitBtn: 'Confirmer la Réservation',
    submitting: 'Envoi en cours...',
    modalClose: 'Fermer',
    modalTopicsTitle: 'Thèmes Abordés',
    modalSkillsTitle: 'Compétences Développées',
    modalDurationTitle: 'Durée Recommandée',
    modalLevelTitle: 'Niveau Ciblé',
    modalBookingCTA: 'Réserver ce Cours',
    successTitle: 'Réservation Confirmée !',
    successDesc: 'Merci pour votre demande. Nous vous contacterons très rapidement pour valider votre créneau.',
    successDismiss: 'Parfait, merci',
    footerTagline: 'Excellence en enseignement de la finance et de la comptabilité. Votre partenaire pour réussir dans le monde universitaire et professionnel.',
    footerStatus: 'Sessions ouvertes • Année 2024-2025',
    footerLinksTitle: 'Navigation',
    footerContactTitle: 'Contact',
    footerFollowTitle: 'Suivez-nous',
    footerNewsletterText: 'Restez informé de nos ouvertures de créneaux et astuces méthodologiques.',
    footerCopyright: '© 2024-2025 Academix Education. Tous droits réservés.',
    privacy: 'Confidentialité',
    terms: 'Mentions Légales',
    location: 'Paris, France'
  },

  en: {
    navHome: 'Home',
    navServices: 'Services',
    navSubjects: 'Subjects',
    navBooking: 'Booking',
    heroBadge: 'Excellence in Finance & Accounting',
    heroTitle: 'Private Finance Tutoring',
    heroDescription: 'Master corporate finance and financial accounting with bespoke mentorship tailored to your academic and career goals.',
    bookSession: 'Book a Session',
    exploreSubjects: 'Explore Subjects',
    stat1Value: '1-on-1',
    stat1Label: 'Tailored 1-on-1 Mentorship',
    stat2Value: '100%',
    stat2Label: '100% Flexible Sessions',
    stat3Value: '+500h',
    stat3Label: 'Hours of Tutoring Delivered',
    stat4Value: 'BSc → MSc',
    stat4Label: 'All Academic Levels',
    servicesEyebrow: 'Learning Formats',
    servicesTitle: 'Our Services',
    servicesDescription: 'Flexible tutoring models designed to maximize your academic performance and confidence.',
    service1Tag: 'Most Popular',
    service1Title: 'Individual Mentorship',
    service1Desc: 'Dedicated one-on-one sessions adapted specifically to your individual learning pace and exam deadlines.',
    service1F1: 'Initial diagnostic & custom roadmap',
    service1F2: 'Paced to your exam deadlines',
    service1F3: 'Real-world case studies & practice',
    service2Tag: 'Collaborative',
    service2Title: 'Group Workshops',
    service2Desc: 'Dynamic small-group tutoring to stimulate collaborative problem solving and shared insights.',
    service2F1: 'Small groups of 2–4 students',
    service2F2: 'Collaborative problem solving',
    service2F3: 'Cost-effective dynamic learning',
    service3Tag: '100% Remote',
    service3Title: 'Online Sessions',
    service3Desc: 'Interactive HD remote sessions with digital whiteboards and full class replays.',
    service3F1: 'HD interactive whiteboard setup',
    service3F2: 'Full replay & shared study decks',
    service3F3: 'Flexible schedule 7 days a week',
    subjectsEyebrow: 'Curriculum & Specializations',
    subjectsTitle: 'Subjects Taught',
    subjectsDescription: 'Comprehensive expertise spanning every core financial and accounting discipline.',
    learnMore: 'Learn more',
    appointmentEyebrow: 'Online Booking',
    appointmentTitle: 'Book Your Session',
    appointmentDescription: 'Schedule your tailored tutoring session in just a few clicks.',
    sessionTypeLabel: 'Session Format',
    typeIndividual: 'Individual',
    typeGroup: 'Group',
    typeOnline: 'Online',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'Your first name',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Your last name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+33 1 23 45 67 89',
    subjectLabel: 'Academic Subject',
    chooseSubject: 'Select a subject...',
    dateLabel: 'Preferred Date',
    timeLabel: 'Preferred Time Slot',
    chooseTime: 'Select a time slot...',
    messageLabel: 'Goals & Message (Optional)',
    messagePlaceholder: 'Tell us about your upcoming exams, specific topics, or learning goals...',
    submitBtn: 'Confirm Booking Request',
    submitting: 'Submitting...',
    modalClose: 'Close',
    modalTopicsTitle: 'Key Topics Covered',
    modalSkillsTitle: 'Core Skills Acquired',
    modalDurationTitle: 'Recommended Pace',
    modalLevelTitle: 'Target Academic Level',
    modalBookingCTA: 'Book This Subject',
    successTitle: 'Booking Request Received!',
    successDesc: 'Thank you for reaching out. We will contact you promptly to confirm your scheduled slot.',
    successDismiss: 'Done',
    footerTagline: 'Excellence in finance and accounting education. Your premier partner for academic and corporate success.',
    footerStatus: 'Bookings Open • Academic Year 2024-2025',
    footerLinksTitle: 'Navigation',
    footerContactTitle: 'Contact',
    footerFollowTitle: 'Connect',
    footerNewsletterText: 'Stay updated with our latest course availability and academic methodologies.',
    footerCopyright: '© 2024-2025 Academix Education. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    location: 'Paris, France'
  }
};

// === APP STATE ===
let currentLang = localStorage.getItem('academix_lang') || 'fr';
let currentTheme = localStorage.getItem('academix_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let currentSubjectId = null;

// === DOM ELEMENTS ===
const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const logoImg = document.getElementById('navbar-logo');
const langPillBtns = document.querySelectorAll('.lang-pill-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');

// Modal Elements
const subjectModal = document.getElementById('subject-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalBadge = document.getElementById('modal-badge');
const modalDesc = document.getElementById('modal-desc');
const modalTopics = document.getElementById('modal-topics');
const modalSkills = document.getElementById('modal-skills');
const modalDuration = document.getElementById('modal-duration');
const modalLevel = document.getElementById('modal-level');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBookingBtn = document.getElementById('modal-booking-btn');

// Success Modal
const successModal = document.getElementById('success-modal');
const successDismissBtn = document.getElementById('success-dismiss-btn');

// Form Elements
const bookingForm = document.getElementById('booking-form');
const sessionTypeInput = document.getElementById('session-type-input');
const segmentBtns = document.querySelectorAll('.segment-btn');
const submitBtn = document.getElementById('booking-submit-btn');

// === THEME MANAGER ===
function applyTheme(theme) {
  currentTheme = theme;
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('academix_theme', theme);

  if (theme === 'dark') {
    themeIcon.className = 'ti ti-sun';
    themeToggleBtn.setAttribute('aria-label', currentLang === 'fr' ? 'Passer en mode clair' : 'Switch to light mode');
    if (logoImg) logoImg.src = '/images/logos/logo-dark.png';
  } else {
    themeIcon.className = 'ti ti-moon';
    themeToggleBtn.setAttribute('aria-label', currentLang === 'fr' ? 'Passer en mode sombre' : 'Switch to dark mode');
    if (logoImg) logoImg.src = '/images/logos/logo-light.png';
  }
}

// === LANGUAGE MANAGER ===
function applyLanguage(lang) {
  currentLang = lang;
  htmlEl.setAttribute('lang', lang);
  localStorage.setItem('academix_lang', lang);

  // Update active status for all segmented pill buttons across desktop & mobile
  document.querySelectorAll('.lang-pill-btn').forEach(btn => {
    const isSelected = btn.dataset.lang === lang;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
  });

  // Update theme toggle button accessible label
  if (themeToggleBtn) {
    if (currentTheme === 'dark') {
      themeToggleBtn.setAttribute('aria-label', lang === 'fr' ? 'Passer en mode clair' : 'Switch to light mode');
    } else {
      themeToggleBtn.setAttribute('aria-label', lang === 'fr' ? 'Passer en mode sombre' : 'Switch to dark mode');
    }
  }

  // Apply translations to all data-i18n elements
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Apply translations to placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Re-populate modal if open
  if (currentSubjectId && subjectModal && subjectModal.classList.contains('active')) {
    populateSubjectModal(currentSubjectId);
  }
}

// === SUBJECT MODAL MANAGER ===
function populateSubjectModal(subjectId) {
  const data = SUBJECTS_DATA[subjectId];
  if (!data) return;
  currentSubjectId = subjectId;

  // Icon
  modalIcon.innerHTML = `<i class="ti ${data.icon}"></i>`;

  // Title & Level
  modalTitle.textContent = data.title[currentLang];
  modalBadge.textContent = data.level[currentLang];

  // Description
  modalDesc.textContent = data.fullDesc[currentLang];

  // Topics list
  modalTopics.innerHTML = '';
  data.topics[currentLang].forEach(topic => {
    const li = document.createElement('li');
    li.className = 'modal-topic-item';
    li.innerHTML = `<i class="ti ti-circle-check"></i> <span>${topic}</span>`;
    modalTopics.appendChild(li);
  });

  // Skills chips
  modalSkills.innerHTML = '';
  data.skills[currentLang].forEach(skill => {
    const span = document.createElement('span');
    span.className = 'modal-skill-chip';
    span.textContent = skill;
    modalSkills.appendChild(span);
  });

  // Duration & Target Level
  modalDuration.textContent = data.duration[currentLang];
  modalLevel.textContent = data.level[currentLang];
}

function openSubjectModal(subjectId) {
  populateSubjectModal(subjectId);
  subjectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSubjectModal() {
  subjectModal.classList.remove('active');
  document.body.style.overflow = '';
}

// === SUCCESS MODAL MANAGER ===
function openSuccessModal() {
  successModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
  successModal.classList.remove('active');
  document.body.style.overflow = '';
}

// === MOBILE DRAWER MANAGER ===
function toggleMobileDrawer() {
  const isOpen = mobileDrawer.classList.toggle('active');
  mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  mobileMenuBtn.innerHTML = isOpen ? '<i class="ti ti-x"></i>' : '<i class="ti ti-menu-2"></i>';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove('active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenuBtn.innerHTML = '<i class="ti ti-menu-2"></i>';
  document.body.style.overflow = '';
}

// === EVENT LISTENERS ===

// Theme toggle
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
}

// Language segmented pill switcher (Header & Mobile Drawer)
document.querySelectorAll('.lang-pill-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const targetLang = btn.dataset.lang;
    if (targetLang && targetLang !== currentLang) {
      applyLanguage(targetLang);
    }
  });
});

// Mobile menu toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileDrawer);
}

// Mobile drawer links
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeMobileDrawer);
});

// Subject Cards - Open Modal
document.querySelectorAll('[data-subject-id]').forEach(card => {
  card.addEventListener('click', (e) => {
    const subjectId = card.getAttribute('data-subject-id');
    openSubjectModal(subjectId);
  });
});

// Subject Modal Close triggers
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSubjectModal);
if (subjectModal) {
  subjectModal.addEventListener('click', (e) => {
    if (e.target === subjectModal) closeSubjectModal();
  });
}

// Modal booking button
if (modalBookingBtn) {
  modalBookingBtn.addEventListener('click', () => {
    closeSubjectModal();
    if (currentSubjectId) {
      const subjectSelect = document.getElementById('subject-select');
      if (subjectSelect) subjectSelect.value = currentSubjectId;
    }
  });
}

// Success Modal Dismiss
if (successDismissBtn) successDismissBtn.addEventListener('click', closeSuccessModal);
if (successModal) {
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) closeSuccessModal();
  });
}

// Keyboard ESC to close modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (subjectModal && subjectModal.classList.contains('active')) closeSubjectModal();
    if (successModal && successModal.classList.contains('active')) closeSuccessModal();
    if (mobileDrawer && mobileDrawer.classList.contains('active')) closeMobileDrawer();
  }
});

// Segmented Control (Session Type)
segmentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    segmentBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');
    const typeValue = btn.getAttribute('data-type');
    if (sessionTypeInput) sessionTypeInput.value = typeValue;
  });
});

// Form Submission
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      subject: document.getElementById('subject-select').value,
      sessionType: sessionTypeInput ? sessionTypeInput.value : 'individual',
      preferredDate: document.getElementById('preferred-date').value,
      preferredTime: document.getElementById('preferred-time').value,
      message: document.getElementById('message').value.trim(),
      timestamp: new Date().toISOString(),
      language: currentLang
    };

    // UI Loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ti ti-loader-2 spin-icon"></i> <span>${TRANSLATIONS[currentLang].submitting}</span>`;

    try {
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const endpoint = isDev ? 'http://localhost:3000/api/submit-form' : '/api/submit-form';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission error');

      // Success
      bookingForm.reset();
      // Restore default segmented control
      segmentBtns.forEach((b, i) => {
        b.classList.toggle('active', i === 0);
        b.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
      });
      if (sessionTypeInput) sessionTypeInput.value = 'individual';

      openSuccessModal();
    } catch (err) {
      console.error('Booking submission error:', err);
      alert(currentLang === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Submission error. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

// Header Scroll Shadow
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header-island');
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}, { passive: true });

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyLanguage(currentLang);
});
