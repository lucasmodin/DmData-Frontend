import { fetchConsent, updateConsent, logVisit } from "./cookie-consent-api.js";

const banner               = document.getElementById("cookie-banner");
const acceptBtn            = document.getElementById("accept-cookies");
const acceptEssentialBtn   = document.getElementById("accept-essential-cookies");



function loadRecaptcha() {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

async function initConsent() {
    // 1) Hent samtykke fra localStorage eller fra backend
    let consent = null;
    const stored = localStorage.getItem("cookieConsent");
    if (stored) {
        consent = JSON.parse(stored);
    } else {
        const fetched = await fetchConsent();
        if (fetched) {
            localStorage.setItem("cookieConsent", JSON.stringify(fetched));
            consent = fetched;
        }
    }

    // 2) Vis eller skjul banner
    if (!consent) {
        banner.style.display = "block";
    } else {
        banner.style.display = "none";

        // 3) Hvis analytics er accepteret OG vi aldrig har logget visit før → logVisit()
        if (consent.analyticsAccepted && !localStorage.getItem("visitLogged")) {
            await logVisit();
            localStorage.setItem("visitLogged", "true");
        }
        loadRecaptcha()
    }
}

// “Accept all” knap
acceptBtn.addEventListener("click", async () => {
    const ok = await updateConsent(true, true);
    if (!ok) return;  // fejl? abort

    const consent = { analyticsAccepted: true, marketingAccepted: true };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    banner.style.display = "none";

    // Log kun første gang
    if (!localStorage.getItem("visitLogged")) {
        await logVisit();
        localStorage.setItem("visitLogged", "true");
    }
    loadRecaptcha()
});

// “Kun essentielle” knap
acceptEssentialBtn.addEventListener("click", async () => {
    const ok = await updateConsent(false, false);
    if (!ok) return;

    const consent = { analyticsAccepted: false, marketingAccepted: false };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    banner.style.display = "none";
    // ingen logVisit, da analytics ikke er godkendt

    if(!localStorage.getItem("visitLogged")) {
        await logVisit();
        localStorage.setItem("visitLogged", "true");
    }
    loadRecaptcha()
});


document.addEventListener("DOMContentLoaded", initConsent);
