# Launchpad Smoke Checklist

Run this checklist whenever the root `index.html` launcher changes.

## Environment

- [ ] Serve repo locally (e.g., `python -m http.server`) and load `index.html` in the latest Chrome/Firefox.

## Visual Scan

- [ ] Header and footer render with gradient background and legible typography.
- [ ] Auto model cards display four entries with correct titles and descriptions.
- [ ] GPT-5 Codex cards display four entries with correct titles and descriptions.

## Link Verification

- [ ] `auto/experiments/voronoi-explorer.html` opens and interaction works.
- [ ] `auto/experiments/game-of-life-explorer.html` opens and interaction works.
- [ ] `auto/experiments/lindenmeyer-explorer.html` opens and interaction works.
- [ ] `auto/experiments/mandelbrot-explorer.html` opens and interaction works.
- [ ] `gpt5codex/apps/voronoi/index.html` opens and interaction works.
- [ ] `gpt5codex/apps/game-of-life/index.html` opens and interaction works.
- [ ] `gpt5codex/apps/lindenmeyer/index.html` opens and interaction works.
- [ ] `gpt5codex/apps/mandelbrot/index.html` opens and interaction works.

## Accessibility

- [ ] Sections include headings with proper `aria-labelledby` references.
- [ ] Card links are keyboard reachable and focus styles visible.
- [ ] Page passes automated HTML validation (e.g., https://validator.w3.org/nu/).

## Notes

- Document any issues encountered and follow up with fixes before marking the task as complete.

