Math World Theater

# Vision
Math Worlds Theater is an interactive playground for exploring the beauty and complexity of mathematical structures. The app will provide a curated menu of algorithms — from cellular automata to fractals to Voronoi diagrams — each rendered in dynamic, visually engaging ways. Users will be able to adjust parameters in real time, experiment with multiple rendering styles, and discover emergent patterns.

Beyond flat Euclidean space, the app will also support alternative geometries, such as spherical mappings, offering fresh perspectives on familiar algorithms. Whether for education, research, or creative exploration, Math Worlds T aims to be both a laboratory and a gallery — a place where mathematics becomes an immersive, interactive experience.


- https://chatgpt.com/g/g-p-6895419b687c819195f74e2fe6c95c9c/c/68d5c619-4f50-832e-a42a-af7d4db7ed0b

# Requirements

## v00.00.01 - intial version

Generate a series of experimental standalone one-pager apps:

1. [I] A Voronoi Diagram Explorer (**COMPLETED**: 20250926-120500)
   - [I] Draw a black border around the cells. (**COMPLETED**: 20250926-120500)
   - [I] All the nodes to be dragged and dropped. (**COMPLETED**: 20250926-120500)
2. [I] A Game of Life Explorer (**COMPLETED**: 20250926-120500)
3. [I] A Lindenmeyer System Explorer (**COMPLETED**: 20250926-120500)
   - [I] Show the L-System in a text box so the user can modify it. (**COMPLETED**: 20250926-120500)
4. [I] A Mandelbrot Set Explorer (**COMPLETED**: 20250926-120500)
   - [I] Draw the bounding box as the user moves their mouse. (**COMPLETED**: 20250926-120500)


## v00.00.02 - Advanced Rendering Features
1. [I] Add an dropdown to switch between Euclidean and Spherical renderings. (**COMPLETED**: 20250926-153000)
  - [I] Right dragging will rotate the Sphere. (**COMPLETED**: 20250926-153000)
  - [I] Add a Euclidean Left-Right, Up-Down, Full Wraparound options (**COMPLETED**: 20250926-153000)
2. [I] Update
  - [I] game-of-life-explorer. (**COMPLETED**: 20250926-153000)
  - [I] lindenmeyer-explorer. (**COMPLETED**: 20250926-153000)
  - [I] mandelbrot-explorer. (**COMPLETED**: 20250926-153000)
  - [I] voronoi-explorer. (**COMPLETED**: 20250926-153000)

## v00.00.03 - combine the worlds.

1. [I] Add Voronoi + Delauney triagle options to the game-of-life-explorer (**COMPLETED**: 20250926-170800)
  - [I] Each cell is its own voronoi node (**COMPLETED**: 20250926-174500)

## v00.00.04 - abstraction 1
1. [I] Add the following to the game-of-life
  - [I] Show the game-of-life rule matrix in the configuration panel.
  - [I] Allow users to modify the rules.
  - [I] Add a reset to default.
  - [I] Generate a one-line definition of the rules to allow the user to copy them for later use. (**COMPLETED**: 20250926-182200)

## v00.00.05 - refine UI
1. [I] Add feature to increase/decrease the pixel size of each cell. (**COMPLETED**: 20250927-160500)
1. [I] All each configuration section to be expanded/collapsed. (**COMPLETED**: 20250927-160500)
1. [I] Show the age of the cell state by color. (**COMPLETED**: 20250927-160500)
1. [I] When a cell is clicked display the history of the cell state for each generation in a popup to the right (**COMPLETED**: 20250927-160500)
1. [I] for the history, also display a small square to show the color corresponding to its age (**COMPLETED**: 20250927-160650)
1. [I] use shift-click to toggle the history (**COMPLETED**: 20250927-160650)

## v00.00.06 - fix Voronoi for game-of-life

1. [I] Remove the `Voronoi (sites)` option. (**COMPLETED**: 20250927-161400)
2. [I] The `Delaunay` option should work with the cells, similar to `Voronoi (Live Cells)` (**COMPLETED**: 20250927-161400)
3. [I] Add a `Voronoi (Live Cells) Colored` option. (**COMPLETED**: 20250927-161400)

## v00.00.07 - ui tweaks for game-of-life

