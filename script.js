document.getElementById('year').textContent = new Date().getFullYear();

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, '0');

  document.getElementById('live-clock').textContent =
    `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);

function getNextNewYear() {
  const now = new Date();
  const year = now.getMonth() === 0 && now.getDate() === 1 ? now.getFullYear() : now.getFullYear() + 1;
  return new Date(year, 0, 1, 0, 0, 0);
}

const countdownTarget = getNextNewYear();
const countdownEl = document.getElementById('countdown');
const miniCountdownEl = document.getElementById('mini-countdown');

function updateCountdown() {
  const now = new Date();
  let diff = countdownTarget - now;

  if (diff <= 0) {
    countdownEl.textContent = "It's here! Happy travels!";
    miniCountdownEl.textContent = '0d';
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

  miniCountdownEl.textContent = `${days}d ${String(hours).padStart(2, '0')}h`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

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

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

const header = document.getElementById('site-header');
const topbarHeight = 34;
let lastScrollY = window.scrollY;
let headerLocked = false;
let lockTimeout = null;

function handleHeaderScroll() {
  const currentScrollY = window.scrollY;

  if (headerLocked) {
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= topbarHeight + 40) {
    header.classList.remove('header-hidden');
  } else if (currentScrollY > lastScrollY) {
    header.classList.add('header-hidden');
  } else if (currentScrollY < lastScrollY) {
    header.classList.remove('header-hidden');
  }

  lastScrollY = currentScrollY;
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    headerLocked = true;
    header.classList.remove('header-hidden');

    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      headerLocked = false;
      lastScrollY = window.scrollY;
    }, 900);
  });
});

const sections = document.querySelectorAll('main section[id], .hero[id]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
});

sections.forEach(section => spyObserver.observe(section));

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

function onScroll() {
  updatePlanePosition();
  handleHeaderScroll();
}

updatePlanePosition();
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', updatePlanePosition);
