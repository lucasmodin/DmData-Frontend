// captcha.js

window.captchaToken = null;

// al DOM-init herinde
document.addEventListener("DOMContentLoaded", () => {
    const errorEl        = document.getElementById('captcha-error');
    const submitBtn      = document.getElementById('submit-btn');
    const captchaInstrEl = document.getElementById('captcha-instruction');

    // Start-state: knap deaktiveret, vis instruktion
    submitBtn.disabled = true;
    captchaInstrEl.classList.remove('hidden');

    // Når captcha er løst, kaldes denne global
    window.onCaptchaSuccess = function(token) {
        window.captchaToken = token;

        // Skjul fejl og instruktion, aktiver knap
        errorEl.classList.add('hidden');
        captchaInstrEl.classList.add('hidden');

        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
    };
});
