// Initialize EmailJS with better error handling and fallback loading
(function() {
    let initAttempts = 0;
    const maxInitAttempts = 10;
    
    function loadEmailJSFallback() {
        if (typeof emailjs === 'undefined') {
            console.log('Loading EmailJS fallback...');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = function() {
                console.log('EmailJS fallback loaded');
                setTimeout(initEmailJS, 500);
            };
            script.onerror = function() {
                console.error('Failed to load EmailJS fallback');
            };
            document.head.appendChild(script);
        }
    }
    
    function initEmailJS() {
        initAttempts++;
        console.log('EmailJS init attempt:', initAttempts);
        
        if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
            try {
                emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
                console.log('EmailJS initialized successfully on attempt:', initAttempts);
                window.emailJSReady = true;
            } catch (error) {
                console.error('EmailJS initialization error:', error);
            }
        } else {
            if (initAttempts < maxInitAttempts) {
                console.warn('EmailJS or config not loaded yet, retrying...', initAttempts);
                setTimeout(initEmailJS, 1000);
            } else if (initAttempts === maxInitAttempts) {
                console.warn('Max init attempts reached, trying fallback...');
                loadEmailJSFallback();
            }
        }
    }
    
    // Try to initialize immediately
    initEmailJS();
})();

// Attendre que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Debug information
    console.log('DOM loaded');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    console.log('Config available:', typeof EMAILJS_CONFIG !== 'undefined');
    console.log('Current URL:', window.location.href);
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
    const subjectsInput = document.getElementById('subjects');

    // Elements des achievements
    const achievementCards = document.querySelectorAll('.achievement-card');

    // Éléments pour le thème et la langue
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.lang-option');

    // Variables pour les animations
    // typewriterInterval removed as it's unused

    // Initialisation du thème et de la langue en premier
    initializeTheme();
    initializeLanguage();

    // Initialiser les icônes Lucide
    initializeLucideIcons();

    // Attendre que la langue soit initialisée avant de configurer le formulaire
    setTimeout(() => {
        // Mettre à jour les placeholders du formulaire
        updateFormLanguage();
    }, 200);

    // Configurer les animations des achievements
    setupAchievements();

    // Configurer les animations de scroll
    setupScrollAnimations();

    // Démarrer l'effet typewriter
    startTypewriterEffect();

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

    // Configuration des animations d'achievements
    function setupAchievements() {
        // Observer les cartes d'achievements pour démarrer l'animation quand elles sont visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    animateNumber(entry.target);
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        }, {
            threshold: 0.5
        });

        achievementCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Configuration des animations de scroll
    function setupScrollAnimations() {
        // Observer pour les animations de scroll
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Ajouter les classes d'animation aux éléments
        const elementsToAnimate = [
            { selector: '.section-header', animation: 'scroll-reveal' },
            { selector: '.expertise-card', animation: 'scroll-reveal-scale' },
            { selector: '.form-section', animation: 'scroll-reveal' },
            { selector: '.footer', animation: 'scroll-reveal' }
        ];

        elementsToAnimate.forEach(({ selector, animation }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add(animation);
                element.style.transitionDelay = `${index * 0.1}s`;
                scrollObserver.observe(element);
            });
        });
    }

    // Animer les nombres dans une carte d'achievement
    function animateNumber(card) {
        const numberElement = card.querySelector('.achievement-number');
        if (!numberElement) return;

        const target = parseInt(numberElement.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        numberElement.textContent = '0';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(current);
        }, 16);
    }

    // Configuration du select multiple pour les matières  
    function setupSubjectsSelect() {
        console.log('setupSubjectsSelect called');
        
        if (!subjectsSelect) {
            console.error('subjectsSelect element not found');
            return;
        }
        
        console.log('Setting up subjects select...');

        // Liste de toutes les matières organisées par catégorie
        const subjectsByCategory = {
            'Finance': {
                fr: 'Finance',
                en: 'Finance',
                ar: 'التمويل',
                subjects: [
                    { id: 'math-fin', fr: 'Mathématiques financières', en: 'Financial Mathematics', ar: 'الرياضيات المالية' },
                    { id: 'finance-ent', fr: 'Finance d\'entreprise', en: 'Corporate Finance', ar: 'تمويل الشركات' },
                    { id: 'finance-marche', fr: 'Finance de marché', en: 'Market Finance', ar: 'تمويل السوق' },
                    { id: 'ingenierie-fin', fr: 'Ingénierie financière', en: 'Financial Engineering', ar: 'الهندسة المالية' },
                    { id: 'analyse-fin', fr: 'Analyse financière', en: 'Financial Analysis', ar: 'التحليل المالي' }
                ]
            },
            'Comptabilite': {
                fr: 'Comptabilité',
                en: 'Accounting',
                ar: 'المحاسبة',
                subjects: [
                    { id: 'compta-gen', fr: 'Comptabilité générale', en: 'General Accounting', ar: 'المحاسبة العامة' },
                    { id: 'compta-ana', fr: 'Comptabilité analytique', en: 'Cost Accounting', ar: 'محاسبة التكاليف' },
                    { id: 'compta-approf', fr: 'Comptabilité approfondie', en: 'Advanced Accounting', ar: 'المحاسبة المتقدمة' }
                ]
            },
            'Gestion': {
                fr: 'Contrôle & Gestion',
                en: 'Control & Management',
                ar: 'الرقابة والإدارة',
                subjects: [
                    { id: 'controle-gestion', fr: 'Contrôle de gestion', en: 'Management Control', ar: 'مراقبة الإدارة' },
                    { id: 'evaluation-ent', fr: 'Évaluation d\'entreprises', en: 'Business Valuation', ar: 'تقييم الأعمال' },
                    { id: 'risk-mgmt', fr: 'Risk management', en: 'Risk Management', ar: 'إدارة المخاطر' }
                ]
            },
            'Encadrement': {
                fr: 'Encadrement',
                en: 'Guidance',
                ar: 'التوجيه',
                subjects: [
                    { id: 'memoire', fr: 'Mémoire de fin d\'études', en: 'Thesis Support', ar: 'دعم الأطروحة' },
                    { id: 'certification', fr: 'Préparation aux concours', en: 'Exam Preparation', ar: 'التحضير للاختبارات' },
                    { id: 'projets', fr: 'Projets académiques', en: 'Academic Projects', ar: 'المشاريع الأكاديمية' }
                ]
            }
        };

        // Initialize custom multiselect
        // Simple subjects input - no multiselect needed
        
        // No complex setup needed for simple text input
    }
    
    // Clear multiselect function for form reset
    window.clearMultiselect = function() {
        const multiselectSelected = document.querySelector('.multiselect-selected');
        const multiselectOptions = document.querySelectorAll('.multiselect-option');
        const subjectsInput = document.getElementById('subjects');
        
        if (multiselectSelected) {
            multiselectSelected.innerHTML = '';
        }
        
        if (multiselectOptions) {
            multiselectOptions.forEach(option => {
                option.classList.remove('selected');
            });
        }
        
        if (subjectsSelect) {
            Array.from(subjectsSelect.options).forEach(option => {
                option.selected = false;
            });
        }
    };

    // Setup custom multiselect dropdown
    function setupCustomMultiselect(subjectsByCategory) {
        console.log('setupCustomMultiselect called with:', subjectsByCategory);
        
        const multiselectToggle = document.getElementById('multiselect-toggle');
        const multiselectDropdown = document.getElementById('multiselect-dropdown');
        const multiselectOptions = document.getElementById('multiselect-options');
        
        console.log('Elements found:', {
            toggle: !!multiselectToggle,
            dropdown: !!multiselectDropdown,
            options: !!multiselectOptions
        });
        
        // Check if elements exist
        if (!multiselectToggle || !multiselectDropdown || !multiselectOptions) {
            console.error('Multiselect elements not found:', {
                toggle: multiselectToggle,
                dropdown: multiselectDropdown,
                options: multiselectOptions
            });
            return;
        }
        
        const multiselectSelected = multiselectToggle.querySelector('.multiselect-selected');
        const searchInput = multiselectDropdown.querySelector('.multiselect-search-input');
        
        if (!multiselectSelected || !searchInput) {
            console.error('Multiselect child elements not found');
            return;
        }
        
        const selectedSubjects = new Set();

        // Toggle dropdown
        multiselectToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Multiselect toggle clicked');
            
            const isOpen = multiselectDropdown.classList.contains('show');
            
            if (isOpen) {
                multiselectToggle.classList.remove('active');
                multiselectDropdown.classList.remove('show');
                multiselectDropdown.style.display = 'none';
            } else {
                multiselectToggle.classList.add('active');
                multiselectDropdown.classList.add('show');
                multiselectDropdown.style.display = 'block';
                setTimeout(() => searchInput.focus(), 100);
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!multiselectToggle.contains(e.target) && !multiselectDropdown.contains(e.target)) {
                multiselectToggle.classList.remove('active');
                multiselectDropdown.classList.remove('show');
                multiselectDropdown.style.display = 'none';
            }
        });

        // Render options
        function renderOptions(searchTerm = '') {
            const currentLang = document.documentElement.lang || 'fr';
            console.log('Rendering options for language:', currentLang);
            multiselectOptions.innerHTML = '';

            Object.keys(subjectsByCategory).forEach(category => {
                const categoryData = subjectsByCategory[category];
                const filteredSubjects = categoryData.subjects.filter(subject => 
                    subject[currentLang] && subject[currentLang].toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredSubjects.length > 0) {
                    // Add category header
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'multiselect-category';
                    categoryDiv.textContent = categoryData[currentLang] || category;
                    multiselectOptions.appendChild(categoryDiv);

                    // Add subjects
                    filteredSubjects.forEach(subject => {
                        const optionDiv = document.createElement('div');
                        optionDiv.className = 'multiselect-option';
                        if (selectedSubjects.has(subject.id)) {
                            optionDiv.classList.add('selected');
                        }
                        optionDiv.textContent = subject[currentLang] || subject.id;
                        optionDiv.dataset.value = subject.id;
                        optionDiv.dataset.label = subject[currentLang] || subject.id;

                        optionDiv.addEventListener('click', () => {
                            toggleSubject(subject.id);
                        });

                        multiselectOptions.appendChild(optionDiv);
                    });
                }
            });
            
            console.log('Rendered', multiselectOptions.children.length, 'elements');
        }

        // Toggle subject selection
        function toggleSubject(id) {
            if (selectedSubjects.has(id)) {
                selectedSubjects.delete(id);
            } else {
                selectedSubjects.add(id);
            }
            updateSelectedDisplay();
            updateHiddenSelect();
            renderOptions(searchInput.value);
        }

        // Update selected display
        function updateSelectedDisplay() {
            multiselectSelected.innerHTML = '';
            selectedSubjects.forEach(id => {
                const optionEl = multiselectOptions.querySelector(`[data-value="${id}"]`);
                if (optionEl) {
                    const tag = document.createElement('span');
                    tag.className = 'multiselect-tag';
                    tag.innerHTML = `
                        ${optionEl.dataset.label}
                        <span class="multiselect-tag-remove" data-value="${id}">×</span>
                    `;
                    
                    tag.querySelector('.multiselect-tag-remove').addEventListener('click', (e) => {
                        e.stopPropagation();
                        toggleSubject(id);
                    });
                    
                    multiselectSelected.appendChild(tag);
                }
            });
        }
        
        // Make it accessible globally for form reset
        window.updateSelectedDisplay = updateSelectedDisplay;
        window.clearMultiselect = function() {
            selectedSubjects.clear();
            updateSelectedDisplay();
            updateHiddenSelect();
        };

        // Update hidden select
        function updateHiddenSelect() {
            const options = subjectsSelect.options;
            for (let i = 0; i < options.length; i++) {
                options[i].selected = selectedSubjects.has(options[i].value);
            }
        }

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            renderOptions(e.target.value);
        });

        // Update placeholder text based on language
        function updateSearchPlaceholder() {
            const currentLang = document.documentElement.lang || 'fr';
            const placeholders = {
                fr: 'Rechercher...',
                en: 'Search...',
                ar: 'بحث...'
            };
            searchInput.placeholder = placeholders[currentLang];
        }

        // Initial render and setup
        console.log('Initializing multiselect dropdown...');
        renderOptions();
        updateSearchPlaceholder();
        
        // Ensure dropdown is properly styled and positioned
        multiselectDropdown.style.display = 'none';
        multiselectDropdown.style.position = 'absolute';
        multiselectDropdown.style.top = '100%';
        multiselectDropdown.style.left = '0';
        multiselectDropdown.style.right = '0';
        multiselectDropdown.style.zIndex = '1000';
        
        // Update when language changes
        const originalChangeLanguage = window.changeLanguage;
        if (originalChangeLanguage) {
            window.changeLanguage = function(lang) {
                originalChangeLanguage.call(this, lang);
                setTimeout(() => {
                    renderOptions(searchInput.value);
                    updateSearchPlaceholder();
                    updateSelectedDisplay();
                }, 50);
            };
        }
        
        // Also listen for language attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    const newLang = document.documentElement.lang;
                    if (newLang && newLang !== currentLang) {
                        setTimeout(() => {
                            renderOptions(searchInput.value);
                            updateSearchPlaceholder();
                            updateSelectedDisplay();
                        }, 100);
                    }
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
        
        console.log('Multiselect dropdown initialized successfully');
    }

    // Update subjects input placeholder based on language
    function updateSubjectsPlaceholder() {
        if (!subjectsInput) return;
        
        const currentLang = document.documentElement.lang || 'fr';
        const placeholders = {
            fr: 'Ex: Finance, Comptabilité, Gestion...',
            en: 'Ex: Finance, Accounting, Management...',
            ar: 'مثال: المالية، المحاسبة، الإدارة...'
        };
        
        subjectsInput.placeholder = placeholders[currentLang];
    }

    // Mettre à jour les options du formulaire en fonction de la langue
    function updateFormLanguage() {
        // Update subjects placeholder
        updateSubjectsPlaceholder();
        
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

        // Clean up any existing animations
        document.querySelectorAll('[id^="typewriter-text"]').forEach(el => {
            if (el._typewriterAnimation) {
                clearTimeout(el._typewriterAnimation);
                el._typewriterAnimation = null;
            }
        });

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
        
        // Set minimum width based on longest word to prevent layout shifts
        const longestWord = words.reduce((a, b) => a.length > b.length ? a : b);
        const container = element.parentElement;
        if (container && container.classList.contains('typewriter-container')) {
            // Create a temporary element to measure text width
            const measurer = document.createElement('span');
            measurer.style.cssText = `
                visibility: hidden;
                position: absolute;
                top: -9999px;
                left: -9999px;
                white-space: nowrap;
                pointer-events: none;
            `;
            
            // Copy all font-related styles
            const elementStyles = window.getComputedStyle(element);
            ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing'].forEach(prop => {
                measurer.style[prop] = elementStyles[prop];
            });
            
            measurer.textContent = longestWord;
            document.body.appendChild(measurer);
            
            const minWidth = measurer.offsetWidth;
            container.style.minWidth = `${minWidth + 30}px`; // Add padding for cursor
            container.style.display = 'inline-block';
            
            document.body.removeChild(measurer);
        }
        
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let animationId;
        
        // Faster speeds for better user experience
        const typingSpeed = 120;
        const deletingSpeed = 80;
        const pauseTime = 1500;

        function typeWriter() {
            const currentWord = words[currentWordIndex];

            if (isDeleting) {
                // Suppression des caractères
                element.textContent = currentWord.substring(0, currentCharIndex - 1);
                currentCharIndex--;

                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    animationId = setTimeout(typeWriter, 300);
                    element._typewriterAnimation = animationId;
                } else {
                    animationId = setTimeout(typeWriter, deletingSpeed);
                    element._typewriterAnimation = animationId;
                }
            } else {
                // Ajout des caractères
                element.textContent = currentWord.substring(0, currentCharIndex + 1);
                currentCharIndex++;

                if (currentCharIndex === currentWord.length) {
                    isDeleting = true;
                    animationId = setTimeout(typeWriter, pauseTime);
                    element._typewriterAnimation = animationId;
                } else {
                    animationId = setTimeout(typeWriter, typingSpeed);
                    element._typewriterAnimation = animationId;
                }
            }
        }

        // Démarrer l'effet après un petit délai
        animationId = setTimeout(typeWriter, 1000);
        
        // Store animation reference for cleanup
        element._typewriterAnimation = animationId;
    }

    // Fonction pour initialiser le thème
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
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
        console.log('Initializing language:', savedLanguage);
        
        // Set the language immediately
        document.documentElement.lang = savedLanguage;
        document.documentElement.setAttribute('lang', savedLanguage);
        
        // Update language display immediately without animation
        updateLanguageDisplay(savedLanguage);
        updateLanguageUI(savedLanguage);
        updateLanguageButton(savedLanguage);
        updateActiveLanguageOption(savedLanguage);
        
        // Don't use animation on initial load
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
        const subjectsInput = document.getElementById('subjects');
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

        // Get form data
        const formData = new FormData(appointmentForm);
        const subjects = formData.get('subjects') || '';
        
        const templateParams = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            city: formData.get('city'),
            method: formData.get('method'),
            hours: formData.get('hours'),
            subjects: subjects || 'Non spécifiées',
            // Add additional fields that might be needed
            to_email: 'fahd.maatoug@outlook.fr',
            from_name: formData.get('fullName'),
            from_email: formData.get('email'),
            message: `Nouvelle demande de ${formData.get('fullName')} pour ${formData.get('hours')} heures de cours.`,
            // Add submission data for backup
            submission_data: JSON.stringify({
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                city: formData.get('city'),
                method: formData.get('method'),
                hours: formData.get('hours'),
                subjects: subjects,
                timestamp: new Date().toISOString(),
                source: window.location.hostname
            })
        };

        // Store submission locally
        storeSubmission(templateParams);

        // Loading effect
        const submitBtnText = submitBtn.innerHTML;
        const currentLang = document.documentElement.lang || 'fr';
        const loadingText = {
            fr: '<i data-lucide="loader-2" class="spin"></i> Envoi en cours...',
            en: '<i data-lucide="loader-2" class="spin"></i> Sending...',
            ar: '<i data-lucide="loader-2" class="spin"></i> جاري الإرسال...'
        };
        submitBtn.innerHTML = loadingText[currentLang];
        submitBtn.disabled = true;
        lucide.createIcons();

        // Send email using EmailJS with better error handling
        function sendEmailWithRetry(retryCount = 0) {
            const maxRetries = 2;
            
            if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
                console.log('🚀 Sending email with params:', templateParams);
                console.log('📧 Using service:', EMAILJS_CONFIG.SERVICE_ID);
                console.log('📋 Using template:', EMAILJS_CONFIG.TEMPLATE_ID);
                console.log('🌐 Current domain:', window.location.hostname);
                console.log('🔧 EmailJS ready state:', window.emailJSReady);
                console.log('📦 EmailJS object:', typeof emailjs, emailjs);
                
                // Validate configuration first
                if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
                    console.error('❌ EmailJS configuration incomplete:', EMAILJS_CONFIG);
                    showErrorMessage();
                    submitBtn.innerHTML = submitBtnText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Test EmailJS availability
                if (!emailjs.send) {
                    console.error('❌ EmailJS.send method not available');
                    showErrorMessage();
                    submitBtn.innerHTML = submitBtnText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Generate unique submission ID for tracking
                const submissionId = 'SUB_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
                const timestamp = new Date().toLocaleString('fr-FR', { 
                    timeZone: 'Europe/Paris',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                // Send with simpler parameters to avoid template issues
                const simpleParams = {
                    from_name: templateParams.from_name,
                    from_email: templateParams.from_email,
                    message: `🎓 NOUVELLE DEMANDE DE COURS - ${submissionId}

👤 Nom: ${templateParams.from_name}
📧 Email: ${templateParams.from_email}
📱 Téléphone: ${templateParams.phone || 'Non fourni'}
🎯 Niveau: ${templateParams.level || 'Non spécifié'}
📚 Matières: ${templateParams.subjects || 'Non spécifiées'}
⏰ Préférences: ${templateParams.preferences || 'Aucune'}
💬 Commentaires: ${templateParams.message || 'Aucun'}

🌐 Envoyé depuis: ${window.location.hostname}
📅 Date: ${timestamp}
🔍 ID: ${submissionId}

---
OUIIPROF - Cours Particuliers
`,
                    to_name: 'OUIIPROF Admin',
                    to_email: 'fahd.maatoug@outlook.fr',
                    reply_to: templateParams.from_email,
                    submission_id: submissionId
                };
                
                console.log('📤 Sending simplified email params:', simpleParams);
                console.log('🌍 Environment check:', {
                    isVercel: window.location.hostname.includes('vercel.app'),
                    isLocalhost: window.location.hostname === 'localhost',
                    hostname: window.location.hostname,
                    protocol: window.location.protocol
                });
                
                // For Vercel, use direct API call first as it's more reliable
                const isVercel = window.location.hostname.includes('vercel.app');
                
                let emailJSPromise;
                
                if (isVercel) {
                    console.log('🚀 Vercel detected, using direct API call first');
                    // Use direct API call for Vercel
                    emailJSPromise = fetch('https://api.emailjs.com/api/v1.0/email/send', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            service_id: EMAILJS_CONFIG.SERVICE_ID,
                            template_id: EMAILJS_CONFIG.TEMPLATE_ID,
                            user_id: EMAILJS_CONFIG.PUBLIC_KEY,
                            template_params: simpleParams
                        })
                    }).then(response => {
                        console.log('📊 Direct API Response status:', response.status);
                        console.log('📊 Direct API Response headers:', response.headers);
                        if (!response.ok) {
                            return response.text().then(text => {
                                console.error('❌ API Error Response:', text);
                                throw new Error(`HTTP ${response.status}: ${response.statusText} - ${text}`);
                            });
                        }
                        return response.text().then(text => {
                            console.log('✅ Direct API Success Response:', text);
                            return { status: response.status, text: 'OK (Direct API)', response: text };
                        });
                    }).catch(error => {
                        console.warn('🔄 Direct API failed, trying EmailJS library...', error);
                        // Fallback to EmailJS library
                        return emailjs.send(
                            EMAILJS_CONFIG.SERVICE_ID,
                            EMAILJS_CONFIG.TEMPLATE_ID,
                            simpleParams,
                            EMAILJS_CONFIG.PUBLIC_KEY
                        );
                    });
                } else {
                    console.log('🏠 Localhost detected, using EmailJS library');
                    // For localhost, use EmailJS library first
                    emailJSPromise = emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID,
                        simpleParams,
                        EMAILJS_CONFIG.PUBLIC_KEY
                    ).catch(error => {
                        console.warn('🔄 EmailJS library failed, trying direct API call...', error);
                        
                        // Fallback to direct EmailJS REST API call
                        return fetch('https://api.emailjs.com/api/v1.0/email/send', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                service_id: EMAILJS_CONFIG.SERVICE_ID,
                                template_id: EMAILJS_CONFIG.TEMPLATE_ID,
                                user_id: EMAILJS_CONFIG.PUBLIC_KEY,
                                template_params: simpleParams
                            })
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                            }
                            return { status: response.status, text: 'OK (Direct API)' };
                        });
                    });
                }
                
                emailJSPromise.then(
                    function(response) {
                        console.log('✅ EmailJS SUCCESS!', response.status, response.text);
                        console.log('🎯 Full response:', response);
                        console.log('📧 Email sent with ID:', submissionId);
                        console.log('🕒 Timestamp:', timestamp);
                        console.log('🌐 From domain:', window.location.hostname);
                        console.log('📬 To email:', 'fahd.maatoug@outlook.fr');
                        
                        // Store submission locally as backup
                        try {
                            const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                            submissions.unshift({
                                ...templateParams,
                                submissionId,
                                timestamp,
                                domain: window.location.hostname,
                                emailSent: true,
                                emailResponse: response
                            });
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions.slice(0, MAX_STORED_SUBMISSIONS)));
                            console.log('💾 Submission stored locally with email confirmation');
                        } catch (storageError) {
                            console.warn('⚠️ Failed to store submission locally:', storageError);
                        }
                        
                        showSuccessMessage();
                        appointmentForm.reset();
                        // Clear subjects input
                        if (subjectsInput) {
                            subjectsInput.value = '';
                        }
                        submitBtn.innerHTML = submitBtnText;
                        submitBtn.disabled = false;
                    },
                    function(error) {
                        console.error('❌ EmailJS FAILED...', error);
                        console.error('📝 Error status:', error.status);
                        console.error('📝 Error text:', error.text || error.message);
                        console.error('🔄 Retry count:', retryCount);
                        console.error('🔍 Full error object:', JSON.stringify(error));
                        console.error('🌐 Current URL:', window.location.href);
                        console.error('📧 Email config:', EMAILJS_CONFIG);
                        
                        if (retryCount < maxRetries && (error.status === 429 || error.status >= 500)) {
                            console.log(`🔄 Retrying email send in 3 seconds... (attempt ${retryCount + 1}/${maxRetries})`);
                            setTimeout(() => {
                                sendEmailWithRetry(retryCount + 1);
                            }, 3000);
                        } else {
                            console.error('❌ Max retries reached or permanent error, showing error message');
                            showErrorMessage();
                            submitBtn.innerHTML = submitBtnText;
                            submitBtn.disabled = false;
                        }
                    }
                );
            } else {
                // Wait for EmailJS to load and retry
                if (retryCount < maxRetries) {
                    console.warn('EmailJS not ready, waiting and retrying...', retryCount);
                    setTimeout(() => {
                        sendEmailWithRetry(retryCount + 1);
                    }, 1000);
                } else {
                    // Fallback if EmailJS is not configured after retries
                    console.warn('EmailJS not configured after retries. Form data stored locally only.');
                    showSuccessMessage();
                    appointmentForm.reset();
                    submitBtn.innerHTML = submitBtnText;
                    submitBtn.disabled = false;
                }
            }
        }
        
        // Start the email sending process
        sendEmailWithRetry();
    }

    // Store submission in localStorage
    function storeSubmission(data) {
        try {
            const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const submission = {
                ...data,
                timestamp: new Date().toISOString(),
                id: Date.now().toString()
            };
            
            submissions.unshift(submission);
            
            // Keep only the latest MAX_STORED_SUBMISSIONS
            if (submissions.length > MAX_STORED_SUBMISSIONS) {
                submissions.splice(MAX_STORED_SUBMISSIONS);
            }
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
            console.log('Submission stored locally');
        } catch (error) {
            console.error('Error storing submission:', error);
        }
    }

    // Show success message
    function showSuccessMessage() {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }

    // Show error message
    function showErrorMessage() {
        const currentLang = document.documentElement.lang || 'fr';
        const errorMessages = {
            fr: 'Une erreur est survenue. Veuillez réessayer.',
            en: 'An error occurred. Please try again.',
            ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
        };
        
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.innerHTML = `
            <div class="error-content">
                <div class="error-icon">❌</div>
                <p>${errorMessages[currentLang]}</p>
            </div>
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.classList.remove('show');
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
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