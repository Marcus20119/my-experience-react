import { forwardRef, useImperativeHandle } from 'react';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import type { FloorPlanRef } from '@/app/features/feature/floor-plan/model';

function FloorPlanImperativeHandleBridge(
  _: unknown,
  ref: React.Ref<FloorPlanRef>,
) {
  const { deskSize, floorPlanImage, handleResetFloorPlan, rooms } =
    useFloorPlanEditorContext();

  useImperativeHandle(
    ref,
    (): FloorPlanRef => ({
      getData: () => ({
        deskSize,
        floorPlanImage,
        rooms,
      }),
      resetData: handleResetFloorPlan,
    }),
  );

  return null;
}

export default forwardRef<FloorPlanRef, unknown>(
  FloorPlanImperativeHandleBridge,
);
