document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const mail = document.getElementById('email').value.trim();
        const number = document.getElementById('phone-number').value.trim();  // Optional
        const company = document.getElementById('company').value.trim();      // Optional
        const message = document.getElementById('message').value.trim();

        // JavaScript validering
        if (!name || !mail || !message) {
            alert("Felter markeret med * skal udfyldes.");
            return;
        }


        if (number && !/^\+45\s\d{8}$/.test(number)) {
            alert("Telefonnummer skal være i formatet: +45 12345678.");
            return;
        }

        if (!message.trim()) {
            alert("Beskeden må ikke være tom eller kun indeholde mellemrum.");
            return;
        }

        if (message.length < 10 || message.length > 500) {
            alert("Besked skal være mellem 10 og 500 tegn.");
            return;
        }


        const payload = {
            name: name,
            mail: mail,
            number: number || null,  // Null er til tomme værdier
            company: company || null,
            message: message
        };

        try {
            const response = await fetch("http://localhost:8080/saveMessage", {
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


