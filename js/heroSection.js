// Det her henter vores video element after siden er loaded
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('backgroundVideo');

    //error handling hvis video ikke hentes
    if (!video) {
        console.error("Video element not found.");
        return;
    }

    //Advanceret metode til at starte video afspilling via javaScript
    video.addEventListener('loadedmetadata', () => {
        // vi bruger currentTime some variable til at freez last frame.
        video.currentTime = 0;
        video.play();
    });


    video.addEventListener('timeupdate', () => {
        // Pauser video før den vil restarte
        if (video.duration - video.currentTime < 0.05) {
            video.pause();
            video.currentTime = video.duration; // pauser på sidste afspillings længde.
        }
    });
});