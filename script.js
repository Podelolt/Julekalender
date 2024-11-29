// Finn HTML-elementer
const countdownElement = document.getElementById("countdown");
const hintsElement = document.getElementById("hints");
const dateSelector = document.createElement("div");
document.getElementById("countdown-container").appendChild(dateSelector);

// Intro Screen
const introScreen = document.getElementById("intro-screen");
const revealButton = document.getElementById("reveal-button");
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
        revealButton.style.display = "block";
    }, 4000); // Vent til snøen har samlet seg
}, 1000);

// Knapp for å avsløre hovedinnhold
revealButton.addEventListener("click", () => {
    introScreen.style.display = "none";
    app.style.display = "block";
});

// Liste over datoer for nedtelling
const eventDates = [
    { date: new Date("2024-12-01T18:00:00"), description: "Overraskelse 1" },
];

// Hint schedule
const hintSchedule = [
    { date: new Date("2024-11-27T00:00:00"), hint: "🧦" },
    { date: new Date("2024-11-29T00:00:00"), hint: "🩲" },
    { date: new Date("2024-12-01T15:00:00"), hint: "🎬" },
];

// Dynamisk opprettelse av datostripen
function renderDateSelector() {
    dateSelector.id = "date-selector";
    eventDates.forEach((event) => {
        const button = document.createElement("div");
        button.className = "date-square";
        button.innerHTML = `<div>${event.date.toLocaleDateString()}</div>`;
        button.addEventListener("click", () => startCountdown(event.date));
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
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            countdownElement.textContent = `${days} dager ${hours} timer ${minutes} min ${seconds} sek`;
        }
    }, 1000);
}

// Oppdater hints
function updateHints() {
    const now = new Date();
    hintsElement.innerHTML = "";
    hintSchedule.forEach((hintObj) => {
        const hintBox = document.createElement("div");
        hintBox.className = "hint-box";
        hintBox.textContent = now >= hintObj.date ? hintObj.hint : `⏳ ${hintObj.date.toLocaleDateString()}`;
        hintsElement.appendChild(hintBox);
    });
}

renderDateSelector();
updateHints();
