Math World Theater

# Vision
Math Worlds Theater is an interactive playground for exploring the beauty and complexity of mathematical structures. The app will provide a curated menu of algorithms — from cellular automata to fractals to Voronoi diagrams — each rendered in dynamic, visually engaging ways. Users will be able to adjust parameters in real time, experiment with multiple rendering styles, and discover emergent patterns.

Beyond flat Euclidean space, the app will also support alternative geometries, such as spherical mappings, offering fresh perspectives on familiar algorithms. Whether for education, research, or creative exploration, Math Worlds T aims to be both a laboratory and a gallery — a place where mathematics becomes an immersive, interactive experience.


- https://chatgpt.com/g/g-p-6895419b687c819195f74e2fe6c95c9c/c/68d5c619-4f50-832e-a42a-af7d4db7ed0b

# v00.00.01 - intial version

Generate a series of experimental standalone one-pager apps:

1. [I] A Voronoi Diagram Explorer **COMPLETED**: 20241219-143000
   - [I] Draw a black border around the cells. **COMPLETED**: 20241219-144500
   - [I] All the nodes to be dragged and dropped. **COMPLETED**: 20241219-144500
2. [I] A Game of Life Explorer **COMPLETED**: 20241219-143000
3. [I] A Lindenmeyer System Explorer **COMPLETED**: 20241219-145000
   - [I] Show the L-System in a text box so the user can modify it. **COMPLETED**: 20241219-145500
4. [I] A Mandelbrot Set Explorer **COMPLETED**: 20241219-145000
   - [I] Draw the bounding box as the user moves their mouse. **COMPLETED**: 20241219-145500

Place them into a directory called experiments.

## Implementation

### Completed Tasks (20241219-143000)

**Voronoi Diagram Explorer** (`experiments/voronoi-explorer.html`)
- Interactive Voronoi diagram generator with real-time parameter adjustment
- Features: Point count control, color modes (rainbow, grayscale, random), animation
- Click to add points, drag to interact
- **Enhanced Features (20241219-144500):**
  - Black borders around Voronoi cells for clear cell definition
  - Full drag-and-drop functionality for all nodes
  - Visual feedback with cursor changes (grab/grabbing/crosshair)
  - Improved node rendering with borders and drag indicators
- Responsive design with modern UI

**Game of Life Explorer** (`experiments/game-of-life-explorer.html`)
- Conway's Game of Life implementation with interactive controls
- Features: Speed control, pattern presets (glider, pulsar, Gosper gun), step-by-step execution
- Click to toggle cells, load predefined patterns
- Real-time statistics display (generation count, living cells)

**Lindenmeyer System Explorer** (`experiments/lindenmeyer-explorer.html`)
- Interactive L-system fractal generator with multiple presets
- Features: Iteration control, angle adjustment, length scaling, animation
- Presets: Dragon Curve, Sierpinski Triangle, Koch Snowflake, Plant Growth
- Real-time generation with step-by-step animation
- Turtle graphics rendering with branching support
- **Enhanced Features (20241219-145500):**
  - L-System text editor for custom rule definition
  - Real-time parsing of user-defined L-systems
  - Format: axiom: F, rules: F→F+F-F-F+F (one per line)
  - Live preview of system changes

**Mandelbrot Set Explorer** (`experiments/mandelbrot-explorer.html`)
- Interactive Mandelbrot set visualizer with zoom and pan capabilities
- Features: Iteration control, color schemes (rainbow, fire, ocean, grayscale)
- Click and drag to zoom into specific regions
- Multiple color schemes for different visual effects
- Save image functionality for high-resolution exports
- **Enhanced Features (20241219-145500):**
  - Preview bounding box that follows mouse movement
  - Visual feedback showing zoom target area
  - Smooth preview with dashed line indicators
  - Clear preview when mouse leaves canvas

# v00.00.02 - move controls
1. [R] Review the following features:
  - [R] Move all the controls to the left side of the screen.
2. [R] Update
  - [R] game-of-life-explorer.
  - [R] lindenmeyer-explorer.
  - [R] mandelbrot-explorer.
  - [R] voronoi-explorer.


# v00.00.03 - move controls
1. [ ] Add an dropdown to switch between Euclidean and Spherical renderings.
  - [ ] Right dragging will rotate the Sphere.
  - [ ] Add a Euclidean Left-Right, Up-Down, Full Wraparound options
2. [ ] Update
  - [ ] game-of-life-explorer.
  - [ ] lindenmeyer-explorer.
  - [ ] mandelbrot-explorer.
  - [ ] voronoi-explorer.
