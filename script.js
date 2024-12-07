// Finn HTML-elementer
const countdownElement = document.getElementById("countdown");
const hintsElement = document.getElementById("hints");
const dateSelector = document.createElement("div");
document.getElementById("countdown-container").appendChild(dateSelector);

// Intro Screen
const introScreen = document.getElementById("intro-screen");
const app = document.getElementById("app");

// Snøstorm-animasjon
function createSnowstorm() {
    const snowstorm = document.getElementById("snowstorm");
    const numFlakes = 100;
    for (let i = 0; i < numFlakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
        snowflake.textContent = "❄";
        snowstorm.appendChild(snowflake);

        // Fjern snøfnugg når animasjonen er ferdig
        snowflake.addEventListener("animationend", () => {
            snowflake.remove();
        });
    }
}

// Start intro
setTimeout(() => {
    createSnowstorm();
    setTimeout(() => {
        introScreen.style.transition = "opacity 1s ease";
        introScreen.style.opacity = "0";
        setTimeout(() => {
            introScreen.style.display = "none";
            app.style.display = "block";
            document.getElementById("info-button").style.display = "block"; // Show the info button
        }, 1000); // Wait until fade-out is complete
    }, 4000); // Wait until the snow has gathered
}, 1000);

// Liste over datoer for nedtelling
const eventDates = [
    { date: new Date("2024-12-11T20:30:00"), description: "Overraskelse 1" },
];

// Check if the first event date has expired on page load
const now = new Date();
if (eventDates[0].date <= now) {
    // Hide the countdown container and show post-countdown elements
    document.getElementById("countdown-container").style.display = "none"; // Hide the countdown container
    document.getElementById("post-countdown").style.display = "block"; // Show the new elements
}

// Hint schedule
const hintSchedule = [
    { date: new Date("2024-12-03T10:00:00"), hint: "🌔" },
    { date: new Date("2024-12-04T08:30:00"), hint: "👔" },
    { date: new Date("2024-12-07T08:30:00"), hint: "🎬" },
    { date: new Date("2024-12-08T08:30:00"), hint: "🎬" },
    { date: new Date("2024-12-10T08:30:00"), hint: "🎬" },
];

// Liste over måneder på norsk
const months = [
    "Jan", "Feb", "Mar", "Apr", "Mai", "Juni",
    "Juli", "Aug", "Sep", "Okt", "Nov", "Des"
];

// Liste over ukedager på norsk
const weekdays = [
    "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"
];

// Dynamisk opprettelse av datostripen
function renderDateSelector() {
    dateSelector.id = "date-selector";

    eventDates.forEach((event) => {
        const button = document.createElement("div");
        button.className = "date-square";

        // Format the date as "weekday d m" (e.g., "Søndag 1. Des")
        const formattedDate = `${weekdays[event.date.getDay()]} ${event.date.getDate()}. ${months[event.date.getMonth()]}`;
        
        const dateText = document.createElement("div");
        dateText.className = "date-text";
        dateText.textContent = formattedDate;

        button.appendChild(dateText);
        button.addEventListener("click", () => {
            startCountdown(event.date);
            const meetMeElement = document.getElementById("meet-me-element");
            // Delay showing the element by 1 second
            setTimeout(() => {
                meetMeElement.style.display = "block"; // Show the "Møt meg om" element after 1 second
            }, 1000); // 1000 milliseconds = 1 second
        });
        dateSelector.appendChild(button);
    });
}

// Start nedtelling
function startCountdown(targetDate) {
    const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            clearInterval(interval);
            countdownElement.textContent = "Filmkveeeeld! 🎬";
            // Trigger confetti explosion
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            // Show the new elements immediately after the confetti
            document.getElementById("countdown-container").style.display = "none"; // Hide the countdown container
            document.getElementById("post-countdown").style.display = "block"; // Show the new elements
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            countdownElement.textContent = `${days} dager ${hours} timer ${minutes} min ${seconds} sek`;
        }
    }, 1000);
}

