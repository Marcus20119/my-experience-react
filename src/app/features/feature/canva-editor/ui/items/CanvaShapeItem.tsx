/* eslint-disable max-lines */
import type Konva from 'konva';
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import {
  Circle,
  Ellipse,
  Rect,
  RegularPolygon,
  Star,
  Transformer,
} from 'react-konva';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { getDashValue } from '@/app/features/feature/canva-editor/lib';
import type { CanvaShapeItemEntity } from '@/app/features/feature/canva-editor/model';
import {
  CanvaShapeType,
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  STAR_RATIO,
} from '@/app/features/feature/canva-editor/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface CanvaShapeProps {
  item: CanvaShapeItemEntity;
  shapeRef: MutableRefObject<
    | Konva.Circle
    | Konva.Ellipse
    | Konva.Rect
    | Konva.RegularPolygon
    | Konva.Star
    | undefined
  >;
}

function CanvaShape({ item, shapeRef }: CanvaShapeProps) {
  const {
    fill,
    props,
    rotation,
    strokeColor = DEFAULT_STROKE_COLOR,
    strokeType,
    strokeWidth = DEFAULT_STROKE_WIDTH,
    x,
    y,
  } = item;

  const {
    onUpdateItem,
    selectedItem,
    setIsEditing,
    setSelectedItem,
    stageSize,
  } = useCanvaEditorContext();

  const onToggleSelectedItem = () => {
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    onToggleSelectedItem();
  };

  const onTap = (e: Konva.KonvaEventObject<TouchEvent>) => {
    e.cancelBubble = true;
    onToggleSelectedItem();
  };

  const onMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'move';
  };

  const onMouseLeave = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'default';
  };

  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'move';
    setIsEditing(true);
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    const node = shapeRef.current;

    if (!node) return;

    const newItem: CanvaShapeItemEntity = {
      ...item,
      x: (node.x() * 100) / stageSize.width,
      y: (node.y() * 100) / stageSize.height,
    };

    onUpdateItem(newItem);
    setIsEditing(false);
  };

  const onTransformStart = (e: Konva.KonvaEventObject<Event>) => {
    e.cancelBubble = true;
    setIsEditing(true);
  };

  const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    e.cancelBubble = true;
    const node = shapeRef.current;

    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const x = (node.x() * 100) / stageSize.width;
    const y = (node.y() * 100) / stageSize.height;
    const rotation = node.rotation();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    let newItem: CanvaShapeItemEntity = {
      ...item,
    };

    switch (props.shapeType) {
      case CanvaShapeType.Rectangle: {
        const rectNode = node as Konva.Rect;

        newItem = {
          ...item,
          props: {
            height: (rectNode.height() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Rectangle,
            width: (rectNode.width() * scaleX * 100) / stageSize.width,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Square: {
        const rectNode = node as Konva.Rect;

        newItem = {
          ...item,
          props: {
            height: (rectNode.height() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Square,
            width: (rectNode.width() * scaleX * 100) / stageSize.width,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Circle: {
        const circleNode = node as Konva.Circle;

        newItem = {
          ...item,
          props: {
            radius: (circleNode.radius() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Circle,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Ellipse: {
        const ellipseNode = node as Konva.Ellipse;

        newItem = {
          ...item,
          props: {
            radiusX: (ellipseNode.radiusX() * scaleX * 100) / stageSize.width,
            radiusY: (ellipseNode.radiusY() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Ellipse,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Triangle: {
        const triangleNode = node as Konva.RegularPolygon;

        newItem = {
          ...item,
          props: {
            radius: (triangleNode.radius() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Triangle,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Star: {
        const starNode = node as Konva.Star;
        const outerRadius =
          (starNode.outerRadius() * scaleY * 100) / stageSize.height;

        newItem = {
          ...item,
          props: {
            innerRadius: outerRadius / STAR_RATIO,
            outerRadius,
            shapeType: CanvaShapeType.Star,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Pentagon: {
        const pentagonNode = node as Konva.RegularPolygon;

        newItem = {
          ...item,
          props: {
            radius: (pentagonNode.radius() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Pentagon,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      case CanvaShapeType.Hexagon: {
        const hexagonNode = node as Konva.RegularPolygon;

        newItem = {
          ...item,
          props: {
            radius: (hexagonNode.radius() * scaleY * 100) / stageSize.height,
            shapeType: CanvaShapeType.Hexagon,
          },
          rotation,
          x,
          y,
        };
        break;
      }

      default: {
        break;
      }
    }

    onUpdateItem(newItem);
    setIsEditing(false);
  };

  const events = {
    onClick,
    onDragEnd,
    onDragStart,
    onMouseEnter,
    onMouseLeave,
    onTap,
    onTransformEnd,
    onTransformStart,
  };

  switch (props.shapeType) {
    case CanvaShapeType.Rectangle: {
      return (
        <Rect
          cornerRadius={props.cornerRadius}
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          height={(props.height * stageSize.height) / 100}
          offsetX={(props.width * stageSize.width) / 200}
          offsetY={(props.height * stageSize.height) / 200}
          ref={shapeRef as MutableRefObject<Konva.Rect>}
          rotation={rotation}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          width={(props.width * stageSize.width) / 100}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Square: {
      return (
        <Rect
          cornerRadius={props.cornerRadius}
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          height={(props.height * stageSize.height) / 100}
          offsetX={(props.width * stageSize.width) / 200}
          offsetY={(props.height * stageSize.height) / 200}
          ref={shapeRef as MutableRefObject<Konva.Rect>}
          rotation={rotation}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          width={(props.width * stageSize.width) / 100}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Circle: {
      return (
        <Circle
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          radius={(props.radius * stageSize.height) / 100}
          ref={shapeRef as MutableRefObject<Konva.Circle>}
          rotation={rotation}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Ellipse: {
      return (
        <Ellipse
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          radiusX={(props.radiusX * stageSize.width) / 100}
          radiusY={(props.radiusY * stageSize.height) / 100}
          ref={shapeRef as MutableRefObject<Konva.Ellipse>}
          rotation={rotation}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Triangle: {
      return (
        <RegularPolygon
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          radius={(props.radius * stageSize.height) / 100}
          ref={shapeRef as MutableRefObject<Konva.RegularPolygon>}
          rotation={rotation}
          sides={3}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Star: {
      return (
        <Star
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          innerRadius={props.innerRadius * (stageSize.height / 100)}
          numPoints={5}
          outerRadius={props.outerRadius * (stageSize.height / 100)}
          ref={shapeRef as MutableRefObject<Konva.Star>}
          rotation={rotation}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Pentagon: {
      return (
        <RegularPolygon
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          radius={(props.radius * stageSize.height) / 100}
          ref={shapeRef as MutableRefObject<Konva.RegularPolygon>}
          rotation={rotation}
          sides={5}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    case CanvaShapeType.Hexagon: {
      return (
        <RegularPolygon
          dash={getDashValue(strokeType)}
          draggable
          fill={fill}
          radius={(props.radius * stageSize.height) / 100}
          ref={shapeRef as MutableRefObject<Konva.RegularPolygon>}
          rotation={rotation}
          sides={6}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          x={(x * stageSize.width) / 100}
          y={(y * stageSize.height) / 100}
          {...events}
        />
      );
    }

    default: {
      return null;
    }
  }
}

interface Props {
  item: CanvaShapeItemEntity;
}

function CanvaShapeItem({ item }: Props) {
  const shapeRef = useRef<
    | Konva.Circle
    | Konva.Ellipse
    | Konva.Rect
    | Konva.RegularPolygon
    | Konva.Star
    | undefined
  >();
  const trRef = useRef<Konva.Transformer>(null);

  const { selectedItem } = useCanvaEditorContext();

  // Attach the transformer to the image
  useEffect(() => {
    if (selectedItem?.id === item.id && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [item.id, selectedItem?.id]);

  const enabledAnchors: string[] | undefined = useMemo(() => {
    if (
      [
        CanvaShapeType.Circle,
        CanvaShapeType.Square,
        CanvaShapeType.Triangle,
        CanvaShapeType.Star,
        CanvaShapeType.Pentagon,
        CanvaShapeType.Hexagon,
      ].includes(item.props.shapeType)
    ) {
      return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    }

    return undefined;
  }, [item.props.shapeType]);

  return (
    <>
      <CanvaShape item={item} shapeRef={shapeRef} />
      {selectedItem?.id === item.id ? (
        <Transformer
          anchorCornerRadius={4}
          anchorFill="true"
          anchorStroke={COLOR.secondary}
          anchorStrokeWidth={2}
          borderStroke={COLOR.primary}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }

            return newBox;
          }}
          enabledAnchors={enabledAnchors}
          flipEnabled={false}
          ref={trRef}
          rotationSnaps={[0, 45, 90, 135, 180, 235, 270]}
        />
      ) : null}
    </>
  );
}

export default CanvaShapeItem;
