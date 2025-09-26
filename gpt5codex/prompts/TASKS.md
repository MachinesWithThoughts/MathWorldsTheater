Math World Theater

# Vision
Math Worlds Theater is an interactive playground for exploring the beauty and complexity of mathematical structures. The app will provide a curated menu of algorithms — from cellular automata to fractals to Voronoi diagrams — each rendered in dynamic, visually engaging ways. Users will be able to adjust parameters in real time, experiment with multiple rendering styles, and discover emergent patterns.

Beyond flat Euclidean space, the app will also support alternative geometries, such as spherical mappings, offering fresh perspectives on familiar algorithms. Whether for education, research, or creative exploration, Math Worlds T aims to be both a laboratory and a gallery — a place where mathematics becomes an immersive, interactive experience.


- https://chatgpt.com/g/g-p-6895419b687c819195f74e2fe6c95c9c/c/68d5c619-4f50-832e-a42a-af7d4db7ed0b

# v00.00.01 - intial version

Generate a series of experimental standalone one-pager apps:

1. [I] A Voronoi Diagram Explorer (**COMPLETED**: 20250926-120500)
   - [I] Draw a black border around the cells. (**COMPLETED**: 20250926-120500)
   - [I] All the nodes to be dragged and dropped. (**COMPLETED**: 20250926-120500)
2. [I] A Game of Life Explorer (**COMPLETED**: 20250926-120500)
3. [I] A Lindenmeyer System Explorer (**COMPLETED**: 20250926-120500)
   - [I] Show the L-System in a text box so the user can modify it. (**COMPLETED**: 20250926-120500)
4. [I] A Mandelbrot Set Explorer (**COMPLETED**: 20250926-120500)
   - [I] Draw the bounding box as the user moves their mouse. (**COMPLETED**: 20250926-120500)


# v00.00.02 - move controls
1. [ ] Review the following features:
  - [ ] Move all the controls to the left side of the screen.
2. [ ] Update
  - [ ] game-of-life-explorer.
  - [ ] lindenmeyer-explorer.
  - [ ] mandelbrot-explorer.
  - [ ] voronoi-explorer.


# v00.00.03 - Advanced Rendering Features
1. [ ] Add an dropdown to switch between Euclidean and Spherical renderings.
  - [ ] Right dragging will rotate the Sphere.
  - [ ] Add a Euclidean Left-Right, Up-Down, Full Wraparound options
2. [ ] Update
  - [ ] game-of-life-explorer.
  - [ ] lindenmeyer-explorer.
  - [ ] mandelbrot-explorer.
  - [ ] voronoi-explorer.

## implementation

- Create a shared scaffolding for explorer one-pagers: routing stub, build script, base layout, and reusable control panel styling.
- Implement Voronoi Diagram Explorer: render Voronoi cells with stroke styling, enable drag-and-drop for sites, and re-render on drag interactions.
- Implement Game of Life Explorer: interactive grid with play/pause/step controls, pattern seeding, and layout accommodating future control relocation.
- Implement Lindenmeyer System Explorer: real-time L-system renderer with editable grammar textarea and preview updates on change.
- Implement Mandelbrot Set Explorer: canvas renderer with zoom/pan and live bounding-box overlay during mouse drag.
- Document features and usage in `README.md`, execute smoke tests in `tests/`, and update task statuses with completion timestamps.
