import FloorPlanItemAction from './FloorPlanItemAction';
import ResizeDeskAction from './ResizeDeskAction';
import ZoomAction from './ZoomAction';

function FloorPlanAction() {
  return null;
}

FloorPlanAction.Item = FloorPlanItemAction;
FloorPlanAction.ResizeDesk = ResizeDeskAction;
FloorPlanAction.Zoom = ZoomAction;

export default FloorPlanAction;
