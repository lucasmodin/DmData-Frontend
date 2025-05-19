// send-message-frontend.js

document.addEventListener('DOMContentLoaded', () => {
    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const errorEl   = document.getElementById('captcha-error');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 1) almindelig felt-validering
        const { name, email, message } = form;
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert("Felter markeret med * skal udfyldes.");
            return;
        }

        // 2) captcha-token SKAL være sat
        if (!window.captchaToken) {
            errorEl.classList.remove('hidden');
            return;
        }

        // 3) verify-captcha
        const verifyRes = await fetch("http://localhost:8080/verify-captcha", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `g-recaptcha-response=${encodeURIComponent(window.captchaToken)}`
        });
        if (!verifyRes.ok) {
            alert("Captcha validering fejlede. Prøv igen.");
            grecaptcha.reset();
            window.captchaToken = null;
            submitBtn.disabled = true;
            return;
        }

        // 4) send besked
        const payload = {
            name:    name.value.trim(),
            mail:    email.value.trim(),
            number:  form['phone-number'].value.trim() || null,
            company: form.company.value.trim()       || null,
            message: message.value.trim()
        };

        try {
            const res = await fetch("http://localhost:8080/saveMessage", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(payload)
            });
            if (res.ok) {
                const now = new Date().toLocaleString("da-DK", {
                    dateStyle: "short", timeStyle: "short"
                });
                alert(`Din besked blev sendt d. ${now}.`);
                form.reset();
                grecaptcha.reset();
                window.captchaToken = null;
                submitBtn.disabled = true;
            } else {
                alert("Fejl ved afsendelse.");
            }
        } catch (err) {
            console.error("Fejl ved afsendelse:", err);
            alert("Fejl ved afsendelse.");
        }
    });
});
