interface Props {
  height: number;
  rotation: number;
  width: number;
  x: number;
  y: number;
}

export const getRecVertices = ({ height, rotation, width, x, y }: Props) => {
  const alpha = rotation * (Math.PI / 180);
  // the degree when diagonal line is vertical
  const beta = Math.atan(width / height);
  const diagonalLength = Math.sqrt(height ** 2 + width ** 2);

  // get 4 points
  const a = {
    x: x - (Math.sin(beta - alpha) * diagonalLength) / 2,
    y: y - (Math.cos(beta - alpha) * diagonalLength) / 2,
  };

  const b = {
    x: x + (Math.sin(beta + alpha) * diagonalLength) / 2,
    y: y - (Math.cos(beta + alpha) * diagonalLength) / 2,
  };

  const c = {
    x: x + (Math.sin(beta - alpha) * diagonalLength) / 2,
    y: y + (Math.cos(beta - alpha) * diagonalLength) / 2,
  };

  const d = {
    x: x - (Math.sin(beta + alpha) * diagonalLength) / 2,
    y: y + (Math.cos(beta + alpha) * diagonalLength) / 2,
  };

  return { a, b, c, d };
};
