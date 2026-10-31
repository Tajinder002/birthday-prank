const STORAGE_KEY = 'birthdayPrankState';

// Each level: longer countdown, meaner reveal.
const LEVELS = [
  { countdown: 60,  reveal: 'FUCK YOU 💀',                 signoff: 'Just kidding... maybe. 😈' },
  { countdown: 90,  reveal: 'SCREW YOU 😈',                 signoff: 'Getting warmer...' },
  { countdown: 120, reveal: 'DIE IN A FIRE 🔥',             signoff: 'You really thought this was a gift?' },
  { countdown: 150, reveal: 'GO TO HELL 👿',                signoff: 'Level up, loser.' },
  { countdown: 180, reveal: 'I HOPE YOU DROWN 🌊',          signoff: 'Your birthday, my rules.' },
  { countdown: 210, reveal: 'SUFFER ETERNALLY ☠️',          signoff: 'No refunds.' },
  { countdown: 240, reveal: 'THE VOID AWAITS ⚫',            signoff: 'You will never escape.' },
  { countdown: 270, reveal: 'YOUR SOUL IS MINE 😈',         signoff: 'Happy birthday. Now suffer.' },
];

const MAX_LEVEL = LEVELS.length;

const birthdayScreen = document.getElementById('birthday-screen');
const countdownScreen = document.getElementById('countdown-screen');
const prankScreen = document.getElementById('prank-screen');
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const levelBadge = document.getElementById('level-badge');
const levelName = document.getElementById('level-name');
const levelProgress = document.getElementById('level-progress');

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.level === 'number' && parsed.level >= 1) {
        return { level: Math.min(parsed.level, MAX_LEVEL), pranks: parsed.pranks || 0 };
      }
    }
  } catch (e) { /* ignore corrupt storage */ }
  return { level: 1, pranks: 0 };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function levelConfig(level) {
  return LEVELS[Math.min(level - 1, MAX_LEVEL - 1)];
}

function renderLevel() {
  const cfg = levelConfig(state.level);
  levelBadge.textContent = `LVL ${state.level}`;
  levelName.textContent = state.level >= MAX_LEVEL ? 'MAX MISERY' : `Level ${state.level}`;
  const pct = state.level >= MAX_LEVEL ? 100 : Math.round((state.level / MAX_LEVEL) * 100);
  levelProgress.style.width = pct + '%';
}

spawnConfetti();

startBtn.addEventListener('click', () => {
  birthdayScreen.classList.add('hidden');
  countdownScreen.classList.remove('hidden');
  runCountdown(levelConfig(state.level).countdown);
});

function runCountdown(total) {
  let remaining = total;
  render(remaining);

  const interval = setInterval(() => {
    remaining -= 1;
    render(remaining);
    if (remaining <= 0) {
      clearInterval(interval);
      showPrank();
    }
  }, 1000);
}

function render(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
}

function showPrank() {
  const cfg = levelConfig(state.level);
  countdownScreen.classList.add('hidden');
  prankScreen.classList.remove('hidden');
  document.getElementById('reveal-text').textContent = cfg.reveal;
  document.getElementById('reveal-signoff').textContent = cfg.signoff;
  document.body.style.background = '#000';

  // Advance to the next level.
  state.level = Math.min(state.level + 1, MAX_LEVEL);
  state.pranks += 1;
  saveState();
  renderLevel();
}

function spawnConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#ff2d55', '#ffd700', '#4cd964', '#5ac8fa', '#af52de', '#ff9500'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 3 + Math.random() * 4 + 's';
    piece.style.animationDelay = Math.random() * 5 + 's';
    piece.style.opacity = 0.6 + Math.random() * 0.4;
    container.appendChild(piece);
  }
}

// Initial paint.
renderLevel();