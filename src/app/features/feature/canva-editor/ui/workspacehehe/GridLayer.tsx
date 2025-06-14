interface Props {
  grid?: [number, number];
  zIndex: number;
}

function GridLayer({ grid = [3, 3], zIndex }: Props) {
  return (
    <div className="absolute inset-0" style={{ zIndex }}>
      {Array(grid[1] - 1)
        .fill('')
        .map((_, index) => (
          <div
            className="absolute w-full border-0 border-b border-dashed border-neutral-300"
            key={index}
            style={{
              top: `${(100 / grid[1]) * (index + 1)}%`,
            }}
          />
        ))}
      {Array(grid[0] - 1)
        .fill('')
        .map((_, index) => (
          <div
            className="absolute h-full border-0 border-r border-dashed border-neutral-300"
            key={index}
            style={{
              left: `${(100 / grid[0]) * (index + 1)}%`,
            }}
          />
        ))}
    </div>
  );
}

export default GridLayer;
