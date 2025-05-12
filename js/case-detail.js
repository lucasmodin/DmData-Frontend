// js/case-detail.js

import { loadCase } from "./case-detail-api.js";

// — Toggle dummy-mode for testing —
const USE_DUMMY = false;
const TEST_CASE = {
    id: "demo",
    title: "Demo Case: Rød Tråd",
    dateCreated: "2025-05-11T15:30:00",
    imagePath: "https://placehold.co/800x450/2C8ED6/ffffff?text=Demo+Image",
    description: `Dette er en dummy-beskrivelse til demo.`
};

// — Element-refs —
const overviewSkel  = document.getElementById("overview-skeleton");
const contentSkel   = document.getElementById("content-skeleton");
const caseDetail    = document.getElementById("case-detail");
const backBtn       = document.getElementById("back-button");
const titleEl       = document.getElementById("case-title");
const dateEl        = document.getElementById("case-date");
const imgContainer  = document.getElementById("case-image").parentElement;
const imgEl         = document.getElementById("case-image");
// wrapper omkring indholdet i content-skeleton (hvid boks)
const descContainer = document.querySelector("#content-skeleton .detail-content");

// — Tilbage-knap —
backBtn.addEventListener("click", () => window.history.back());

// — Hent ?id= fra URL —
function getCaseId() {
    return new URLSearchParams(window.location.search).get("id");
}

// — Toggles for skeleton vs detail/overskrift —
function showSkeleton() {
    overviewSkel.classList.remove("hidden");
    contentSkel.classList.remove("hidden");
    caseDetail.classList.add("hidden");
    titleEl.classList.add("hidden");
    dateEl.classList.add("hidden");
}
function hideOverviewSkeleton() {
    overviewSkel.classList.add("hidden");
}
function hideContentSkeleton() {
    contentSkel.classList.add("hidden");
}
function showDetailHeader() {
    titleEl.classList.remove("hidden");
    dateEl.classList.remove("hidden");
}

// — Render success —
function renderSuccess(c) {
    titleEl.textContent = c.title;
    dateEl.textContent  = new Date(c.dateCreated)
        .toLocaleDateString("da-DK", {
            year:  "numeric",
            month: "long",
            day:   "numeric"
        });

    // billede
    if (c.imagePath) {
        imgEl.style.backgroundImage = `url('${c.imagePath}')`;
        imgContainer.classList.remove("hidden");
        caseDetail.classList.remove("no-image");
    } else {
        imgContainer.classList.add("hidden");
        caseDetail.classList.add("no-image");
    }

    // beskrivelse
    const detailDesc = document.querySelector("#case-detail .detail-content");
    detailDesc.innerHTML = `<p id="case-description">${c.description || ""}</p>`;
}

// — Main init med success vs error i hvid boks —
async function init() {
    showSkeleton();

    let ok   = false;
    let data = null;

    try {
        if (USE_DUMMY) {
            await new Promise(res => setTimeout(res, 1000));
            data = TEST_CASE;
        } else {
            const id = getCaseId();
            if (!id) throw new Error("Ingen case-id i URL");
            data = await loadCase(id);
            if (!data || data.error) throw new Error("Case ikke fundet");
        }
        ok = true;
    } catch (e) {
        console.error("Hentning af case mislykkedes:", e);
    }

    if (ok) {
        // Succes: fjern alle skeletons, vis detail-sektionen OG overskrift
        hideOverviewSkeleton();
        hideContentSkeleton();
        caseDetail.classList.remove("hidden");
        renderSuccess(data);
        showDetailHeader();
    } else {
        // Fejl: fjern kun overskrift-skeleton, behold content-skeleton som hvid boks
        hideOverviewSkeleton();

        // Skjul shimmer-elementerne
        contentSkel.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

        // Sæt og vis overskrift med fejl
        titleEl.textContent = "Ups — casen kunne ikke indlæses";
        dateEl.textContent  = "";
        showDetailHeader();

        // Indsæt fejlmeddelelse i den hvide boks
        descContainer.innerHTML = `
          <div class="error-message">
            <p>Der opstod en fejl ved indlæsningen af casen.</p>
            <p>Prøv at genindlæse siden</p>
          </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", init);
