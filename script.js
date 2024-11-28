// Velkommen til JavaScript-delen av julekalenderen din!

// Finn HTML-elementer
const countdownElement = document.getElementById("countdown");
const hintsElement = document.getElementById("hints");
const dateSelector = document.createElement("div"); // Opprett stripe for datovalg
document.getElementById("app").appendChild(dateSelector);

// Liste over datoer for nedtelling
const eventDates = [
    { date: new Date("2024-12-03T18:00:00"), description: "Overraskelse 1" },
    // You can add more dates here
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
            countdownElement.innerHTML = "Tid for en overraskelse! 🎉";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        countdownElement.innerHTML = `${days} dager ${hours} timer ${minutes} minutter ${seconds} sekunder`;
    }, 1000);
}

// Hint-seksjon
const hints = ["🎄", "❄️", "🎁"]; // Hint for neste overraskelse
hintsElement.innerHTML = hints.join(" ");

// Aktiver datovalg
renderDateSelector();
