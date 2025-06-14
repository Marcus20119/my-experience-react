import { Flex } from 'antd';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import {
  CanvaItemType,
  CanvaShapeType,
  STAR_RATIO,
} from '@/app/features/feature/canva-editor/model';
import { COLOR } from '@/shared/assets/styles/constants';

import { StyledCheckered } from './styles';

interface Props {
  icon: React.ReactNode;
  type: CanvaShapeType;
}

function SidebarShapeItem({ icon, type }: Props) {
  const { onAddItem, stageSize } = useCanvaEditorContext();

  return (
    <Flex
      className="group relative aspect-square w-full cursor-pointer"
      onClick={() => {
        const height = 20;
        const commonProps = {
          fill: `${COLOR.primary}80`,
          x: 50,
          y: 50,
        };

        switch (type) {
          case CanvaShapeType.Rectangle: {
            onAddItem({
              ...commonProps,
              props: {
                height,
                shapeType: CanvaShapeType.Rectangle,
                width: ((height * stageSize.height) / stageSize.width) * 1.5,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Square: {
            onAddItem({
              ...commonProps,
              props: {
                height,
                shapeType: CanvaShapeType.Square,
                width: (height * stageSize.height) / stageSize.width,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Circle: {
            onAddItem({
              ...commonProps,
              props: {
                radius: height / 2,
                shapeType: CanvaShapeType.Circle,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Ellipse: {
            onAddItem({
              ...commonProps,
              props: {
                radiusX: height / 2,
                radiusY: height / 4,
                shapeType: CanvaShapeType.Ellipse,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Triangle: {
            onAddItem({
              ...commonProps,
              props: {
                radius: height / 2,
                shapeType: CanvaShapeType.Triangle,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Star: {
            onAddItem({
              ...commonProps,
              props: {
                innerRadius: height / (2 * STAR_RATIO),
                outerRadius: height / 2,
                shapeType: CanvaShapeType.Star,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Pentagon: {
            onAddItem({
              ...commonProps,
              props: {
                radius: height / 2,
                shapeType: CanvaShapeType.Pentagon,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          case CanvaShapeType.Hexagon: {
            onAddItem({
              ...commonProps,
              props: {
                radius: height / 2,
                shapeType: CanvaShapeType.Hexagon,
              },
              type: CanvaItemType.Shape,
            });
            break;
          }

          default: {
            break;
          }
        }
      }}
    >
      <StyledCheckered />
      <Flex
        align="center"
        className="absolute inset-0 transition-all group-hover:opacity-90"
        justify="center"
      >
        {icon}
      </Flex>
    </Flex>
  );
}

export default SidebarShapeItem;
