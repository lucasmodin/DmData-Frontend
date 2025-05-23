document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById("show-cookie-details");
    const modal = document.getElementById("cookie-details-modal");
    const close = document.getElementById("close-cookie-modal");

    // Open modal
    link.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "block";
    });

    // Close modal on X click
    close.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});