// Show modal function
function showModal() {
    document.getElementById("movie-modal").style.display = "block";
}

// Close modal function
function closeModal() {
    document.getElementById("movie-modal").style.display = "none";
}

// Lock in movie selection
document.getElementById("lock-in-button").addEventListener("click", () => {
    const selectedMovie = document.querySelector("#movie-list a:visited");
    if (selectedMovie) {
        document.getElementById("feedback").textContent = `Du har valgt: ${selectedMovie.textContent}`;
    } else {
        document.getElementById("feedback").textContent = "Vennligst velg en film før du låser inn.";
    }
});

// Start hints countdown
function startHintsCountdown(targetDate, hintElement) {
    const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            clearInterval(interval);
            hintElement.textContent = "⏳";
        } else {
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            hintElement.textContent = `${hours} timer ${minutes} min ${seconds} sek igjen`;
        }
    }, 1000);
}

// Call the function to start the hints countdown for each hint
hintSchedule.forEach((hintObj) => {
    const hintBox = document.createElement("div");
    hintBox.className = "hint-box";
    hintsElement.appendChild(hintBox);

    const hintCountdownElement = document.createElement("div");
    hintCountdownElement.className = "hint-countdown";
    hintBox.appendChild(hintCountdownElement);

    const hintTextElement = document.createElement("div");
    hintTextElement.className = "hint-text";
    hintTextElement.textContent = hintObj.hint;
    hintBox.appendChild(hintTextElement);

    startHintsCountdown(hintObj.date, hintCountdownElement);
});

// Oppdater hints
function updateHints() {
    const now = new Date();
    hintsElement.innerHTML = "";
    hintSchedule.forEach((hintObj) => {
        const hintBox = document.createElement("div");
        hintBox.className = "hint-box";

        // Calculate the time remaining until the hint date
        const timeDiff = hintObj.date - now;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Display the countdown in the hint box
        hintBox.textContent = now >= hintObj.date ? hintObj.hint : `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
        hintsElement.appendChild(hintBox);
    });
}

// Call updateHints every second to keep the countdown live
setInterval(updateHints, 1000);

renderDateSelector();
updateHints();

// Create snowflakes on the main screen
function createSnowflakes() {
    const mainScreen = document.getElementById("main-screen");

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.innerHTML = "&#10052;"; // Unicode snowflake character

        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomDelay = Math.random() * 10;
        
        snowflake.style.left = `${randomX}px`;
        snowflake.style.animationDelay = `${randomDelay}s`;

        mainScreen.appendChild(snowflake);
    }
}

// Call the function to create snowflakes after the intro screen
createSnowflakes();

// Open the folder link when the "velg film" button is clicked
document.getElementById("open-modal-button").addEventListener("click", function() {
    window.open("https://arc.net/folder/8EDDDEC7-C837-4A29-BAD2-EB77DBEA18EA", "_blank");
});

// Function to open the information modal
function openInfoModal() {
    document.getElementById("info-modal").style.display = "block"; // Show the modal
    // Remove notification badge and stop jiggle
    document.getElementById("notification-badge").style.display = "none"; // Hide the badge
    document.getElementById("info-button").classList.remove("jiggle"); // Stop jiggle
}

// Function to close the information modal
function closeInfoModal() {
    document.getElementById("info-modal").style.display = "none"; // Hide the modal
}

// Event listener for the info button
document.getElementById("info-button").addEventListener("click", openInfoModal);

// Add jiggle effect on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("info-button").classList.add("jiggle"); // Start jiggle animation
});

// script.js

// Function to open the link when the button is clicked
function openGameLink() {
    window.open("https://podelolt.github.io/solitaire-js/", "_blank");
}

// Event listener to trigger the function when the button is clicked
document.getElementById("spillknapp").addEventListener("click", openGameLink);