1. [I] Separate the color schemes for coloring the Cell Age and the Voronoi Age. (**COMPLETED**: 20250927-163200)
1. [I] Add some additional themes, include Rainbow and Reverse-Rainbow. (**COMPLETED**: 20250927-163200)
1. [I] Move the seeds to the second place. (**COMPLETED**: 20250927-163200)
1. [I] Move the `Seeds` section as the second configuration section on the left (**COMPLETED**: 20250928-120000)
1. [I] Add a version number based on the current requirements section to the top of the configuration section. (**COMPLETED**: 20250928-121500)
1. [I] the delauney triangulation does not display anything. Draw the lines from the center of the cells. (**COMPLETED**: 20250928-124200)
1. [I] Change behavior of exploration mode: (**COMPLETED**: 20250928-131500)
  - [I] Add a new option to the `Simulation Tab` called `Click Mode` (**COMPLETED**: 20250928-131500)
        - [I] Default is to `Toggle Cell` - this should toggle a cell between being alive or dead as the mouse is pressed. (**COMPLETED**: 20250928-131500)
        - [I] Add a mode `Explore Cells` - this will bring up the history of the cell (**COMPLETED**: 20250928-131500)

## v00.01.00 - Initial Release

## v00.02.00 - A better library of presets for game-of-life

