// index.js

document.addEventListener("DOMContentLoaded", function () {
    const counterElement = document.getElementById("visitCounter");

    if (!counterElement) {
        console.error("Counter element not found.");
        return;
    }

    // First show a loading message
    counterElement.textContent = "Loading global view count...";

    // --- Fetch server (global) visit count from Lambda ---
    fetch(
        "https://rgagltzheuob2vdx3vbti7skwu0xmjgi.lambda-url.us-east-1.on.aws/",
        {
            method: "GET",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("Backend view counter updated:", data);

            if (data.updatedAttributes && data.updatedAttributes.views) {
                const totalViews = data.updatedAttributes.views.N;
                counterElement.textContent = `This page has been visited ${totalViews} times globally.`;
            } else {
                counterElement.textContent = "Could not fetch global views.";
            }
        })
        .catch((error) => {
            console.error("Error fetching global counter:", error);
            counterElement.textContent = "Error loading counter.";
        });
});
