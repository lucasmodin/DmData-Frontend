const USE_MOCK = false;

const baseUrl = "http://localhost:8080";

export async function fetchConsent() {
    if (USE_MOCK) {
        return null;
    }

    try {
        const res = await fetch(`${baseUrl}/api/cookie-consent`, {
            method: "GET",
            credentials: "include"
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.warn("fetchConsent failed: ", err.message);
        return null;
    }
}

export async function updateConsent(analyticsAccepted, marketingAccepted) {
    if (USE_MOCK) {
        console.log("Mock updateConsent", { analyticsAccepted, marketingAccepted });
        return true;
    }

    try {
        const res = await fetch(`${baseUrl}/api/cookie-consent`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ analyticsAccepted, marketingAccepted })
        });
        return res.ok;
    } catch (err) {
        console.warn("updateConsent failed: ", err.message);
        return false;
    }
}

export async function logVisit() {
    if (USE_MOCK) {
        console.log("Mock visit logged");
        return;
    }

    try {
        await fetch(`${baseUrl}/api/visits`, {
            method: "POST",
            credentials: "include"
        });
    } catch (err) {
        console.warn("logVisit failed: ", err.message);
    }
}
