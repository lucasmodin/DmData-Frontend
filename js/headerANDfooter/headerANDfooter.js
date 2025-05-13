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
            window.location.href = "case.html"; //hardcoded fil navn til navigation
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
            window.location.href = "contact.html";
        });
    }
    // 🔥 Sticky Header Logic – deferred to ensure DOM is ready
    requestAnimationFrame(() => {
        const stickyHeader = document.getElementById("sticky-header");
        if (!stickyHeader) {
            console.warn("Sticky header not found in DOM yet.");
            return;
        }

        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            const scrollingUp = currentScrollY < lastScrollY;
            const nearTop = currentScrollY <= 30;

            if (scrollingUp && !nearTop) {
                stickyHeader.classList.add("visible");
                stickyHeader.classList.remove("large");
                stickyHeader.classList.add("small");
            } else if (nearTop) {
                stickyHeader.classList.remove("visible");
                stickyHeader.classList.remove("small");
                stickyHeader.classList.add("large");
            }

            lastScrollY = currentScrollY;
        });
    });

}

