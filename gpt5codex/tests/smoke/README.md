# Smoke Tests

## Shared Rendering Controls
- Open each explorer and switch between `Euclidean` and `Spherical` modes.
- Verify wrap options (None, Left-Right, Up-Down, Full) affect Euclidean mode only.
- In spherical mode, right-drag to rotate and click `Reset Rotation` to return to default orientation.

## Explorer-specific Checks
- **Voronoi**: Drag sites in both modes, ensuring spherical projection keeps interaction responsive.
- **Game of Life**: Toggle cells, run/pause simulation, confirm wrap modes influence neighbour calculations, verify live-cell overlays (`Voronoi`, `Voronoi (Colored)`, `Delaunay`) across theme options (Age, Rainbow, Reverse-Rainbow), inspect Delaunay to ensure lines connect live-cell centres with age-themed gradients, adjust the rule matrix (toggling cells, copying the rule string, and resetting to default), resize the grid via the cell-size slider, confirm the Seeds panel sits second beneath Simulation, check the version badge beside the configuration heading reflects the latest requirements section, switch the Simulation `Click Mode` between `Toggle Cell` and `Explore Cells`, Shift-click cells to open/close the history panel (ensuring age colour swatches update per generation), use `Load Pattern` to preview and stamp `.rle`/`.cells` files (verify hover preview, truncation messaging, repeated placement, and Escape to cancel), and use the `Paste Pattern` button to validate pasted pattern parsing, ensure the preview panel renders to the right of the text area on desktop, observe live preview feedback/truncation warnings, and confirm integration with the standard placement workflow.
- **Lindenmayer**: Modify grammar parameters and observe immediate updates in both projections.
- **Mandelbrot**: Zoom via drag box and scroll wheel, confirm renders update in spherical view without artifacts.
