const baseUrl = "http://localhost:8080"

async function loadCases() {
    try {
        const res = await fetch(`${baseUrl}/api/cases`);

        if (!res.ok) {
            throw new Error("Cases could not be fetched")
        }

        return await res.json()
    } catch(err) {
        console.error('Failed to load cases', err);
        return null;
    }
}


export { loadCases }
