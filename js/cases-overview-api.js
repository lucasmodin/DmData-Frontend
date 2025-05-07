async function loadCases() {
    try {
        const res = await fetch('/api/cases');
        const cases = await res.json();
        const grid = document.getElementById('cases-grid');

        cases.forEach(c => {
            const card = document.createElement('a');
            card.className = 'case-card';
            card.href      = `case.html?id=${encodeURIComponent(c.id)}`;
            card.innerHTML = `
            <div class="card-image" style="background-image:url('${c.imageUrl}')"></div>
            <h2 class="card-title">${c.title}</h2>
          `;
            grid.appendChild(card);
        });
    } catch(err) {
        console.error('Failed to load cases', err);
    }
}

document.addEventListener('DOMContentLoaded', loadCases);