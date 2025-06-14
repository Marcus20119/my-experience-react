import styled from '@emotion/styled';

export const StyledThreeDTicket = styled.div<{
  color1: string;
  color2?: string;
  color3?: string;
  width?: string;
}>`
  width: ${({ width }) => width ?? '260px'};
  height: ${({ width }) => width ?? '260px'};
  perspective: 1000px;
  cursor: pointer;
  user-select: none;

  .card {
    padding-top: 50px;
    border: 3px solid ${({ color1 }) => `${color1}70`};
    transform-style: preserve-3d;
    background: linear-gradient(135deg, #0000 18.75%, #f3f3f3 0 31.25%, #0000 0),
      repeating-linear-gradient(
        45deg,
        #f3f3f3 -6.25% 6.25%,
        ${({ color1 }) => `${color1}05`} 0 18.75%
      );
    background-size: 60px 60px;
    background-position:
      0 0,
      0 0;
    background-color: var(--neutral-0-color);
    width: 100%;
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    border-radius: 8px;
  }

  .content-box {
    background: ${({ color1 }) => `${color1}80`};
    background-image: ${({ color1, color2, color3 }) =>
      color2 && color3
        ? `linear-gradient(135deg, ${color1}80 0%, ${color2}80 46%, ${color3}80 100%)`
        : `linear-gradient(135deg, ${color1}80 0%, ${color2 ?? color1}80 100%)`};
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    padding: 52px 25px 25px 25px;
    transform-style: preserve-3d;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .content-box .card-title {
    display: inline-block;
    color: white;
    font-size: 25px;
    font-weight: 900;
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    transform: translate3d(0px, 0px, 50px);
    text-shadow: 0 0 40px ${({ color1 }) => `${color1}`};
  }

  .content-box .card-title:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .card-content {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 12px;
    font-weight: 700;
    color: var(--neutral-0-color);
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    transform: translate3d(0px, 0px, 30px);
    text-shadow: 0 0 40px ${({ color1 }) => `${color1}`};
  }

  .content-box .card-content:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .see-more {
    cursor: pointer;
    margin-top: 1rem;
    display: inline-block;
    font-weight: 900;
    font-size: 9px;
    text-transform: uppercase;
    color: ${({ color1 }) => color1};
    background: white;
    padding: 0.5rem 0.7rem;
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    transform: translate3d(0px, 0px, 20px);
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .content-box .see-more:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .icon-box {
    position: absolute;
    top: 30px;
    right: 30px;
    height: 60px;
    width: 60px;
    transform: translate3d(0px, 0px, 80px);
    transform-style: preserve-3d;
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
  }

  .star-board {
    transform-style: preserve-3d;
    transition-property: all;
    transition-timing-function: cublogo-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
  }

  .string {
    width: fit-content;
    display: none;
    opacity: 0;
    background-color: ${({ color1 }) => color1};
  }

  .board {
    display: none;
    opacity: 0;
    background-image: ${({ color1, color2, color3 }) =>
      color2 && color3
        ? `linear-gradient(135deg, ${color1}70 0%, ${color2}70 46%, ${color3}70 100%)`
        : `linear-gradient(135deg, ${color1}70 0%, ${color2 ?? color1}70 100%)`};

    svg {
      width: 12px;
      height: 12px;
    }

    .ant-rate-star-half,
    .ant-rate-star-zero {
      .ant-rate-star-second {
        color: var(--neutral-0-color);
      }
    }
  }

  .string:nth-of-type(1) {
    transform-origin: top center;
    animation: scaleZ 300ms 60ms ease-in-out forwards;
  }
  .string:nth-of-type(2) {
    transform-origin: top center;
    animation: scaleZ 300ms 120ms ease-in-out forwards;
  }
  .board {
    transform-origin: top center;
    animation: scaleZ 300ms 180ms ease-in-out forwards;
  }

  &:hover {
    .card {
      background-position:
        -100px 100px,
        -100px 100px;
      transform: rotate3d(0.5, 1, 0, 7deg);
      padding-top: 0px;

      .content-box {
        border-radius: 6px;
      }

      + .star-board {
        transform: rotate3d(0.5, 1, 0, 7deg);
      }

      + .star-board .string,
      + .star-board .board {
        display: flex;
      }
    }
  }
`;
