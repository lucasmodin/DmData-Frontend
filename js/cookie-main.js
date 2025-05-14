import { fetchConsent, updateConsent, logVisit} from "./cookie-api.js";

const banner = document.getElementById("cookie-banner")
const acceptBtn = document.getElementById("accept-cookies")
const denyBtn = document.getElementById("deny-cookies")



async function initConsent() {
    const consent = await fetchConsent();
    if (!consent) {
        //ingen samtykke: vis banner
    } else {
        //samtykke: skjul banner

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
        //skjul banner
        await logVisit();
    }
})

//afvisnings knap
denyBtn.addEventListener("click", async () => {
    const ok = await updateConsent(false, false)
    if (ok) {
        //skjul banner
    }
})

document.addEventListener("DOMContentLoaded", initConsent)