1. [I] Review documentation about different Game of Life file formats:
    - [I] https://conwaylife.com/wiki/Run_Length_Encoded descibes the RLE format. (**COMPLETED**: 20250928-143500)
      - review `data/p100honeyfarmhassler.rle`
    - [I] https://conwaylife.com/wiki/Plaintext describes the plain text format. (**COMPLETED**: 20250928-143500)
      - review `data/p100honeyfarmhassler.cells`
    - (data from https://conwaylife.com/wiki/Category:Patterns)
1. [I] Create an option to load different pattern files:
    - [I] Create a button `Load Pattern` in `Seeds` panel. (**COMPLETED**: 20250928-150200)
    - [I] When loaded allow the user to place the pattern anywhere on the surface. (**COMPLETED**: 20250928-150200)
    - [I] Truncate the shape if it's too big for the current grid. (**COMPLETED**: 20250928-150200)
    - [I] As the user hovers, display the new shape in Green over the existing map. (**COMPLETED**: 20250928-150200)
    - [I] Drop it where the user clicks the mouse button. (**COMPLETED**: 20250928-150200)
1. [I] After loading a pattern, display a message next to the `Load Pattern` button saying "Press ESC to place individual cells". Once Escape is pressed, clear the message. (**COMPLETED**: 20250928-152800)
1. [I] Above the `Load Pattern` button, place a note that says `Pattern files can be found at https://conwaylife.com/wiki.` (**COMPLETED**: 20250928-154500)
1. [I] Add a button to `Seeds` to add a pattern via copy/paste. (**COMPLETED**: 20251002-154500)
  - This should pop up into a window with a large text buffer and a rendering of the cells.
  - Provide a `Cancel` button for when the user changes their mind.
  - Provide an `Add` button that will behave as if the user the user loaded a file.
1. [I] The pattern preview should be to the right of the copy/paste text field. (**COMPLETED**: 20251002-162200)

## implementation
- [I] Add a button to `Seeds` to add a pattern via copy/paste. (**COMPLETED**: 20251002-154500)
  - Added a `Paste Pattern` control to the `Seeds` panel opening a modal with a large textarea, live preview canvas, and status messaging.
  - Reused the existing RLE/plaintext parsing logic for pasted content, providing validation feedback and truncation indicators in real time.
  - Wired the modal to feed the existing hover preview / placement workflow so pasted patterns behave exactly like loaded files.
  - Documented the new workflow in `README.md` and verified via `tests/smoke/README.md` checklist.
- [I] The pattern preview should be to the right of the copy/paste text field. (**COMPLETED**: 20251002-162200)
  - Updated modal layout to use a responsive grid placing the preview column to the right on desktop and stacking vertically on narrow viewports.
  - Verified CSS to ensure consistent alignment and updated smoke test instructions accordingly.

## v00.00.09 - Add a 3d-renderer, with the height to represent the age.

------------------------------------------------------------------------------------------------

# Implementation Notes
## v00.00.01 implementation

- Create a shared scaffolding for explorer one-pagers: routing stub, build script, base layout, and reusable control panel styling.
- Implement Voronoi Diagram Explorer: render Voronoi cells with stroke styling, enable drag-and-drop for sites, and re-render on drag interactions.
- Implement Game of Life Explorer: interactive grid with play/pause/step controls, pattern seeding, and layout accommodating future control relocation.
- Implement Lindenmeyer System Explorer: real-time L-system renderer with editable grammar textarea and preview updates on change.
- Implement Mandelbrot Set Explorer: canvas renderer with zoom/pan and live bounding-box overlay during mouse drag.
- Document features and usage in `README.md`, execute smoke tests in `tests/`, and update task statuses with completion timestamps.

## v00.00.02 implementation
- Review the current rendering implementations for each explorer to assess how Euclidean and spherical modes can share abstractions.
- Design and build shared UI/state components for selecting rendering modes, including the dropdown, rotation handling, and wraparound options.
- Integrate the new rendering mode support into `game-of-life-explorer`, `lindenmeyer-explorer`, `mandelbrot-explorer`, and `voronoi-explorer`.
- Update `README.md`, run verification in `tests/`, and record task completions with timestamps once confirmed.
- Provide a central landing page at `apps/index.html` linking to each explorer for local browsing.

## v00.00.03 implementation
- Extend Game of Life controls with a world overlay selector (None, Voronoi, Delaunay) sharing the existing site set logic.
- Implement Voronoi/Delaunay rendering pipelines that respect Euclidean and spherical modes, including wrap behaviour.
- Document overlays in README/tests and update task status upon verification.

## v00.00.04 implementation
- Surface the rule matrix in Game of Life controls with editable state, default reset, and copyable rule string.

## #v00.00.06 implementation
- Audit the Game of Life explorer to locate the existing configuration panels, rendering pipeline, and state handling for cell metadata.
- Design UX updates for cell size controls, collapsible configuration sections, age-based color encoding, and a side-panel popup for cell history.
- Implement the new controls, rendering adjustments, history tracking, and popup interactions within the Game of Life explorer codebase.
- Refresh `README.md` to document the new features and note validation steps in `tests/` before updating the task statuses.
- Extend configuration management to support a dynamic cell size slider (driving column/row recalculation) while preserving existing live cells where possible.
- Update shared UI helpers so each control section can toggle open/closed with persisted default states.
- Add age tracking to the simulation loop, render a perceptual gradient keyed to cell age, and surface a legend if needed in the UI.
- Persist per-cell generation histories, expose them through click interactions, and render a responsive detail panel anchored to the right of the stage.
- Document new controls and visual encodings in `README.md`, add coverage in `tests/`, then mark tasks with timestamps once verified.

- Inspect the Game of Life configuration sidebar to confirm current section ordering and identify the `Seeds` block definition.
- Adjust the ordering so the `Seeds` section renders second while preserving existing collapse state and styling hooks.
- Validate the updated ordering across preset configurations, update documentation, and note verification steps in `tests/` prior to task completion.

- Locate the Game of Life configuration panel header construction within the shared layout utilities.
- Surface the active requirements version (e.g., `v00.00.07`) and render it alongside the configuration title.
- Ensure documentation and smoke tests describe the version indicator and keep task status updated after verification.

- Audit the Delaunay overlay logic to determine why triangles are not rendering for live cells.
- Generate triangle edges using the centres of active cells and render them with appropriate styling.
- Update README/tests to mention the visualisation change and mark the task complete once validated.

## v00.02.00 implementation
- Capture parsing rules for RLE and Plaintext formats (headers, comments, coordinate origins, run-length semantics, end markers) and note any deviations present in bundled samples like `104p177.rle`/`.cells`.
- Prototype a pattern ingestion module: normalize shared metadata (name, author, comments), convert format-specific bodies into a unified cell array with origin offsets. Ensure Plaintext lines map to `.`/`O` values and RLE handles `$` newlines, `!` termination, and whitespace.
- Extend `Seeds` controls with a `Load Pattern` trigger that opens a file picker limited to `.rle`/`.cells`, reads text, and delegates to the ingestion module with clear error messaging. Surface parsed metadata (pattern name) in the UI for confirmation.
- Introduce temporary placement state: store preview cells in a `state.patternPreview` object (shape bounds, alive offsets, intended origin) and render as a green overlay that follows the pointer. Clamp preview origin to keep the preview within grid bounds.
- Implement truncation by filtering preview offsets that would fall outside the current grid and communicating truncation to the user (status message beneath Seeds panel).
- On click confirmation, merge the pattern into `state.grid` at the snapped location, append history records for newly alive cells, and clear preview state.
- Update documentation (`README.md`, smoke tests) to cover pattern loading workflow, supported formats, and truncation behaviour once validated. (**COMPLETED**: 20250928-151000)
