// js/case-detail.js

import { loadCase } from "./case-detail-api.js";

// Dummy‐data til demo
const USE_DUMMY = true;
const TEST_CASE = {
    id: "demo",
    title: "Demo Case: Rød Tråd",
    dateCreated: "2025-05-11T15:30:00",
    imagePath: "https://placehold.co/800x450/2C8ED6/ffffff?text=Demo+Image",
    description: `
    Dette er en dummy‐beskrivelse, som viser layoutet på den endelige side.
    Her kan du se, hvordan teksten og billedet vil fremstå, når dataen er indlæst.
  `.trim()
};
const imgSkeleton = document.querySelector(".image-skeleton");
const skeleton = document.getElementById("skeleton");
const detail   = document.getElementById("case-detail");
const backBtn  = document.getElementById("back-button");
const titleEl  = document.getElementById("case-title");
const dateEl   = document.getElementById("case-date");
const imgEl    = document.getElementById("case-image");
const descEl   = document.getElementById("case-description");

backBtn.addEventListener("click", () => window.history.back());

function getCaseId() {
    return new URLSearchParams(window.location.search).get("id");
}

async function init() {
    // Vis skeleton, skjul indhold
    skeleton.classList.remove("hidden");
    detail.classList.add("hidden");

    let c;
    if (USE_DUMMY) {
        // Simuler loading
        await new Promise(r => setTimeout(r, 1000));
        c = TEST_CASE;
    } else {
        const id = getCaseId();
        if (!id) {
            titleEl.textContent = "Case ikke fundet";
            skeleton.classList.add("hidden");
            return;
        }
        c = await loadCase(id);
        if (!c) {
            titleEl.textContent = "Kunne ikke indlæse case";
            skeleton.classList.add("hidden");
            return;
        }
    }

    // Udfyld felter med data
    titleEl.textContent = c.title;
    dateEl.textContent  = new Date(c.dateCreated)
        .toLocaleDateString("da-DK", {
            year: "numeric", month: "long", day: "numeric"
        });

    if (c.imagePath) {
        imgEl.style.backgroundImage = `url('${c.imagePath}')`;
        imgEl.parentElement.classList.remove("hidden");    // vis div.detail-image
        imgSkeleton.classList.remove("hidden");            // vis skeleton-billedet
        detail.classList.remove("no-image");               // fjern no-image-klasse
        skeleton.classList.remove("no-image");
    } else {
        imgEl.parentElement.classList.add("hidden");       // gem div.detail-image
        imgSkeleton.classList.add("hidden");               // gem skeleton-billedet
        detail.classList.add("no-image");                  // tilføj .no-image for ekstra padding-just
        skeleton.classList.add("no-image");
    }

    descEl.textContent = c.description;

    // Skjul skeleton, vis indhold
    skeleton.classList.add("hidden");
    detail.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", init);
