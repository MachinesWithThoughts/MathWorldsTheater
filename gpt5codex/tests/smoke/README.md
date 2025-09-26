# Smoke Tests

## Shared Rendering Controls
- Open each explorer and switch between `Euclidean` and `Spherical` modes.
- Verify wrap options (None, Left-Right, Up-Down, Full) affect Euclidean mode only.
- In spherical mode, right-drag to rotate and click `Reset Rotation` to return to default orientation.

## Explorer-specific Checks
- **Voronoi**: Drag sites in both modes, ensuring spherical projection keeps interaction responsive.
- **Game of Life**: Toggle cells, run/pause simulation, and confirm wrap modes influence neighbour calculations.
- **Lindenmayer**: Modify grammar parameters and observe immediate updates in both projections.
- **Mandelbrot**: Zoom via drag box and scroll wheel, confirm renders update in spherical view without artifacts.
