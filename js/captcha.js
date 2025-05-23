window.captchaToken = null;

document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById('submit-btn');
    const errorEl   = document.getElementById('captcha-error');
    const baseUrl   = window._env_.API_URL;

    submitBtn.disabled = true;

    window.onCaptchaSuccess = async function (token) {
        window.captchaToken = token;

        // Verificér captcha-token med backend med det samme
        try {
            const res = await fetch(`${baseUrl}/verify-captcha`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `g-recaptcha-response=${encodeURIComponent(token)}`
            });

            if (res.ok) {
                // Success → enable knap
                submitBtn.disabled = false;
                errorEl.classList.add("hidden");
            } else {
                // Fejl i verificering → reset captcha
                grecaptcha.reset();
                window.captchaToken = null;
                submitBtn.disabled = true;
                errorEl.classList.remove("hidden");
            }
        } catch (err) {
            console.error("Fejl ved captcha-verificering:", err);
            grecaptcha.reset();
            window.captchaToken = null;
            submitBtn.disabled = true;
            errorEl.classList.remove("hidden");
        }
    };

    window.onCaptchaExpired = function () {
        window.captchaToken = null;
        submitBtn.disabled = true;
    };
});
