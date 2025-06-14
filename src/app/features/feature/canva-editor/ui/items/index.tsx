import CanvaImageItem from './CanvaImageItem';
import CanvaShapeItem from './CanvaShapeItem';
import SidebarImageItem from './SidebarImageItem';
import SidebarShapeItem from './SidebarShapeItem';

function Item() {
  return null;
}

Item.SidebarImage = SidebarImageItem;
Item.CanvaImage = CanvaImageItem;
Item.SidebarShape = SidebarShapeItem;
Item.CanvaShape = CanvaShapeItem;

export default Item;
