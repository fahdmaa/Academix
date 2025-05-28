// Attendre que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const header = document.getElementById('header');
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const expertiseCards = document.querySelectorAll('.expertise-card');
    const subjectsDetailsContainer = document.querySelector('.subjects-details-container');
    const subjectsDetails = document.querySelectorAll('.subjects-details');
    const closeDetailsButtons = document.querySelectorAll('.close-details');
    const subjectCards = document.querySelectorAll('.subject-card');
    const appointmentForm = document.getElementById('appointment-form');
    const successMessage = document.getElementById('success-message');
    const subjectsSelect = document.getElementById('subjects-select');

    // Elements du carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');

    // Éléments pour le thème et la langue
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.lang-option');

    // Variables pour le carousel
    let currentSlide = 0;
    let carouselInterval;

    // Initialisation du thème et de la langue
    initializeTheme();
    initializeLanguage();

    // Initialiser les icônes Lucide
    initializeLucideIcons();

    // Configurer le select multiple pour les matières
    setupSubjectsSelect();

    // Configurer le carousel
    setupCarousel();

    // Démarrer l'effet typewriter
    startTypewriterEffect();

    // Mettre à jour les options de langue du formulaire
    updateFormLanguage();

    // Navigation responsive
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu après un clic sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (burgerMenu) burgerMenu.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (navLinks && burgerMenu && !navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Changer le style du header au scroll
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Animation des nombres statistiques
    animateStatNumbers();

    // Gestion du thème
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }

    // Gestion de la langue
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLanguageDropdown();
        });
    }

    // Sélection de la langue
    if (languageOptions && languageOptions.length > 0) {
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    changeLanguage(lang);
                    updateFormLanguage(); // Mettre à jour les options du formulaire
                }
                if (languageDropdown) {
                    languageDropdown.classList.remove('show');
                }
            });
        });
    }

    // Fermer le menu de langue en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (languageDropdown && languageToggle && !languageToggle.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });

    // Configuration du carousel de témoignages
    function setupCarousel() {
        // Définir le premier slide comme actif
        if (testimonialCards.length > 0) {
            updateCarousel();
        }

        // Démarrer la rotation automatique
        startCarouselAutoRotation();

        // Ajouter les écouteurs d'événements pour les indicateurs
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                restartCarouselAutoRotation();
            });
        });
    }

    // Mettre à jour l'affichage du carousel
    function updateCarousel() {
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Positionner les cartes avec animation de "deck of cards"
        testimonialCards.forEach((card, index) => {
            let position = (index - currentSlide) % testimonialCards.length;
            if (position < 0) position += testimonialCards.length;

            // Reset styles for all cards
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

            if (position === 0) {
                // Carte active (au premier plan)
                card.style.transform = 'translateZ(0) rotateY(0) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '3';
                card.style.visibility = 'visible';
            } else if (position === 1) {
                // Carte juste derrière (légèrement décalée)
                card.style.transform = 'translateZ(-50px) rotateY(-5deg) scale(0.95)';
                card.style.opacity = '0';
                card.style.zIndex = '2';
                card.style.visibility = 'hidden';
            } else if (position === 2) {
                // Carte arrière (plus décalée)
                card.style.transform = 'translateZ(-100px) rotateY(-10deg) scale(0.9)';
                card.style.opacity = '0';
                card.style.zIndex = '1';
                card.style.visibility = 'hidden';
            } else {
                // Cartes cachées
                card.style.opacity = '0';
                card.style.zIndex = '0';
                card.style.visibility = 'hidden';
            }
        });
    }

    // Démarrer la rotation automatique
    function startCarouselAutoRotation() {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            updateCarousel();
        }, 5000); // 5 secondes de délai
    }

    // Redémarrer la rotation automatique
    function restartCarouselAutoRotation() {
        clearInterval(carouselInterval);
        startCarouselAutoRotation();
    }

    // Configuration du select multiple pour les matières
    function setupSubjectsSelect() {
        if (!subjectsSelect) return;

        // Liste de toutes les matières
        const allSubjects = [
            { id: 'math-fin', fr: 'Mathématiques financières', en: 'Financial Mathematics', ar: 'الرياضيات المالية' },
            { id: 'finance-ent', fr: 'Finance d\'entreprise', en: 'Corporate Finance', ar: 'تمويل الشركات' },
            { id: 'finance-marche', fr: 'Finance de marché', en: 'Market Finance', ar: 'تمويل السوق' },
            { id: 'ingenierie-fin', fr: 'Ingénierie financière', en: 'Financial Engineering', ar: 'الهندسة المالية' },
            { id: 'analyse-fin', fr: 'Analyse financière', en: 'Financial Analysis', ar: 'التحليل المالي' },
            { id: 'compta-gen', fr: 'Comptabilité générale', en: 'General Accounting', ar: 'المحاسبة العامة' },
            { id: 'compta-ana', fr: 'Comptabilité analytique', en: 'Cost Accounting', ar: 'محاسبة التكاليف' },
            { id: 'compta-approf', fr: 'Comptabilité approfondie', en: 'Advanced Accounting', ar: 'المحاسبة المتقدمة' },
            { id: 'controle-gestion', fr: 'Contrôle de gestion', en: 'Management Control', ar: 'مراقبة الإدارة' },
            { id: 'evaluation-ent', fr: 'Évaluation d\'entreprises', en: 'Business Valuation', ar: 'تقييم الأعمال' },
            { id: 'risk-mgmt', fr: 'Risk management', en: 'Risk Management', ar: 'إدارة المخاطر' },
            { id: 'memoire', fr: 'Mémoire de fin d\'études', en: 'Thesis Support', ar: 'دعم الأطروحة' },
            { id: 'certification', fr: 'Préparation aux concours', en: 'Exam Preparation', ar: 'التحضير للاختبارات' },
            { id: 'projets', fr: 'Projets académiques', en: 'Academic Projects', ar: 'المشاريع الأكاديمية' }
        ];

        // Langue actuelle
        const currentLang = document.documentElement.lang || 'fr';

        // Vider le select
        subjectsSelect.innerHTML = '';

        // Ajouter les options
        allSubjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.id;
            option.textContent = subject[currentLang];
            subjectsSelect.appendChild(option);
        });

        // Permettre la sélection multiple avec CTRL/CMD
        subjectsSelect.multiple = true;
    }

    // Mettre à jour les options du formulaire en fonction de la langue
    function updateFormLanguage() {
        // Mise à jour du select des matières
        setupSubjectsSelect();

        // Mise à jour des options du select "Méthode souhaitée"
        updateMethodSelectOptions();
    }

    // Mettre à jour les options du select "Méthode souhaitée"
    function updateMethodSelectOptions() {
        const methodSelect = document.getElementById('method');
        if (!methodSelect) return;

        const currentLang = document.documentElement.lang || 'fr';

        // Options par langue
        const options = {
            fr: [
                { value: '', text: 'Choisissez une option', disabled: true, selected: true },
                { value: 'online', text: 'En ligne' },
                { value: 'presential', text: 'Présentiel' }
            ],
            en: [
                { value: '', text: 'Choose an option', disabled: true, selected: true },
                { value: 'online', text: 'Online' },
                { value: 'presential', text: 'In-person' }
            ],
            ar: [
                { value: '', text: 'اختر خيارًا', disabled: true, selected: true },
                { value: 'online', text: 'عبر الإنترنت' },
                { value: 'presential', text: 'شخصي' }
            ]
        };

        // Vider le select
        methodSelect.innerHTML = '';

        // Ajouter les options pour la langue actuelle
        options[currentLang].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            if (opt.disabled) option.disabled = true;
            if (opt.selected) option.selected = true;
            methodSelect.appendChild(option);
        });
    }

    // Fonction pour initialiser les icônes Lucide
    function initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Fonction pour l'effet typewriter
    function startTypewriterEffect() {
        const currentLang = document.documentElement.lang;

        // Configuration des mots pour chaque langue
        const wordsConfig = {
            'fr': {
                element: document.getElementById('typewriter-text'),
                words: ['Finance', 'Comptabilité']
            },
            'en': {
                element: document.getElementById('typewriter-text-en'),
                words: ['Finance', 'Accounting']
            },
            'ar': {
                element: document.getElementById('typewriter-text-ar'),
                words: ['المالية', 'المحاسبة']
            }
        };

        const config = wordsConfig[currentLang];
        if (!config || !config.element) return;

        const { element, words } = config;
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150;
        const deletingSpeed = 100;
        const pauseTime = 2000;

        function typeWriter() {
            const currentWord = words[currentWordIndex];

            if (isDeleting) {
                // Suppression des caractères
                element.textContent = currentWord.substring(0, currentCharIndex - 1);
                currentCharIndex--;

                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    setTimeout(typeWriter, 500);
                } else {
                    setTimeout(typeWriter, deletingSpeed);
                }
            } else {
                // Ajout des caractères
                element.textContent = currentWord.substring(0, currentCharIndex + 1);
                currentCharIndex++;

                if (currentCharIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, pauseTime);
                } else {
                    setTimeout(typeWriter, typingSpeed);
                }
            }
        }

        // Démarrer l'effet après un petit délai
        setTimeout(typeWriter, 1000);
    }

    // Fonction pour initialiser le thème
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);

        // Réinitialiser les icônes après changement de thème
        setTimeout(() => {
            initializeLucideIcons();
        }, 100);
    }

    // Fonction pour basculer le thème
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Réinitialiser les icônes après changement de thème
        setTimeout(() => {
            initializeLucideIcons();
        }, 100);
    }

    // Fonction pour initialiser la langue
    function initializeLanguage() {
        const savedLanguage = localStorage.getItem('language') || 'fr';
        changeLanguageWithAnimation(savedLanguage, false);
    }

    // Fonction pour basculer le menu déroulant de langue
    function toggleLanguageDropdown() {
        if (!languageDropdown) return;

        languageDropdown.classList.toggle('show');
    }

    // Fonction pour changer la langue
    function changeLanguage(lang) {
        if (!lang) return;
        changeLanguageWithAnimation(lang, true);
    }

    // Fonction pour changer la langue avec animation fluide
    function changeLanguageWithAnimation(lang, animate = true) {
        if (!lang) return;

        // Trouver tous les éléments de contenu multilingue
        const allLangElements = document.querySelectorAll('.fr, .en, .ar');

        if (animate) {
            // Animation de sortie pour les éléments actuels
            allLangElements.forEach(element => {
                if (element.style.display !== 'none') {
                    element.style.animation = 'fadeOut 0.3s ease';
                    element.style.opacity = '0';
                }
            });

            // Attendre la fin de l'animation de sortie
            setTimeout(() => {
                updateLanguageDisplay(lang);
                updateLanguageUI(lang);
                updateLanguageButton(lang);
                updateActiveLanguageOption(lang);

                // Animation d'entrée pour les nouveaux éléments
                const newLangElements = document.querySelectorAll(`.${lang}`);
                newLangElements.forEach(element => {
                    element.style.animation = 'languageSlideIn 0.5s ease';
                    element.style.opacity = '1';
                });

                // Redémarrer l'effet typewriter pour la nouvelle langue
                setTimeout(() => {
                    startTypewriterEffect();
                }, 500);
            }, 300);
        } else {
            updateLanguageDisplay(lang);
            updateLanguageUI(lang);
            updateLanguageButton(lang);
            updateActiveLanguageOption(lang);

            // Démarrer l'effet typewriter
            setTimeout(() => {
                startTypewriterEffect();
            }, 100);
        }

        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
    }

    // Fonction pour mettre à jour l'affichage de la langue
    function updateLanguageDisplay(lang) {
        // Masquer tous les éléments de langue
        const allLangElements = document.querySelectorAll('.fr, .en, .ar');
        allLangElements.forEach(element => {
            element.style.display = 'none';
            element.style.opacity = '0';
        });

        // Afficher les éléments de la langue sélectionnée
        const selectedLangElements = document.querySelectorAll(`.${lang}`);
        selectedLangElements.forEach(element => {
            element.style.display = 'block';
            element.style.opacity = '1';
        });
    }

    // Fonction pour mettre à jour l'interface pour la langue
    function updateLanguageUI(lang) {
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }

    // Mettre à jour l'apparence du bouton de langue
    function updateLanguageButton(lang) {
        if (!languageToggle) return;

        const currentLang = languageToggle.querySelector('.current-lang');
        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
        }
    }

    // Marquer l'option active dans le menu déroulant
    function updateActiveLanguageOption(lang) {
        if (!languageOptions || languageOptions.length === 0) return;

        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    // Ouvrir les détails d'expertise
    if (expertiseCards && expertiseCards.length > 0) {
        expertiseCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const expertise = this.getAttribute('data-expertise');
                if (expertise) {
                    openExpertiseDetails(expertise);
                }
            });
        });
    }

    // Fermer les détails d'expertise avec le bouton X
    if (closeDetailsButtons && closeDetailsButtons.length > 0) {
        closeDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeExpertiseDetails();
            });
        });
    }

    // Fermer les détails en cliquant en dehors
    if (subjectsDetailsContainer) {
        subjectsDetailsContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                closeExpertiseDetails();
            }
        });
    }

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeExpertiseDetails();
        }
    });

    // Fonction pour ouvrir les détails d'une expertise
    function openExpertiseDetails(expertise) {
        if (!subjectsDetailsContainer) return;

        // Afficher le conteneur
        subjectsDetailsContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page

        // Masquer tous les détails
        if (subjectsDetails && subjectsDetails.length > 0) {
            subjectsDetails.forEach(detail => {
                detail.classList.remove('active');
            });
        }

        // Afficher les détails de l'expertise sélectionnée
        const selectedDetail = document.getElementById(`${expertise}-details`);
        if (selectedDetail) {
            selectedDetail.classList.add('active');
        }
    }

    // Fonction pour fermer les détails d'expertise
    function closeExpertiseDetails() {
        if (!subjectsDetailsContainer) return;

        subjectsDetailsContainer.style.display = 'none';
        document.body.style.overflow = ''; // Rétablir le défilement

        // Masquer tous les détails
        if (subjectsDetails && subjectsDetails.length > 0) {
            subjectsDetails.forEach(detail => {
                detail.classList.remove('active');
            });
        }
    }

    // Animation et gestion des cartes de matières
    if (subjectCards && subjectCards.length > 0) {
        subjectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const subject = this.getAttribute('data-subject');
                if (subject) {
                    selectSubject(subject);
                }
            });
        });
    }

    // Fonction pour sélectionner une matière
    function selectSubject(subject) {
        const subjectsSelect = document.getElementById('subjects-select');
        if (!subjectsSelect) return;

        // Trouver l'option correspondante
        const option = Array.from(subjectsSelect.options).find(opt => opt.value === subject);
        if (!option) return;

        // Sélectionner cette option (en maintenant les autres sélections)
        option.selected = true;

        // Effet visuel de sélection
        const card = document.querySelector(`[data-subject="${subject}"]`);
        if (card) {
            card.style.borderColor = 'var(--primary)';
            card.style.boxShadow = '0 10px 30px rgba(204, 255, 0, 0.2)';

            setTimeout(() => {
                card.style.borderColor = '';
                card.style.boxShadow = '';
            }, 1000);
        }

        // Fermer les détails d'expertise
        closeExpertiseDetails();

        // Scroll vers le formulaire
        const appointmentSection = document.getElementById('appointment');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Focus sur le select
            setTimeout(() => {
                subjectsSelect.focus();
            }, 800);
        }
    }

    // Gestion du formulaire
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Vérification du formulaire
            if (validateForm()) {
                // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
                submitForm();
            }
        });
    }

    // Validation du formulaire
    function validateForm() {
        const requiredFields = ['fullName', 'city', 'method', 'hours', 'email', 'phone'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input || !input.value.trim()) {
                if (input) markAsInvalid(input);
                isValid = false;
            } else {
                if (input) markAsValid(input);
            }
        });

        // Validation de l'email
        const emailInput = document.getElementById('email');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                markAsInvalid(emailInput);
                isValid = false;
            }
        }

        return isValid;
    }

    // Marquer un champ comme invalide
    function markAsInvalid(input) {
        input.style.borderColor = '#ff4d4d';
        input.style.boxShadow = '0 0 0 3px rgba(255, 77, 77, 0.2)';

        // Ajouter un effet de secousse
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);

        // Rétablir le style au focus
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 0 3px rgba(204, 255, 0, 0.2)';
        });
    }

    // Marquer un champ comme valide
    function markAsValid(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }

    // Soumettre le formulaire
    function submitForm() {
        if (!appointmentForm || !successMessage) return;

        const submitBtn = appointmentForm.querySelector('.submit-btn');
        if (!submitBtn) return;

        // Effet de chargement
        const submitBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>...</span>';
        submitBtn.disabled = true;

        // Simulation de délai d'envoi (à remplacer par votre vraie logique d'envoi)
        setTimeout(() => {
            // Réinitialiser le formulaire
            appointmentForm.reset();

            // Afficher le message de succès
            successMessage.classList.add('show');

            // Fermer automatiquement après 3 secondes
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);

            // Rétablir le bouton
            submitBtn.innerHTML = submitBtnText;
            submitBtn.disabled = false;
        }, 1500);
    }

    // Permettre de fermer le message en cliquant dessus
    if (successMessage) {
        successMessage.addEventListener('click', () => {
            successMessage.classList.remove('show');
        });
    }

    // Animation des nombres statistiques
    function animateStatNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const finalValue = stat.getAttribute('data-value');
            if (!finalValue) return;

            const value = parseInt(finalValue);
            if (isNaN(value)) return;

            const isPlus = stat.textContent.includes('+');

            // Commencer à zéro
            stat.textContent = '0' + (isPlus ? '+' : '');

            // Durée de l'animation en ms
            const duration = 2000;
            // Nombre d'étapes
            const steps = 50;
            // Incrément par étape
            const increment = value / steps;
            // Délai entre les étapes
            const stepDuration = duration / steps;

            let currentValue = 0;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                currentValue += increment;

                if (currentStep >= steps) {
                    clearInterval(interval);
                    stat.textContent = value + (isPlus ? '+' : '');
                } else {
                    stat.textContent = Math.round(currentValue) + (isPlus ? '+' : '');
                }
            }, stepDuration);
        });
    }

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ajouter les animations CSS manquantes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes fadeOut {
            from { 
                opacity: 1; 
                transform: translateY(0);
            }
            to { 
                opacity: 0; 
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Fonction pour précharger les images
function preloadImages() {
    const images = [
        'images/professor.jpg',
        'images/student-avatar.jpg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Déclencher le préchargement
preloadImages();