# Smoke Tests

## Shared Rendering Controls
- Open each explorer and switch between `Euclidean` and `Spherical` modes.
- Verify wrap options (None, Left-Right, Up-Down, Full) affect Euclidean mode only.
- In spherical mode, right-drag to rotate and click `Reset Rotation` to return to default orientation.

## Explorer-specific Checks
- **Voronoi**: Drag sites in both modes, ensuring spherical projection keeps interaction responsive.
- **Game of Life**: Toggle cells, run/pause simulation, confirm wrap modes influence neighbour calculations, verify live-cell overlays (`Voronoi`, `Voronoi (Colored)`, `Delaunay`) across theme options (Age, Rainbow, Reverse-Rainbow), inspect Delaunay to ensure lines connect live-cell centres with age-themed gradients, adjust the rule matrix (toggling cells, copying the rule string, and resetting to default), resize the grid via the cell-size slider, confirm the Seeds panel sits second beneath Simulation, check the version badge beside the configuration heading reflects the latest requirements section, collapse/expand control panels, and Shift-click cells to open/close the history panel (ensuring age colour swatches update per generation).
- **Lindenmayer**: Modify grammar parameters and observe immediate updates in both projections.
- **Mandelbrot**: Zoom via drag box and scroll wheel, confirm renders update in spherical view without artifacts.
