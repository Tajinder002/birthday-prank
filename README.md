# Birthday Prank Website 🎂💀

A fake birthday greeting page that builds excitement with confetti and a gift button, runs a 1-minute countdown, then reveals a big "FUCK YOU" message as the punchline.

## How it works

1. **Birthday screen** — Confetti falls over a glowing "Happy Birthday!" heading with an "Open Your Gift 🎁" button.
2. **Countdown screen** — Clicking the button starts a 60-second timer ("your surprise is loading...").
3. **Prank screen** — When the timer hits zero, the background goes black and a giant shaking "FUCK YOU 💀" appears, followed by a cheeky sign-off.

Pure static HTML/CSS/JS — no build step, no dependencies.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
```

then visit [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Deploy

Host on GitHub Pages, Netlify, Vercel, or any static host — point it at this folder and you're done.

## Customizing

Change the countdown length in `script.js`:

```js
const COUNTDOWN_SECONDS = 60; // e.g. 10 for a quicker prank
```

The reveal text lives in `index.html` under `#prank-screen`.