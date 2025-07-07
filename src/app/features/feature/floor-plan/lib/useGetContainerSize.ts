import { useMemo } from 'react';

interface Props {
  frameSize?: {
    width: number;
    height: number;
  };
  stageSize?: {
    width?: number;
    height?: number;
  };
}

export const useGetContainerSize = ({ frameSize, stageSize }: Props) => {
  const imageTagSize = useMemo(() => {
    let width = 0;
    let height = 0;

    if (!stageSize?.height || !stageSize?.width || !frameSize) {
      return {
        height: 0,
        width: 0,
      };
    }

    const frameWidth = frameSize.width ?? 1;
    const frameHeight = frameSize.height ?? 1;
    const imageWidth = stageSize?.width ?? 1;
    const imageHeight = stageSize?.height ?? 1;

    const frameRatio = frameWidth / frameHeight;
    const pictureRatio = imageWidth / imageHeight;

    // If picture ratio is bigger than frame ratio, then we need to
    if (pictureRatio >= frameRatio) {
      width = frameWidth;
      height = frameWidth / pictureRatio;
    } else {
      height = frameHeight;
      width = frameHeight * pictureRatio;
    }

    return {
      height,
      width,
    };
  }, [stageSize?.height, stageSize?.width, frameSize]);

  return imageTagSize;
};
