// MongoDB Backend Form Submission Handler for Academix
async function submitToMongoDB(formData) {
    try {
        // Determine the API endpoint based on environment
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiEndpoint = isDevelopment
            ? 'http://localhost:3000/api/submit-form'  // Vercel dev server
            : '/api/submit-form';  // Production Vercel deployment

        console.log('📤 Submitting to MongoDB backend:', apiEndpoint);
        console.log('📦 Form data:', formData);

        // Make the API request
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Parse the response
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        console.log('✅ MongoDB submission successful:', result);
        return {
            success: true,
            data: result.data,
            message: result.message
        };

    } catch (error) {
        console.error('❌ MongoDB submission failed:', error);
        throw error;
    }
}

// Enhanced handleSubmit function for MongoDB
async function handleSubmitMongoDB(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Get current language from global state
    const currentLanguage = AppState?.currentLanguage || 'fr';

    // Loading state texts
    const loadingTexts = {
        fr: '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...',
        en: '<i class="fas fa-spinner fa-spin"></i> Sending...',
        ar: '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...'
    };

    // Success texts
    const successTexts = {
        fr: 'Réservation envoyée avec succès!',
        en: 'Booking sent successfully!',
        ar: 'تم إرسال الحجز بنجاح!'
    };

    // Error texts
    const errorTexts = {
        fr: 'Erreur lors de l\'envoi. Veuillez réessayer.',
        en: 'Error sending. Please try again.',
        ar: 'خطأ في الإرسال. يرجى المحاولة مرة أخرى.'
    };

    try {
        // Show loading state
        submitBtn.innerHTML = loadingTexts[currentLanguage];
        submitBtn.disabled = true;

        // Get form data
        const formDataObj = new FormData(form);
        const data = {};

        for (let [key, value] of formDataObj.entries()) {
            data[key] = value;
        }

        // Add metadata
        data.timestamp = new Date().toISOString();
        data.language = currentLanguage;
        data.userAgent = navigator.userAgent;

        // Submit to MongoDB backend
        const result = await submitToMongoDB(data);

        // Show success message
        showSuccessMessage(successTexts[currentLanguage]);

        // Reset form
        form.reset();

        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

    } catch (error) {
        console.error('Form submission error:', error);

        // Try to save to localStorage as backup
        try {
            saveToLocalStorage(data);
            console.log('💾 Data saved to localStorage as backup');
        } catch (lsError) {
            console.error('Could not save to localStorage:', lsError);
        }

        // Show error message
        alert(errorTexts[currentLanguage] + '\n\n' + error.message);

        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Save to localStorage as backup
function saveToLocalStorage(data) {
    const submissions = JSON.parse(localStorage.getItem('academix_submissions') || '[]');
    submissions.push({
        ...data,
        savedAt: new Date().toISOString(),
        synced: false
    });
    localStorage.setItem('academix_submissions', JSON.stringify(submissions));
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        const messageP = successDiv.querySelector('p');
        if (messageP) {
            messageP.textContent = message;
        }
        successDiv.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 5000);
    }
}

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.handleSubmitMongoDB = handleSubmitMongoDB;
}
