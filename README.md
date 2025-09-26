# Math Worlds Theater Launchpad

Central hub for exploring interactive mathematical visualizations produced by multiple generative workflows.

## Overview

- `index.html` – unified launcher linking to all available explorers
- `auto/` – early auto-generated experiments (open the HTML files directly)
- `gpt5codex/` – refined experiences sharing common UI elements
- `prompts/TASKS.md` – coordination notes and task tracking
- `tests/` – validation notes and scripts scoped to the launcher

Open `index.html` in a modern browser to browse and launch any explorer. Each linked experience is self-contained and requires no build step.

## Adding A New Explorer

1. Place the new experience inside either `auto/` or `gpt5codex/apps/`.
2. Reference the HTML entry point in `index.html` with a brief description.
3. Document usage or special setup in the corresponding sub-`README.md`.
4. Extend the test plan under `tests/` with steps for the new entry.

## Validation

- `tests/launchpad-smoke.md` – manual checklist for verifying launcher integrity, link health, and visual regressions.

