document.addEventListener("DOMContentLoaded", script)

// loadComponent er en function til at hente et bestemt HTML element efter elemtentet er blevet stylet
function script() {
    loadComponent("headerANDfooter/header.html", "header-container", function () {

        loadNavLogic(); // denne function skal loades efter html filen er hentet
    });


    loadComponent("headerANDfooter/footer.html", "footer-container", function () {

    });
}

function loadComponent(url, containerID, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerID).innerHTML = data;

            // Kald callback efter DOM-opdatering er fuldt færdig
            if (callback) {
                // Sørg for at DOM'en er opdateret før vi tilføjer event listeners
                requestAnimationFrame(() => callback());
            }
        })
        .catch(error => console.log("error in loading " + url));
}


//Id i denne function er baseret på html siden header.html
function loadNavLogic() {
    const serviceLink = document.getElementById('ydelser');
    const casesLink = document.getElementById('cases');
    const indexLink = document.getElementById('logo');
    const aboutLink = document.getElementById('omos');
    const contactLink = document.getElementById('kontakt');


    // Hamburger logic - toggle navigation menu
    const hamburgerIcon = document.getElementById('hamburger-icon');  // Identificer hamburger-ikonet
    const navList = document.querySelector('.nav-list');  // Identificer nav-list

    // Tjek for mobilvisning, så vi kun tilføjer event listener til hamburger-ikonet på mobil
    if (hamburgerIcon && navList) {
        hamburgerIcon.addEventListener('click', function () {
            navList.classList.toggle('show');
        });
    }




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
    // Sticky Header logikken skal hænger sammen med navigations logikken
    // Sticky header skal loades senere efter selve headeren for at bevare navigering
    const stickyHeader = document.getElementById("sticky-header"); // div i header.html
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (!stickyHeader) return; //hvis den sticky header IKKE skal loades

        const currentScrollY = window.scrollY;

        // når man scroller ned
        if (currentScrollY > lastScrollY) {
            stickyHeader.classList.remove("static"); //static er en css klasse til toppen af sticky header
            stickyHeader.classList.add("sticky"); //css styling klasse
        } else {
            // scroller op eller nær toppen af siden
            if (currentScrollY <= 30) {
                stickyHeader.classList.remove("sticky");
                stickyHeader.classList.add("static");
            }
        }

        lastScrollY = currentScrollY;
    });

}
