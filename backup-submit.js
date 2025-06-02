// Backup submission method for OOUI PROF
// This provides a fallback when EmailJS is not working

(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackupSubmit);
    } else {
        initBackupSubmit();
    }
    
    function initBackupSubmit() {
        console.log('🔧 Initializing backup submission handler');
        
        // Override the submitForm function with a simpler version
        window.submitFormBackup = function() {
            const form = document.getElementById('appointment-form');
            const successMessage = document.getElementById('success-message');
            
            if (!form || !successMessage) {
                console.error('Required elements not found');
                return;
            }
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Add timestamp
            data.timestamp = new Date().toISOString();
            data.submissionId = 'SUB_' + Date.now();
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Store in localStorage
            try {
                const submissions = JSON.parse(localStorage.getItem('ouiiprof_submissions') || '[]');
                submissions.unshift(data);
                localStorage.setItem('ouiiprof_submissions', JSON.stringify(submissions.slice(0, 100)));
                
                console.log('✅ Form data saved locally:', data);
                
                // Show success message
                setTimeout(() => {
                    successMessage.classList.add('show');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 3000);
                }, 1000);
                
            } catch (error) {
                console.error('❌ Failed to save form data:', error);
                
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message show';
                errorDiv.innerHTML = `
                    <div class="error-content">
                        <div class="error-icon">❌</div>
                        <p>Une erreur est survenue. Veuillez réessayer.</p>
                    </div>
                `;
                document.body.appendChild(errorDiv);
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    errorDiv.remove();
                }, 3000);
            }
        };
        
        // Add a method to retrieve stored submissions
        window.getStoredSubmissions = function() {
            try {
                const submissions = JSON.parse(localStorage.getItem('ouiiprof_submissions') || '[]');
                console.table(submissions);
                return submissions;
            } catch (error) {
                console.error('Failed to retrieve submissions:', error);
                return [];
            }
        };
        
        // Add a method to export submissions as CSV
        window.exportSubmissionsCSV = function() {
            const submissions = getStoredSubmissions();
            if (submissions.length === 0) {
                console.log('No submissions to export');
                return;
            }
            
            // Create CSV content
            const headers = Object.keys(submissions[0]).join(',');
            const rows = submissions.map(sub => 
                Object.values(sub).map(val => 
                    typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
                ).join(',')
            );
            
            const csv = [headers, ...rows].join('\n');
            
            // Download CSV
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ouiiprof_submissions_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            
            console.log('✅ CSV exported with', submissions.length, 'submissions');
        };
        
        console.log('✅ Backup submission handler ready');
        console.log('💡 If EmailJS fails, you can call submitFormBackup() manually');
        console.log('💡 To view stored submissions: getStoredSubmissions()');
        console.log('💡 To export as CSV: exportSubmissionsCSV()');
    }
})();