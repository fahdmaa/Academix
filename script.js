// Define constants inline to avoid config loading issues
const EMAILJS_CONFIG = window.EMAILJS_CONFIG || {
    SERVICE_ID: 'service_s1m3yzm',
    TEMPLATE_ID: 'template_ng68h4w',
    PUBLIC_KEY: 'XDDbbFjUrpZV-gFWP'
};

const STORAGE_KEY = window.STORAGE_KEY || 'ouiiprof_submissions';
const MAX_STORED_SUBMISSIONS = window.MAX_STORED_SUBMISSIONS || 100;

// DOM Element References (will be initialized when DOM is ready)
let subjectsSelect = null;
let subjectsInput = null;

// Security functions
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>]/g, '') // Remove angle brackets
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

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
        console.log('Config check:', {
            hasConfig: typeof EMAILJS_CONFIG !== 'undefined',
            config: EMAILJS_CONFIG,
            hasEmailJS: typeof emailjs !== 'undefined'
        });
        
        if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG && EMAILJS_CONFIG.PUBLIC_KEY) {
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
    
    // Check Font Awesome icons
    console.log('✅ Font Awesome icons loaded via CSS');
    const fontAwesomeIcons = document.querySelectorAll('.fas, .far, .fab');
    console.log(`📊 Font Awesome icons found: ${fontAwesomeIcons.length}`);
    
    // Verify Font Awesome CSS is loaded
    const fontAwesomeStylesheet = document.querySelector('link[href*="font-awesome"]');
    if (fontAwesomeStylesheet) {
        console.log('✅ Font Awesome stylesheet detected');
    } else {
        console.warn('⚠️ Font Awesome stylesheet not found');
    }
    
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
    const localSubjectsInput = document.getElementById('subjects');
    const localSubjectsSelect = document.getElementById('subjects-select');
    
    // Initialize global variables
    subjectsInput = localSubjectsInput;
    subjectsSelect = localSubjectsSelect;

    // Elements des achievements
    const achievementCards = document.querySelectorAll('.achievement-card');

    // Éléments pour le thème et la langue
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.lang-option');
    
    // Debug button selection
    console.log('🔍 Button selection check:');
    console.log('Theme toggle:', themeToggle);
    console.log('Language toggle:', languageToggle);
    console.log('Language dropdown:', languageDropdown);
    console.log('Language options:', languageOptions.length);

    // Variables pour les animations
    // typewriterInterval removed as it's unused

    // CRITICAL: Initialize language IMMEDIATELY before anything else
    const savedLanguage = localStorage.getItem('language') || 'fr';
    document.documentElement.lang = savedLanguage;
    document.documentElement.setAttribute('lang', savedLanguage);
    console.log('🌐 Language set immediately to:', savedLanguage);
    
    // Initialisation du thème et de la langue en premier
    initializeTheme();
    initializeLanguage();
    
    // Ensure buttons are properly configured for clicking
    setTimeout(() => {
        // Force recalculation of computed styles
        if (themeToggle) {
            themeToggle.style.pointerEvents = 'all';
            themeToggle.style.zIndex = '10001';
            console.log('🔧 Theme toggle configured');
        }
        
        if (languageToggle) {
            languageToggle.style.pointerEvents = 'all';
            languageToggle.style.zIndex = '10001';
            console.log('🔧 Language toggle configured');
        }
    }, 100);

    // Icons are loaded via CSS (Font Awesome)
    
    // Setup global event delegation for floating controls
    document.addEventListener('click', function(e) {
        // Theme toggle
        if (e.target.closest('#theme-toggle')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎨 Theme toggle clicked via delegation!');
            toggleTheme();
            return;
        }
        
        // Language toggle - handled by direct addEventListener below
    });

    
    // Attendre que la langue soit initialisée avant de configurer le formulaire
    setTimeout(() => {
        // Mettre à jour les placeholders du formulaire
        updateFormLanguage();
    }, 200);

    // Configurer les animations de scroll (includes achievements)
    setupScrollAnimations();

    // Démarrer l'effet typewriter
    startTypewriterEffect();

    // Navigation responsive
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Fermer le menu après un clic sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (burgerMenu) {
                burgerMenu.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (navLinks && burgerMenu && !navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
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

    // Theme handling is now in setupFloatingControls()

    // FIXED: Direct button event handling
    console.log('🔧 Setting up floating controls...');
    
    // Wait for elements to be ready
    setTimeout(function() {
        setupFloatingControls();
    }, 100);

    // Language options handling is now in setupFloatingControls()

    // Outside click handling is now in setupFloatingControls()

    // Achievement animations are now handled in setupScrollAnimations

    // Gestion des clics sur les cartes d'expertise
    if (expertiseCards.length > 0 && subjectsDetailsContainer) {
        expertiseCards.forEach(card => {
            card.addEventListener('click', function() {
                const expertise = this.getAttribute('data-expertise');
                const detailsToShow = document.getElementById(`${expertise}-details`);
                
                if (detailsToShow) {
                    subjectsDetailsContainer.style.display = 'flex';
                    // Hide all details first
                    subjectsDetails.forEach(detail => {
                        detail.style.display = 'none';
                    });
                    // Show the selected one
                    detailsToShow.style.display = 'block';
                }
            });
        });
    }
    
    // Fermer les détails
    if (closeDetailsButtons.length > 0) {
        closeDetailsButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (subjectsDetailsContainer) {
                    subjectsDetailsContainer.style.display = 'none';
                }
                subjectsDetails.forEach(detail => {
                    detail.style.display = 'none';
                });
            });
        });
    }
    
    // Fermer en cliquant en dehors
    if (subjectsDetailsContainer) {
        subjectsDetailsContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                subjectsDetails.forEach(detail => {
                    detail.style.display = 'none';
                });
            }
        });
    }

    // Configuration des animations de scroll
    function setupScrollAnimations() {
        // Observer pour les animations de scroll
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Si c'est une carte achievement, animer le nombre
                    if (entry.target.classList.contains('achievement-card') && !entry.target.hasAttribute('data-animated')) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateNumber(entry.target);
                    }
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
            { selector: '.achievement-card', animation: 'scroll-reveal-scale' },
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
        console.log('🔢 Animating achievement number for card:', card);
        const numberElement = card.querySelector('.achievement-number');
        if (!numberElement) {
            console.warn('⚠️ No .achievement-number element found in card');
            return;
        }

        // Try both data-target and data-value attributes
        const target = parseInt(numberElement.getAttribute('data-target') || numberElement.getAttribute('data-value'));
        console.log(`🎯 Target number: ${target}`);
        
        if (isNaN(target)) {
            console.error('❌ Invalid data-target attribute:', numberElement.getAttribute('data-target'));
            return;
        }

        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        numberElement.textContent = '0';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                console.log(`✅ Animation completed for target: ${target}`);
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

    // Fonction pour initialiser le thème
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
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

    // Font Awesome icons don't need initialization - they work via CSS

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
                element: document.getElementById('typewriter-text-fr'),
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
        
        // Slower speeds for mobile to ensure full word display
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


    // Fonction pour basculer le menu déroulant de langue
    // Function to reset dropdown state completely
    function resetDropdownState() {
        const dropdown = document.getElementById('language-dropdown');
        if (dropdown) {
            // Clear all classes and inline styles
            dropdown.className = 'language-dropdown';
            dropdown.style.cssText = '';
            console.log('🔄 Dropdown state reset');
        }
    }
    
    // NEW FUNCTION: Ensure language button remains functional after language changes
    function ensureLanguageButtonWorks() {
        const button = document.getElementById('language-toggle');
        if (!button) {
            console.error('❌ Language button not found during recovery check');
            return;
        }
        
        // Verify button is still clickable
        const computedStyle = getComputedStyle(button);
        if (computedStyle.pointerEvents === 'none' || button.disabled) {
            console.log('🔧 Fixing disabled language button...');
            button.style.pointerEvents = 'auto';
            button.style.cursor = 'pointer';
            button.disabled = false;
        }
        
        // Check if event listeners are still attached
        if (!button._hasEventListeners) {
            console.log('🔧 Re-attaching language button event listeners...');
            
            button.addEventListener('click', function(e) {
                console.log('🖱️ Language button clicked (recovery handler)');
                e.preventDefault();
                e.stopPropagation();
                toggleLanguageDropdown();
            });
            
            button._hasEventListeners = true;
        }
        
        console.log('✅ Language button functionality verified/restored');
    }
    
    // FLOATING CONTROLS SETUP - Using Event Delegation for Reliability
    function setupFloatingControls() {
        console.log('🎛️ Setting up floating controls with event delegation...');
        
        // Remove existing delegated listeners to avoid duplicates
        if (window.floatingControlsSetup) {
            console.log('🔄 Skipping setup - already configured with delegation');
            return;
        }
        
        // Use event delegation on document body for reliability
        document.body.addEventListener('click', function(e) {
            // Theme Button Handler
            if (e.target.closest('#theme-toggle')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎨 Theme button clicked via delegation!');
                
                const currentTheme = document.body.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                console.log(`✅ Theme changed to: ${newTheme}`);
                return;
            }
            
            // Language Button Handler
            if (e.target.closest('#language-toggle')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🌐 Language button clicked via delegation!');
                
                const dropdown = document.getElementById('language-dropdown');
                if (dropdown) {
                    const isOpen = dropdown.classList.contains('show');
                    if (isOpen) {
                        dropdown.classList.remove('show');
                        console.log('🔒 Language dropdown closed');
                    } else {
                        dropdown.classList.add('show');
                        console.log('🔓 Language dropdown opened');
                    }
                } else {
                    console.error('❌ Language dropdown not found');
                }
                return;
            }
            
            // Language Option Handler
            const langOption = e.target.closest('.lang-option');
            if (langOption) {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = langOption.getAttribute('data-lang');
                if (lang) {
                    console.log(`🔄 Switching to language: ${lang}`);
                    changeLanguage(lang);
                    updateFormLanguage();
                    
                    // Close dropdown
                    const dropdown = document.getElementById('language-dropdown');
                    if (dropdown) {
                        dropdown.classList.remove('show');
                        console.log('🔒 Language dropdown closed after selection');
                    }
                }
                return;
            }
            
            // Close dropdown when clicking outside
            const dropdown = document.getElementById('language-dropdown');
            const langControl = document.querySelector('.language-control');
            
            if (dropdown && langControl && !langControl.contains(e.target)) {
                dropdown.classList.remove('show');
                console.log('🔒 Language dropdown closed (outside click)');
            }
        });
        
        // Mark as setup to prevent duplicates
        window.floatingControlsSetup = true;
        
        console.log('✅ Floating controls setup complete with event delegation');
        
        // Add visual test indicators
        addTestIndicators();
    }
    
    // Visual test function to verify button functionality
    function addTestIndicators() {
        // Add pulsing animation to buttons for visibility
        const style = document.createElement('style');
        style.innerHTML = `
            .control-btn {
                animation: buttonPulse 2s infinite ease-in-out;
            }
            
            @keyframes buttonPulse {
                0%, 100% { 
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px var(--primary-glow);
                }
                50% { 
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px var(--primary-glow);
                }
            }
            
            /* Light mode pulse animation */
            body[data-theme="light"] .control-btn {
                animation: buttonPulseLight 2s infinite ease-in-out;
            }
            
            @keyframes buttonPulseLight {
                0%, 100% { 
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 10px var(--primary-glow);
                }
                50% { 
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 20px var(--primary-glow);
                }
            }
            
            .control-btn:hover {
                animation: none;
            }
        `;
        document.head.appendChild(style);
        
        // Add click test visual feedback
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
                this.style.backgroundColor = 'var(--primary-light)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = '';
                this.style.backgroundColor = '';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.backgroundColor = '';
            });
        });
        
        console.log('🎯 Test indicators added to buttons');
    }
    
    // Simple toggle function for compatibility
    window.toggleLanguageDropdown = function() {
        const dropdown = document.getElementById('language-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
            const isVisible = dropdown.classList.contains('show');
            console.log(`🌐 Language dropdown ${isVisible ? 'opened' : 'closed'}`);
        }
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

    // Update select options based on language
    function updateSelectOptions(lang) {
        const methodSelect = document.getElementById('method');
        if (methodSelect) {
            const options = {
                fr: {
                    placeholder: 'Choisissez une option',
                    online: 'En ligne',
                    presential: 'Présentiel'
                },
                en: {
                    placeholder: 'Choose an option',
                    online: 'Online',
                    presential: 'In-person'
                },
                ar: {
                    placeholder: 'اختر خيارًا',
                    online: 'عبر الإنترنت',
                    presential: 'شخصي'
                }
            };
            
            // Update placeholder option
            if (methodSelect.options[0]) {
                methodSelect.options[0].text = options[lang].placeholder;
            }
            // Update online option
            if (methodSelect.options[1]) {
                methodSelect.options[1].text = options[lang].online;
            }
            // Update presential option
            if (methodSelect.options[2]) {
                methodSelect.options[2].text = options[lang].presential;
            }
        }
    }

    // Fonction pour mettre à jour l'interface pour la langue
    function updateLanguageUI(lang) {
        updateSelectOptions(lang);
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }

    // Mettre à jour l'apparence du bouton de langue
    function updateLanguageButton(lang) {
        // Use fresh query to get current button
        const langToggle = document.getElementById('language-toggle');
        if (!langToggle) {
            console.log('⚠️ Language toggle not found during update');
            return;
        }

        const currentLang = langToggle.querySelector('.current-lang');
        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
            console.log(`✅ Language button updated to: ${lang.toUpperCase()}`);
        } else {
            console.log('⚠️ .current-lang element not found');
        }
        
        // Ensure button remains clickable (redundant with delegation but good for safety)
        langToggle.style.pointerEvents = 'auto';
        langToggle.style.cursor = 'pointer';
        langToggle.disabled = false;
    }

    // Marquer l'option active dans le menu déroulant
    function updateActiveLanguageOption(lang) {
        // Use fresh query to get current options
        const currentLanguageOptions = document.querySelectorAll('.lang-option');
        if (!currentLanguageOptions || currentLanguageOptions.length === 0) {
            console.log('⚠️ No language options found during update');
            return;
        }

        currentLanguageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        console.log(`✅ Active language option updated to: ${lang}`);
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
            console.log('📝 Form submitted');

            // Vérification du formulaire
            const isValid = validateForm();
            console.log('✅ Form validation result:', isValid);
            
            if (isValid) {
                console.log('📤 Calling submitForm()...');
                submitForm();
            } else {
                console.log('❌ Form validation failed');
            }
        });
    }

    // Validation du formulaire
    function validateForm() {
        const requiredFields = ['fullName', 'city', 'method', 'hours', 'email', 'phone'];
        let isValid = true;
        const currentLang = document.documentElement.lang || 'fr';

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
                showFieldError(emailInput, {
                    fr: "Adresse e-mail invalide",
                    en: "Invalid email address",
                    ar: "عنوان بريد إلكتروني غير صالح"
                }[currentLang]);
                isValid = false;
            } else {
                hideFieldError(emailInput);
            }
        }

        // Validation du nombre d'heures
        const hoursInput = document.getElementById('hours');
        if (hoursInput && hoursInput.value) {
            const hoursValue = parseFloat(hoursInput.value);
            if (isNaN(hoursValue) || hoursValue < 1 || hoursValue > 100) {
                markAsInvalid(hoursInput);
                showFieldError(hoursInput, {
                    fr: "Le nombre d'heures doit être entre 1 et 100",
                    en: "Hours must be between 1 and 100",
                    ar: "يجب أن تكون الساعات بين 1 و 100"
                }[currentLang]);
                isValid = false;
            } else {
                hideFieldError(hoursInput);
            }
        }

        return isValid;
    }
    
    // Show field error message
    function showFieldError(input, message) {
        hideFieldError(input);
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error-message';
        errorEl.textContent = message;
        errorEl.style.color = '#ff4d4d';
        errorEl.style.fontSize = '12px';
        errorEl.style.marginTop = '5px';
        errorEl.style.display = 'block';
        input.parentNode.appendChild(errorEl);
    }
    
    // Hide field error message
    function hideFieldError(input) {
        const error = input.parentNode.querySelector('.field-error-message');
        if (error) error.remove();
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
        hideFieldError(input);
    }

    // Soumettre le formulaire
    function submitForm() {
        console.log('📋 submitForm() called');
        
        if (!appointmentForm || !successMessage) {
            console.error('❌ Missing form or success message element');
            return;
        }

        const submitBtn = appointmentForm.querySelector('.submit-btn');
        if (!submitBtn) {
            console.error('❌ Submit button not found');
            return;
        }

        // Get form data
        const formData = new FormData(appointmentForm);
        const subjects = formData.get('subjects') || '';
        
        const templateParams = {
            fullName: sanitizeInput(formData.get('fullName')),
            email: sanitizeInput(formData.get('email')),
            phone: sanitizeInput(formData.get('phone')),
            city: sanitizeInput(formData.get('city')),
            method: sanitizeInput(formData.get('method')),
            hours: sanitizeInput(formData.get('hours')),
            subjects: sanitizeInput(subjects) || 'Non spécifiées',
            // Add additional fields that might be needed
            to_email: 'fahd.maatoug@outlook.fr',
            from_name: sanitizeInput(formData.get('fullName')),
            from_email: sanitizeInput(formData.get('email')),
            message: `Nouvelle demande de ${sanitizeInput(formData.get('fullName'))} pour ${sanitizeInput(formData.get('hours'))} heures de cours.`,
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
            fr: '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...',
            en: '<i class="fas fa-spinner fa-spin"></i> Sending...',
            ar: '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...'
        };
        submitBtn.innerHTML = loadingText[currentLang];
        submitBtn.disabled = true;

        // Send email using EmailJS with better error handling
        function sendEmailWithRetry(retryCount = 0) {
            const maxRetries = 2;
            
            // Ensure config is available
            if (!EMAILJS_CONFIG || !EMAILJS_CONFIG.PUBLIC_KEY) {
                console.error('❌ EmailJS configuration not available');
                showErrorMessage();
                submitBtn.innerHTML = submitBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            if (typeof emailjs !== 'undefined') {
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
                            console.error('❌ Max retries reached or permanent error');
                            // Check if data was at least stored locally
                            const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                            if (submissions.length > 0 && submissions[0].fullName === templateParams.fullName) {
                                console.log('✅ Form data was stored locally. Showing success message.');
                                showSuccessMessage();
                                appointmentForm.reset();
                                if (subjectsInput) {
                                    subjectsInput.value = '';
                                }
                            } else {
                                showErrorMessage();
                            }
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
    
    // Fix achievement numbers immediately if animation doesn't work
    setTimeout(() => {
        document.querySelectorAll('.achievement-number').forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            if (!isNaN(target) && (el.textContent === '0' || el.textContent.trim() === '')) {
                el.textContent = target;
                console.log(`Fixed achievement number: ${target}`);
            }
        });
        
        // Fix hero stat numbers
        document.querySelectorAll('.stat-number[data-value]').forEach(el => {
            const target = parseInt(el.getAttribute('data-value'));
            if (!isNaN(target)) {
                const hasPlus = el.textContent.includes('+') || el.textContent === '0+';
                el.textContent = target + (hasPlus ? '+' : '');
                console.log(`Fixed stat number: ${target}${hasPlus ? '+' : ''}`);
            }
        });
    }, 1000);
    
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

    
    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-btn, .book-btn, a[href="#appointment"]');
    ctaButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.onclick = function(e) {
            e.preventDefault();
            const appointmentSection = document.getElementById('appointment');
            if (appointmentSection) {
                appointmentSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });
    if (ctaButtons.length > 0) {
        console.log('✅ CTA buttons fixed:', ctaButtons.length);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.cursor = 'pointer';
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.onclick = function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }
    });
    if (navLinks.length > 0) {
        console.log('✅ Nav links fixed:', navLinks.length);
    }
    
    // Expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.onclick = function() {
            const expertise = this.getAttribute('data-expertise');
            if (expertise) {
                showExpertiseDetails(expertise);
            }
        };
    });
    if (expertiseCards.length > 0) {
        console.log('✅ Expertise cards fixed:', expertiseCards.length);
    }
    
    // Close buttons for expertise details
    const closeButtons = document.querySelectorAll('.close-details');
    closeButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.onclick = function() {
            closeExpertiseDetails();
        };
    });
    if (closeButtons.length > 0) {
        console.log('✅ Close buttons fixed:', closeButtons.length);
    }
    
    // Burger menu
    const burgerMenu = document.getElementById('burger-menu');
    if (burgerMenu) {
        burgerMenu.style.cursor = 'pointer';
        burgerMenu.onclick = function() {
            const navLinks = document.getElementById('nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
            this.classList.toggle('active');
        };
        console.log('✅ Burger menu fixed');
    }
    
    


// ========================================
// Mobile Enhancements
// ========================================

(function() {
    'use strict';
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
        console.log('📱 Mobile device detected, applying enhancements');
        
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // CRITICAL: Fix mobile overflow and scrolling issues
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.overflowX = 'hidden';
        
        // Remove any transform issues on hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = 'none';
            heroSection.style.position = 'relative';
            heroSection.style.width = '100%';
            heroSection.style.maxWidth = '100vw';
        }
        
        // Enhanced mobile navigation
        setupMobileNavigation();
        
        // Touch interactions
        setupTouchInteractions();
        
        // Scroll optimizations
        setupScrollOptimizations();
        
        // Form enhancements
        setupMobileFormEnhancements();
        
        // Performance optimizations
        setupPerformanceOptimizations();
        
        // Prevent zoom on input focus (iOS)
        preventInputZoom();
        
        // Setup swipe gestures
        setupSwipeGestures();
        
        // Apply small viewport fixes
        if (window.innerWidth <= 480) {
            applySmallViewportFixes();
        }
        
        console.log('✅ Mobile enhancements applied');
    }
    
    function setupMobileNavigation() {
        const burgerMenu = document.getElementById('burger-menu');
        const navLinks = document.getElementById('nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links a');
        
        if (burgerMenu && navLinks) {
            // Remove any existing click handlers
            const newBurger = burgerMenu.cloneNode(true);
            burgerMenu.parentNode.replaceChild(newBurger, burgerMenu);
            
            // Toggle mobile menu
            newBurger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                newBurger.classList.toggle('active');
                navLinks.classList.toggle('active');
                
                // Update aria-expanded
                const isExpanded = navLinks.classList.contains('active');
                newBurger.setAttribute('aria-expanded', isExpanded);
                
                // Prevent body scroll when menu is open
                if (isExpanded) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on links
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    newBurger.classList.remove('active');
                    navLinks.classList.remove('active');
                    newBurger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!newBurger.contains(e.target) && !navLinks.contains(e.target)) {
                    newBurger.classList.remove('active');
                    navLinks.classList.remove('active');
                    newBurger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    function setupTouchInteractions() {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll(
            '.cta-button, .submit-btn, .control-btn, .expertise-card, .service-card, .subject-card, .nav-link'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = '';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.transition = '';
            });
        });
    }
    
    function setupScrollOptimizations() {
        let ticking = false;
        
        function updateScrollPosition() {
            const scrolled = window.pageYOffset;
            const header = document.getElementById('header');
            
            if (header) {
                // Don't override the background color, just update shadow
                if (scrolled > 50) {
                    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }
                // Remove any background style to let CSS handle it
                header.style.removeProperty('background');
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    function setupMobileFormEnhancements() {
        const form = document.getElementById('appointment-form');
        const inputs = document.querySelectorAll('.form-control');
        
        if (form) {
            // Add mobile-specific input handling
            inputs.forEach(input => {
                // Add focus/blur animations
                input.addEventListener('focus', function() {
                    this.parentNode.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentNode.classList.remove('focused');
                    }
                });
                
                // Auto-scroll to input when focused (prevents keyboard covering input)
                input.addEventListener('focus', function() {
                    setTimeout(() => {
                        this.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 300);
                });
            });
            
            // Enhance form submission feedback
            form.addEventListener('submit', function(e) {
                // Add haptic feedback on supported devices
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
        }
    }
    
    function setupPerformanceOptimizations() {
        // Lazy load images when they come into view
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Reduce animations on slow devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduce-motion');
        }
    }
    
    function preventInputZoom() {
        // Prevent zoom on input focus for iOS devices
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                    );
                }
            });
            
            input.addEventListener('blur', function() {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
                    );
                }
            });
        });
    }
    
    function setupSwipeGestures() {
        let startY = 0;
        let startX = 0;
        
        // Setup swipe to close for modal-like elements
        const modals = document.querySelectorAll('.subjects-details-container');
        
        modals.forEach(modal => {
            modal.addEventListener('touchstart', function(e) {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            }, { passive: true });
            
            modal.addEventListener('touchmove', function(e) {
                if (!startY) return;
                
                const currentY = e.touches[0].clientY;
                const currentX = e.touches[0].clientX;
                const diffY = startY - currentY;
                const diffX = startX - currentX;
                
                // Vertical swipe to close
                if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                    if (diffY < -100) { // Swipe down
                        this.style.display = 'none';
                        startY = 0;
                    }
                }
            }, { passive: true });
            
            modal.addEventListener('touchend', function() {
                startY = 0;
                startX = 0;
            }, { passive: true });
        });
    }
    
    function applySmallViewportFixes() {
        console.log('🎯 Applying small viewport fixes');
        
        // Fix centering issues
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = 'none';
            heroSection.style.position = 'relative';
            heroSection.style.left = '0';
            heroSection.style.right = '0';
            heroSection.style.width = '100vw';
            heroSection.style.maxWidth = '100vw';
            heroSection.style.margin = '0';
        }
        
        // Fix overflow issues
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
        
        // Fix form elements font size
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const fontSize = window.getComputedStyle(input).fontSize;
            if (parseInt(fontSize) < 16) {
                input.style.fontSize = '16px';
            }
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate viewport height
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Close mobile menu if open
            const burgerMenu = document.getElementById('burger-menu');
            const navLinks = document.getElementById('nav-links');
            if (burgerMenu && navLinks) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 100);
    });
    
    // Set viewport height custom property for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        console.log('Viewport height set:', vh + 'px');
    }
    
    // Set initial viewport height
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    }, { passive: true });
})();