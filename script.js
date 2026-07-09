const weddingDate = new Date("2026-07-31T00:00:00+05:00");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    window.setTimeout(() => {
        loader?.classList.add("is-hidden");
    }, prefersReducedMotion ? 150 : 900);
});

const timerParts = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

function pad(value) {
    return String(Math.max(0, value)).padStart(2, "0");
}

function updateCountdown() {
    const distance = weddingDate.getTime() - Date.now();
    const note = document.getElementById("countdown-note");

    if (distance <= 0) {
        Object.values(timerParts).forEach((part) => {
            if (part) part.textContent = "00";
        });
        if (note) note.textContent = "The wedding celebrations have begun.";
        return;
    }

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    if (timerParts.days) timerParts.days.textContent = pad(days);
    if (timerParts.hours) timerParts.hours.textContent = pad(hours);
    if (timerParts.minutes) timerParts.minutes.textContent = pad(minutes);
    if (timerParts.seconds) timerParts.seconds.textContent = pad(seconds);
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
    revealObserver.observe(element);
});

function createPetal() {
    const petalField = document.getElementById("petal-field");
    if (!petalField) return;

    const petal = document.createElement("span");
    const duration = 8 + Math.random() * 7;
    const drift = `${Math.round((Math.random() - 0.5) * 180)}px`;

    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.transform = `rotate(${Math.random() * 180}deg)`;
    petal.style.setProperty("--petal-drift", drift);

    petalField.appendChild(petal);
    window.setTimeout(() => petal.remove(), duration * 1000);
}

function createSparkle() {
    const sparkleField = document.getElementById("sparkle-field");
    if (!sparkleField) return;

    const sparkle = document.createElement("span");
    const duration = 1500 + Math.random() * 1200;

    sparkle.className = "sparkle";
    sparkle.style.left = `${8 + Math.random() * 84}vw`;
    sparkle.style.top = `${8 + Math.random() * 76}vh`;
    sparkle.style.animationDuration = `${duration}ms`;

    sparkleField.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), duration);
}

if (!prefersReducedMotion) {
    window.setInterval(createPetal, 520);
    window.setInterval(createSparkle, 1100);
}
