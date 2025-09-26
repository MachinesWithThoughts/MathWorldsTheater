# Math Worlds Theater Explorers

Interactive one-pager apps for exploring mathematical systems.

## Structure

- `apps/` – standalone explorers (open each `index.html` in a modern browser)
- `shared/` – base styling and UI helpers reused across explorers
- `tests/` – smoke tests and verification scripts

## Explorers

### Voronoi Diagram Explorer
- Drag sites to update Voronoi tessellations live
- Regenerate randomized site sets and adjust site count

### Game of Life Explorer
- Toggle cells directly on the grid, then play/pause or step generations
- Seed classic patterns (glider) or random boards; tune simulation speed

### Lindenmayer System Explorer
- Edit the axiom and production rules via text areas with instant redraws
- Control angle, iterations, segment length, and load presets (Koch, Dragon, Plant)

### Mandelbrot Set Explorer
- Zoom using drag-to-select bounding boxes; scroll to zoom at pointer
- Update max iterations and monitor center/scale status badge

## Development Notes

The explorers rely on the shared layout and a `ResizeObserver` helper to keep canvases sized correctly. No build step is required—open the HTML files directly or serve the `apps/` directory via a simple static server.

