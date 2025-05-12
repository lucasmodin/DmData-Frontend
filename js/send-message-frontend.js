document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const mail = document.getElementById('email').value.trim();
        const number = document.getElementById('phone-number').value.trim();
        const message = document.getElementById('message').value.trim();

        // JavaScript validering
        if (!name || !mail || !message) {
            alert("Felter markeret med * skal udfyldes.");
            return;
        }

        const payload = {
            name: name,
            mail: mail,
            number: number || null, // tillader en null værdi (tomt felt)
            message: message
        };

        //Husk at ændre fetch endpoint til en faktisk URL ved deployment
        //Jeg er ret sikker på at man kan gemme web adressen i en miljø variable

        try {
            const response = await fetch("http://localhost:8080/saveMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Din besked er sendt!");
                form.reset();
            } else {
                alert("Fejl ved afsendelse: " + error); //error er kun til debugging indtil live deployment
            }

        } catch (error) {
            console.error("Fejl ved afsendelse:", error);
            alert("Fejl ved afsendelse:", error);
        }
    });
});
