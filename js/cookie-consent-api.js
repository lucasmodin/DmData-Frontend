const baseUrl = window._env_.API_URL

export async function fetchConsent() {
    try {
        const res = await fetch(`${baseUrl}/api/cookie-consent`, {
            method: "GET",
            credentials: "include"
        });
        if(res.status === 204) return null;
        if (!res.ok) return null
        return await res.json()
    } catch (err) {
        console.log("failed to fetch consent", err)
        return null
    }
}

export async function updateConsent(analyticsAccepted, marketingAccepted) {
    try {
        const res = await fetch(`${baseUrl}/api/cookie-consent`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({analyticsAccepted, marketingAccepted})
        });
        return res.ok
    } catch (err) {
        console.log("Failed to update consent", err)
        return false;
    }
}

export async function logVisit() {
    try {
        const res = await fetch(`${baseUrl}/api/visits`, {
            method: "POST",
            credentials: "include"
        })
        if (!res.ok) {
            console.log("Visit logging failed", res.status, res.statusText)
        }
    } catch (err) {
        console.log("Visit logging error", err)
    }
}
