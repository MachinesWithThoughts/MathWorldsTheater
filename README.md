# Math Worlds Theater

An interactive playground for exploring the beauty and complexity of mathematical structures. The app provides a curated menu of algorithms — from cellular automata to fractals to Voronoi diagrams — each rendered in dynamic, visually engaging ways.

## Vision

Math Worlds Theater is an interactive playground for exploring the beauty and complexity of mathematical structures. The app will provide a curated menu of algorithms — from cellular automata to fractals to Voronoi diagrams — each rendered in dynamic, visually engaging ways. Users will be able to adjust parameters in real time, experiment with multiple rendering styles, and discover emergent patterns.

Beyond flat Euclidean space, the app will also support alternative geometries, such as spherical mappings, offering fresh perspectives on familiar algorithms. Whether for education, research, or creative exploration, Math Worlds Theater aims to be both a laboratory and a gallery — a place where mathematics becomes an immersive, interactive experience.

## Current Status (v00.01.00)

### ✅ Completed Experiments

#### 🎨 Voronoi Diagram Explorer
**Location:** `experiments/voronoi-explorer.html`

An interactive Voronoi diagram generator featuring:
- Real-time parameter adjustment (point count, color modes)
- Multiple color schemes: rainbow, grayscale, and random
- Animation controls with speed adjustment
- Click-to-add points functionality
- Modern, responsive UI with gradient backgrounds

**Features:**
- Point count control (3-50 points)
- Color mode selection (rainbow, grayscale, random)
- Animation speed control
- Interactive point placement
- Real-time rendering

#### 🧬 Conway's Game of Life Explorer
**Location:** `experiments/game-of-life-explorer.html`

A comprehensive implementation of Conway's Game of Life featuring:
- Interactive grid with click-to-toggle cells
- Speed control for animation
- Predefined patterns: glider, pulsar, Gosper gun
- Step-by-step execution
- Real-time statistics (generation count, living cells)

**Features:**
- Play/pause controls
- Speed adjustment (1-20x)
- Pattern presets (random, glider, pulsar, Gosper gun)
- Cell size adjustment
- Generation and living cell counters
- Interactive grid editing

#### 🌿 Lindenmeyer System Explorer
**Location:** `experiments/lindenmeyer-explorer.html`

An interactive L-system fractal generator featuring:
- Multiple fractal presets: Dragon Curve, Sierpinski Triangle, Koch Snowflake, Plant Growth
- Real-time parameter adjustment (iterations, angles, length)
- Step-by-step animation showing fractal development
- Turtle graphics rendering with branching support
- Custom L-system creation capabilities

**Features:**
- Iteration control (0-8 iterations)
- Angle adjustment (5°-45°)
- Length scaling control
- Animation with step-by-step visualization
- Multiple preset systems with descriptions
- Real-time command counting

#### 🌀 Mandelbrot Set Explorer
**Location:** `experiments/mandelbrot-explorer.html`

An interactive Mandelbrot set visualizer featuring:
- Click and drag to zoom into specific regions
- Multiple color schemes: rainbow, fire, ocean, grayscale
- Adjustable iteration count for detail control
- Save high-resolution images
- Real-time coordinate display

**Features:**
- Zoom and pan capabilities
- Iteration control (50-1000 iterations)
- Color scheme selection
- Interactive region selection
- Image export functionality
- Performance-optimized rendering

## Getting Started

1. Open any of the experiment files in a modern web browser
2. No installation or dependencies required - pure HTML/CSS/JavaScript
3. Each experiment is self-contained and interactive

## File Structure

```
MathWorldsTheater/
├── experiments/
│   ├── voronoi-explorer.html         # Voronoi diagram interactive explorer
│   ├── game-of-life-explorer.html    # Conway's Game of Life simulator
│   ├── lindenmeyer-explorer.html     # L-system fractal generator
│   └── mandelbrot-explorer.html      # Mandelbrot set visualizer
├── tests/
│   └── test-report.md                # Comprehensive test results
├── prompts/
│   └── TASKS.md                      # Project tasks and implementation status
├── AGENTS.md                         # Development guidelines
└── README.md                         # This file
```

## Technical Details

- **Pure Web Technologies:** HTML5, CSS3, JavaScript (ES6+)
- **Canvas Rendering:** High-performance 2D graphics
- **Responsive Design:** Works on desktop and mobile devices
- **No Dependencies:** Self-contained applications
- **Modern UI:** Gradient backgrounds, smooth animations, intuitive controls

## Development

This project follows a structured development approach:
- Tasks are tracked in `prompts/TASKS.md`
- Implementation status is maintained with timestamps
- Each experiment is a standalone one-pager application
- Testing is performed in isolated environments

## License

This project is part of the Math Worlds Theater initiative for mathematical visualization and education.
