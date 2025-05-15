const baseUrl = "http://localhost:8080"

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

