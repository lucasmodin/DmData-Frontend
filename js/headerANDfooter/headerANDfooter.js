document.addEventListener("DOMContentLoaded", script)

// loadComponent er en function til at hente et bestemt HTML element efter elemtentet er blevet stylet
function script() {
    loadComponent("headerANDfooter/header.html", "header-container", function () {
        loadNavLogic(); // denne function skal loades efter html filen er hentet
    });

    loadComponent("headerANDfooter/footer.html", "footer-container", function () {

    });
}

function loadComponent(url, containerID, callback){
    fetch(url)
        .then(response => response.text())
        .then(data =>{document.getElementById(containerID).innerHTML = data;
        if (callback){
            callback();
        }
        })
        .catch(error => console.log("error in loading" + url))
}

//Id i denne function er baseret på html siden header.html
function loadNavLogic() {
    const serviceLink = document.getElementById('ydelser');
    const casesLink = document.getElementById('cases');
    const indexLink = document.getElementById('logo');
    const aboutLink = document.getElementById('omos');
    const contactLink = document.getElementById('kontakt');

    if (serviceLink) {
        serviceLink.addEventListener('click', function(event) {
            event.preventDefault(); // gør det muligt at selv programmere sidens adfærd
            window.location.href = "#services"; //hardcoded fil navn til navigation
        });
    }

    if (casesLink) {
        casesLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "cases.html";
        });
    }

    if (indexLink) {
        indexLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "index.html";

        });
    }

    if (aboutLink) {
        aboutLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "about.html";
        });
    }

    if (contactLink) {
        contactLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "#contact";
        });
    }
}

