// Velkommen til JavaScript-delen av julekalenderen din!

// Finn HTML-elementer
const countdownElement = document.getElementById("countdown");
const hintsElement = document.getElementById("hints");
const dateSelector = document.createElement("div"); // Opprett stripe for datovalg
document.getElementById("countdown-container").appendChild(dateSelector);

// Liste over datoer for nedtelling
const eventDates = [
    { date: new Date("2024-12-01T18:00:00"), description: "Overraskelse 1" },
    // You can add more dates here
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
    dateSelector.style.display = "flex";
    dateSelector.style.justifyContent = "center";
    dateSelector.style.flexWrap = "wrap";
    dateSelector.style.gap = "10px";
    dateSelector.style.margin = "20px 0";

    if (eventDates.length === 0) {
        countdownElement.innerHTML = "Ingen datoer tilgjengelig.";
        return;
    }

    eventDates.forEach((event, index) => {
        const button = document.createElement("div");
        const date = event.date.toLocaleDateString();
        const time = event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        button.innerHTML = `<div class="date">${date}</div><div class="time">${time}</div>`;
        button.className = "date-square";

        // Legg til klikking for å starte nedtelling for valgt dato
        button.addEventListener("click", () => {
            startCountdown(event.date);
        });

        dateSelector.appendChild(button);
    });
}

// Start nedtelling
function startCountdown(targetDate) {
    const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Filmkveeeeeeld!🎬 (med noen små overraskelser...)";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        countdownElement.innerHTML = `${days} dager ${hours} timer ${minutes} minutter ${seconds} sekunder`;
    }, 1000);
}

// Update hints based on schedule
function updateHints() {
    const now = new Date();
    hintsElement.innerHTML = ''; // Clear existing hints
    hintSchedule.forEach(hintObj => {
        const hintBox = document.createElement('div');
        hintBox.className = 'hint-box';
        if (now >= hintObj.date) {
            hintBox.textContent = hintObj.hint;
        } else {
            hintBox.textContent = `⏳ ${hintObj.date.toLocaleDateString()}`;
        }
        hintsElement.appendChild(hintBox);
    });
}

// Show main content after intro
function showMainContent() {
    const introScreen = document.getElementById('intro-screen');
    const appContent = document.getElementById('app');
    introScreen.addEventListener('animationend', () => {
        introScreen.style.display = 'none';
        appContent.classList.remove('hidden');
    });
}

// Aktiver datovalg
renderDateSelector();
updateHints();
showMainContent();
