import { loadCases } from "./cases-overview-api.js";


const grid = document.getElementById('cases-grid')
const loader = document.getElementById('loader');

//dummy data
const TEST_CASES = [
    { id: '1', title: "Real Good Case 1", imageUrl: 'https://placehold.co/600x400/orange/white' },
    { id: '2', title: "Real Good Case 2", imageUrl: 'https://placehold.co/600x400/orange/white' },
    { id: '3', title: "Real Good Case 3", imageUrl: 'https://placehold.co/600x400/orange/white' },
    { id: '4', title: "Real Good Case 4", imageUrl: 'https://placehold.co/600x400/orange/white' },
    { id: '5', title: "Real Good Case 5", imageUrl: 'https://placehold.co/600x400/orange/white' },
    { id: '6', title: "Real Good Case 6", imageUrl: 'https://placehold.co/600x400/orange/white' }

];


async function init() {
    // 1) Vis loader, skjul grid
    loader.classList.remove('hidden');
    grid.classList.add  ('hidden');


    let cases = await loadCases();
    //fallback if something goes wrong
    if(!cases || !cases.length) {
        console.warn('Using test cases as fallback')
        cases = TEST_CASES;
    }
    populateGrid(cases)

    // 2) Når grid er fyldt, skjul loader og vis grid
    loader.classList.add('hidden');
    grid.classList.remove('hidden');

}

function populateGrid(cases) {
    //emptying the grid
    grid.innerHTML = '';

    cases.forEach(c => {
        const card = document.createElement('a');
        card.className = 'case-card';
        card.href = `case.html?id=${encodeURIComponent(c.id)}`;
        card.innerHTML = `
            <div class="card-image" style="background-image:url('${c.imageUrl}')"></div>
            <h2 class="card-title">${c.title}</h2>
          `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', init)