const baseUrl = window._env_.API_URL

export async function fetchConsent() {
    const res = await fetch(`${baseUrl}/api/cookie-consent`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) return null
    return await res.json()
}

export async function updateConsent(analyticsAccepted, marketingAccepted) {
    const res = await fetch(`${baseUrl}/api/cookie-consent`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analyticsAccepted, marketingAccepted })
    });
    return res.ok
}

export async function logVisit() {
    await fetch(`${baseUrl}/api/visits`, {
        method: "POST",
        credentials: "include"
    })
}
