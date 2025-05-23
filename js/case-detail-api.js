const baseUrl = window._env_.API_URL;

export async function loadCase(id) {
    try {
        const res = await fetch(`${baseUrl}/api/cases/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Case could not be fetched");
        return await res.json();
    } catch (err) {
        console.error("Failed to load case", err);
        return null;
    }
}