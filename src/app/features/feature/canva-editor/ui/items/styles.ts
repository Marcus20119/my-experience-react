import styled from '@emotion/styled';

export const StyledCheckered = styled.div`
  height: 100%;
  width: 100%;
  opacity: 0.05;
  background:
    -webkit-linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%,
      #000 0
    ),
    -webkit-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000
          75%, #000 0),
    white;
  background:
    -moz-linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%,
      #000 0
    ),
    -moz-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000
          75%, #000 0),
    white;
  background: linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%,
      #000 0
    ),
    linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%,
      #000 0
    ),
    white;
  background-repeat: repeat, repeat;
  background-position:
    0px 0,
    5px 5px;
  -webkit-transform-origin: 0 0 0;
  transform-origin: 0 0 0;
  -webkit-background-origin: padding-box, padding-box;
  background-origin: padding-box, padding-box;
  -webkit-background-clip: border-box, border-box;
  background-clip: border-box, border-box;
  -webkit-background-size:
    10px 10px,
    10px 10px;
  background-size:
    10px 10px,
    10px 10px;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-shadow: none;
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  transition: none;
  -webkit-transform: scaleX(1) scaleY(1) scaleZ(1);
  transform: scaleX(1) scaleY(1) scaleZ(1);
`;
