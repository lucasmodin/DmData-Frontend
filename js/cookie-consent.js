import { fetchConsent, updateConsent} from "./cookie-consent-api.js";

const banner = document.getElementById("cookie-banner")
const acceptBtn = document.getElementById("accept-cookies")
const acceptEssentialBtn = document.getElementById('accept-essential-cookies');
const denyBtn = document.getElementById("deny-cookies")



async function initConsent() {
    let consent = null;
    const stored = localStorage.getItem("cookieConsent")
    if(stored) {
        consent = JSON.parse(stored)
    } else {
        const consent = await fetchConsent();
        if (consent) {
            localStorage.setItem("cookieConsent", JSON.stringify(consent))
        }
    }

    if (!consent) {
        banner.style.display = "block"
    } else {
        banner.style.display = "none"
        //hvis brugeren siger ja til alle cookies
        if(consent.analyticsAccepted) {
            await logVisit();
        }
    }
}

//acceptering af alle cookies knap
acceptBtn.addEventListener("click", async () =>{
    const ok = await updateConsent(true, true);
    if (ok) {
        const consent = { analyticsAccepted: true, marketingAccepted: true}
        localStorage.setItem("cookieConsent", JSON.stringify(consent))
        banner.style.display = "none"
        await logVisit();
    }
})

//kun essentielle cookies
acceptEssentialBtn.addEventListener('click', async () => {
    const ok = await updateConsent(true, false)
    if (ok) {
        const consent = { analyticsAccepted: true, marketingAccepted: false}
        localStorage.setItem("cookieConsent", JSON.stringify(consent));
        banner.style.display = 'none';

    }
});

//afvisnings knap
denyBtn.addEventListener("click", async () => {
    const ok = await updateConsent(false, false)
    if (ok) {
        const consent = { analyticsAccepted: false, marketingAccepted: false}
        localStorage.setItem("cookieConsent", JSON.stringify(consent))
        banner.style.display = "none"
    }
})

document.addEventListener("DOMContentLoaded", initConsent)