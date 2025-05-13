document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const denyBtn = document.getElementById('deny-cookies');

    if (!localStorage.getItem('cookieConsent')) {
        banner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
        // initialize non-essential cookies here (e.g., Google Analytics)
    });

    denyBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'denied');
        banner.style.display = 'none';
        // don't run any non-essential cookies
    });
});
