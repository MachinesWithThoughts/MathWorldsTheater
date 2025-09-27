# Smoke Tests

## Shared Rendering Controls
- Open each explorer and switch between `Euclidean` and `Spherical` modes.
- Verify wrap options (None, Left-Right, Up-Down, Full) affect Euclidean mode only.
- In spherical mode, right-drag to rotate and click `Reset Rotation` to return to default orientation.

## Explorer-specific Checks
- **Voronoi**: Drag sites in both modes, ensuring spherical projection keeps interaction responsive.
- **Game of Life**: Toggle cells, run/pause simulation, confirm wrap modes influence neighbour calculations, verify Voronoi/Delaunay overlays (including live Voronoi), adjust the rule matrix (toggling cells, copying the rule string, and resetting to default), resize the grid via the cell-size slider, collapse/expand control panels, and Ctrl-click cells to open/close the history panel (ensuring age colour swatches update per generation).
- **Lindenmayer**: Modify grammar parameters and observe immediate updates in both projections.
- **Mandelbrot**: Zoom via drag box and scroll wheel, confirm renders update in spherical view without artifacts.
