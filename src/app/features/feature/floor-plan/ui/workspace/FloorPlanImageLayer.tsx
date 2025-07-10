import { Image } from 'antd';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';

interface Props {
  zIndex: number;
}

function FloorPlanImageLayer({ zIndex }: Props) {
  const { floorPlanUrl, stageSize } = useFloorPlanEditorContext();

  return (
    <div className="absolute inset-0" style={{ zIndex }}>
      <img
        style={{
          height: stageSize.height,
          width: stageSize.width,
        }}
        src={floorPlanUrl}
      />
    </div>
  );
}

export default FloorPlanImageLayer;
