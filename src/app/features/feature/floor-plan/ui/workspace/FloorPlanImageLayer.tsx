import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { FileTool } from '@/shared/utils/file';

const { splitFileUrl } = FileTool;

interface Props {
  zIndex: number;
}

function FloorPlanImageLayer({ zIndex }: Props) {
  const { floorPlanImage, stageSize } = useFloorPlanEditorContext();

  const { url } = splitFileUrl(floorPlanImage);

  return (
    <div className="absolute inset-0" style={{ zIndex }}>
      <img
        alt="Floor plan"
        src={url}
        style={{
          height: stageSize.height,
          width: stageSize.width,
        }}
      />
    </div>
  );
}

export default FloorPlanImageLayer;
