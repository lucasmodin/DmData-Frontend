const baseUrl = window._env_.API_URL;

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();


        // Inline funktion til visning af fejl
        const showError = (elementId, message) => {
            const errorElement = document.getElementById(elementId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.color = "red";
            }
        };

        const clearErrors = () => {
            const errorFields = ["name", "email", "phone-number", "message"];
            errorFields.forEach(id => {
                const errorElement = document.getElementById("error-" + id);
                if (errorElement) errorElement.textContent = "";
            });
        };

        clearErrors();

        const urlPattern = /(https?:\/\/[^\s]+)/gi;
        const onlySpecialChars = /^[^a-zA-Z0-9æøåÆØÅ\s]+$/;

        const name = document.getElementById('name').value.trim();
        const mail = document.getElementById('email').value.trim();
        const number = document.getElementById('phone-number').value.trim();  // Optional
        const company = document.getElementById('company').value.trim();      // Optional
        const message = document.getElementById('message').value.trim();

        let isValid = true;
        if (!name) {
            showError("error-name", "Navn skal udfyldes.");
            isValid = false;
        }

        if (!mail) {
            showError("error-email", "Email skal udfyldes.");
            isValid = false;
        }

        if (!message) {
            showError("error-message", "Besked skal udfyldes.");
            isValid = false;
        }

        if (number && !/^\+45\s\d{8}$/.test(number)) {
            showError("error-phone-number", "Telefonnummer skal være i formatet: +45 12345678.");
            isValid = false;
        }

        if (onlySpecialChars.test(message)) {
            showError("error-message", "Beskeden indeholder kun specialtegn og er ikke gyldig.");
            isValid = false;
        }

        if (message.length < 10 || message.length > 500) {
            showError("error-message", "Besked skal være mellem 10 og 500 tegn.");
            isValid = false;
        }

        if (urlPattern.test(message)) {
            showError("error-message", "Beskeden må ikke indeholde links.");
            isValid = false;
        }

        if (!isValid) return;

        const payload = {
            name: name,
            mail: mail,
            number: number || null,  // Null er til tomme værdier
            company: company || null,
            message: message
        };

        try {
            const response = await fetch(`${baseUrl}/saveMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const createdAt = new Date();
                const localTime = createdAt.toLocaleString("da-DK", {
                    dateStyle: "short",
                    timeStyle: "short"
                });

                alert(`Din besked blev sendt d. ${localTime}.`);
                form.reset();
            } else {
                alert("Fejl ved afsendelse.");
            }

        } catch (error) {
            console.error("Fejl ved afsendelse:", error);
            alert("Fejl ved afsendelse:", error);
        }
    });
});

