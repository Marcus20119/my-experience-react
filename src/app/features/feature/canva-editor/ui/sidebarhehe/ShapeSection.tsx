import { Icon } from '@iconify/react';
import { Col, Flex, Row } from 'antd';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import {
  CANVA_SIZE,
  CanvaShapeType,
} from '@/app/features/feature/canva-editor/model';
import { COLOR } from '@/shared/assets/styles/constants';

import Item from '../items';

function ShapeSection() {
  const { height } = useCanvaEditorContext();

  const shapeSize =
    (CANVA_SIZE.sidebarWidth - CANVA_SIZE.actionBarWidth - 12 * 2) / 2; // 12 is the gutter size, 2 is the number of columns
  const iconSize = shapeSize - 12 * 2; // 12 is the padding size

  const shapes: {
    icon: React.ReactNode;
    type: CanvaShapeType;
  }[] = [
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="fluent-mdl2:square-shape-solid"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Square,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="fluent-mdl2:rectangle-shape-solid"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Rectangle,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="fluent-mdl2:circle-shape-solid"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Circle,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="mdi:ellipse"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Ellipse,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="fluent-mdl2:triangle-shape-solid"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Triangle,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="ic:sharp-star"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Star,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="material-symbols:pentagon"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Pentagon,
    },
    {
      icon: (
        <Icon
          color={COLOR.primary}
          height={iconSize}
          icon="mdi:hexagon"
          width={iconSize}
        />
      ),
      type: CanvaShapeType.Hexagon,
    },
  ];

  return (
    <Flex gap={CANVA_SIZE.sidebarSectionSpace} vertical>
      <div
        className="white-background-scrollbar w-full overflow-y-auto px-3"
        style={{
          height: height - (40 + CANVA_SIZE.sidebarSectionSpace * 3), // 40 is the height of the upload button
        }}
      >
        <Row
          gutter={[
            CANVA_SIZE.sidebarSectionSpace,
            CANVA_SIZE.sidebarSectionSpace,
          ]}
        >
          {shapes?.map((shape, index) => (
            <Col key={index} span={12}>
              <Item.SidebarShape icon={shape.icon} type={shape.type} />
            </Col>
          ))}
        </Row>
      </div>
    </Flex>
  );
}

export default ShapeSection;
