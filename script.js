const COUNTDOWN_SECONDS = 60;

const birthdayScreen = document.getElementById('birthday-screen');
const countdownScreen = document.getElementById('countdown-screen');
const prankScreen = document.getElementById('prank-screen');
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');

spawnConfetti();

startBtn.addEventListener('click', () => {
  birthdayScreen.classList.add('hidden');
  countdownScreen.classList.remove('hidden');
  runCountdown(COUNTDOWN_SECONDS);
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
  countdownScreen.classList.add('hidden');
  prankScreen.classList.remove('hidden');
  document.body.style.background = '#000';
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