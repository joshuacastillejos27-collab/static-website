// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== JS Requirement 1: Live Time Counter =====
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // hour 0 should be 12
  const hoursStr = String(hours).padStart(2, '0');

  document.getElementById('live-clock').textContent =
    `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);

// ===== JS Requirement 2: Countdown Timer =====
// Countdown target: next New Year's Day
function getNextNewYear() {
  const now = new Date();
  const year = now.getMonth() === 0 && now.getDate() === 1 ? now.getFullYear() : now.getFullYear() + 1;
  return new Date(year, 0, 1, 0, 0, 0);
}

const countdownTarget = getNextNewYear();

function updateCountdown() {
  const now = new Date();
  let diff = countdownTarget - now;

  const countdownEl = document.getElementById('countdown');

  if (diff <= 0) {
    countdownEl.textContent = 'It\'s here! Happy travels!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  countdownEl.textContent =
    `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== JS Requirement 3: Interactive Button (random travel quote) =====
const travelQuotes = [
  "The world is a book, and those who do not travel read only one page.",
  "Travel far enough, you meet yourself.",
  "Not all those who wander are lost.",
  "Once a year, go somewhere you've never been before.",
  "Take only memories, leave only footprints.",
  "A journey of a thousand miles begins with a single step.",
  "Travel makes one modest. You see what a tiny place you occupy in the world."
];

const quoteBtn = document.getElementById('quote-btn');
const quoteOutput = document.getElementById('quote-output');

quoteBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * travelQuotes.length);
  quoteOutput.textContent = travelQuotes[randomIndex];
});

// ===== Extra feature: Dark / Light mode toggle =====
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});
