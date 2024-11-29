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
        }, 1000); // Vent til fade-out er ferdig
    }, 4000); // Vent til snøen har samlet seg
}, 1000);

// Liste over datoer for nedtelling
const eventDates = [
    { date: new Date("2024-12-01T18:00:00"), description: "Overraskelse 1" },
];

// Hint schedule
const hintSchedule = [
    { date: new Date("2024-11-27T00:00:00"), hint: "🧦" },
    { date: new Date("2024-11-30T08:00:00"), hint: "🩲" },
    { date: new Date("2024-12-01T15:00:00"), hint: "🎬" },
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

        // Format the date as "weekday d m" (e.g., "Søndag 1 Des")
        const formattedDate = `${weekdays[event.date.getDay()]} ${event.date.getDate()}. ${months[event.date.getMonth()]}`;
        
        const dateText = document.createElement("div");
        dateText.className = "date-text";
        dateText.textContent = formattedDate;

        button.appendChild(dateText);
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

