# Math Worlds Theater Explorers

Interactive one-pager apps for exploring mathematical systems.

## Structure

- `apps/` – standalone explorers (open each `index.html` in a modern browser) plus a hub landing page (`apps/index.html`)
- `shared/` – base styling, UI helpers, and the rendering controller used across explorers
- `tests/` – smoke tests and verification scripts

## Explorers

### Voronoi Diagram Explorer
- Drag sites to update Voronoi tessellations live
- Regenerate randomized site sets and adjust site count
- Switch between Euclidean and spherical renderings; toggle wraparound behaviour and reset sphere rotation

### Game of Life Explorer
- Toggle cells directly on the grid, then play/pause or step generations
- Seed classic patterns (glider) or random boards right beneath the Simulation controls; tune simulation speed
- Choose Euclidean vs spherical rendering with per-axis wrap modes and rotation controls
- Blend optional Voronoi (live cells, colored or mono) or Delaunay overlays derived from active cells for hybrid visualizations
- View Delaunay overlays as cell-centre line meshes with gradients that reflect neighbouring cell ages
- Switch overlay colour themes (Age, Rainbow, Reverse-Rainbow) to explore alternate palettes for live-cell Voronoi and Delaunay views
- Switch the Simulation "Click Mode" between `Toggle Cell` and `Explore Cells` to edit or inspect history with a single click
- Load `.rle` or `.cells` pattern files from the Seeds panel; hover to preview the placement in green, see truncation warnings, and click to stamp multiple times or press Esc to cancel the preview
- Paste pattern definitions directly into the Seeds panel: review parsed metadata, inspect a live mini-preview (with truncation indicators), then add the pattern to the board while retaining the interactive placement workflow

### Lindenmayer System Explorer
- Edit the axiom and production rules via text areas with instant redraws
- Control angle, iterations, segment length, and load presets (Koch, Dragon, Plant)
- Render paths on a plane or sphere, with wrap options for Euclidean mode

### Mandelbrot Set Explorer
- Zoom using drag-to-select bounding boxes; scroll to zoom at pointer
- Update max iterations and monitor center/scale status badge
- View the set projected onto a sphere or flat plane, with configurable wraparound

## Development Notes

Explorers share layout, styling, and an interactive rendering controller that normalises canvas sizing, supports Euclidean/spherical projections, and exposes consistent controls for wrap modes and sphere rotation. No build step is required—open the HTML files directly or serve the `apps/` directory via a simple static server.

