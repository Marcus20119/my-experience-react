interface Props {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const checkOverflowedRoom = ({ height, width, x, y }: Props) => {
  const halfW = width / 2;
  const halfH = height / 2;

  const left = x - halfW;
  const right = x + halfW;
  const top = y - halfH;
  const bottom = y + halfH;

  return left < 0 || right > 100 || top < 0 || bottom > 100;
};
