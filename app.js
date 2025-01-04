document.addEventListener("DOMContentLoaded", () => {
    const shareLocationButton = document.getElementById("share-location");
    const shareOptions = document.getElementById("share-options");
    const whatsappShare = document.getElementById("whatsapp-share");
    const smsShare = document.getElementById("sms-share");

    if (shareLocationButton) {
        shareLocationButton.addEventListener("click", () => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser.");
                return;
            }

            shareLocationButton.textContent = "Fetching Location...";

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationURL = `https://www.google.com/maps?q=${latitude},${longitude}`;

                    // Update WhatsApp and SMS share links
                    whatsappShare.href = `https://wa.me/?text=My%20location:%20${encodeURIComponent(locationURL)}`;
                    smsShare.href = `sms:?body=${encodeURIComponent(locationURL)}`;

                    // Show sharing options
                    shareOptions.style.display = "block";
                    shareLocationButton.textContent = "Share your Location";
                },
                (error) => {
                    alert("Unable to retrieve your location. Please try again.");
                    shareLocationButton.textContent = "Share your Location";
                }
            );
        });
    }
});
