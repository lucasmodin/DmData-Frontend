

// dette er callback fra reCAPTCHA, når brugeren har løst det
function onCaptchaSuccess(token) {
    document.getElementById('captcha-error').classList.add('hidden');
    document.getElementById('submit-btn').disabled = false;
}


document.addEventListener('DOMContentLoaded', () => {
    const form    = document.getElementById('contact-form');
    const errorEl = document.getElementById('captcha-error');

    form.addEventListener('submit', function(e) {
        const response = grecaptcha.getResponse();
        if (!response) {
            e.preventDefault();
            errorEl.classList.remove('hidden');
        }
    });
});
