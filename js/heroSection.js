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

const video1 = document.getElementById("backgroundVideo1");
const video2 = document.getElementById("backgroundVideo2");

video1.addEventListener('ended', () => {
    video1.style.display = "none";
    video2.style.display = "block";
    video2.currentTime = 0;
    video2.play();
});

video2.addEventListener('ended', () => {
    video2.style.display = "none";
    video1.style.display = "block";
    video1.currentTime = 0;
    video1.play();
});