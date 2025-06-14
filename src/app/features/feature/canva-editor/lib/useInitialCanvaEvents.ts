import { useEffect } from 'react';

import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '../model';

interface Props {
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  workspaceRef: React.RefObject<HTMLDivElement>;
}

export const useInitialCanvaEvents = ({
  setZoomLevel,
  workspaceRef,
}: Props) => {
  useEffect(() => {
    const currentWorkspaceRef = workspaceRef.current;

    const handleWindowWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault(); // Prevents zooming when using the Ctrl key and scroll wheel
      }
    };

    const handleStageWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault(); // Prevents zooming when using the Ctrl key and scroll wheel

        setZoomLevel(prev => {
          const newZoomLevel = prev - event.deltaY / 500;

          if (
            newZoomLevel >= MIN_ZOOM_LEVEL &&
            newZoomLevel <= MAX_ZOOM_LEVEL
          ) {
            return newZoomLevel;
          }

          return prev;
        });
      }
    };

    const handleWindowGesture = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault(); // Prevents pinch-to-zoom on touch devices
      }
    };

    // Attach event listeners
    window?.addEventListener('wheel', handleWindowWheel, {
      passive: false,
    });
    currentWorkspaceRef?.addEventListener('wheel', handleStageWheel, {
      passive: false,
    });
    window?.addEventListener('touchmove', handleWindowGesture, {
      passive: false,
    });

    // Clean up the event listeners on component unmount
    return () => {
      window?.removeEventListener('wheel', handleWindowWheel);
      currentWorkspaceRef?.removeEventListener('wheel', handleStageWheel);
      window?.removeEventListener('touchmove', handleWindowGesture);
    };
  }, []);
};
