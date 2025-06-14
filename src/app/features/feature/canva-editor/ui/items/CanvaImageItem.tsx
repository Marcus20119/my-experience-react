/* eslint-disable perfectionist/sort-jsx-props */
import type Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { getDashValue } from '@/app/features/feature/canva-editor/lib';
import type { CanvaImageItemEntity } from '@/app/features/feature/canva-editor/model';
import {
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
} from '@/app/features/feature/canva-editor/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  item: CanvaImageItemEntity;
}

function CanvaImageItem({ item }: Props) {
  const trRef = useRef<Konva.Transformer>(null);
  const imgRef = useRef<Konva.Image>(null);

  const [img] = useImage(item.url, 'anonymous');
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

  // Attach the transformer to the image
  useEffect(() => {
    if (selectedItem?.id === item.id && trRef.current && imgRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [item.id, selectedItem?.id]);

  return (
    <>
      <Image
        image={img}
        ref={imgRef}
        draggable
        // Styles
        height={(item.height * stageSize.height) / 100}
        width={item.width * (stageSize.width / 100)}
        offsetX={(item.width * stageSize.width) / 200}
        offsetY={(item.height * stageSize.height) / 200}
        x={(item.x * stageSize.width) / 100}
        y={(item.y * stageSize.height) / 100}
        rotation={item.rotation}
        cornerRadius={item.cornerRadius}
        stroke={item.strokeColor ?? DEFAULT_STROKE_COLOR}
        strokeWidth={item.strokeWidth ?? DEFAULT_STROKE_WIDTH}
        dash={getDashValue(item.strokeType)}
        // Events
        onClick={e => {
          e.cancelBubble = true;
          onToggleSelectedItem();
        }}
        onTap={e => {
          e.cancelBubble = true;
          onToggleSelectedItem();
        }}
        onMouseEnter={e => {
          e.cancelBubble = true;
          document.body.style.cursor = 'move';
        }}
        onMouseLeave={e => {
          e.cancelBubble = true;
          document.body.style.cursor = 'default';
        }}
        onDragStart={e => {
          e.cancelBubble = true;
          document.body.style.cursor = 'move';
          setIsEditing(true);
        }}
        onDragEnd={e => {
          e.cancelBubble = true;
          const node = imgRef.current;

          if (!node) return;

          const newItem: CanvaImageItemEntity = {
            ...item,
            x: (node.x() * 100) / stageSize.width,
            y: (node.y() * 100) / stageSize.height,
          };

          onUpdateItem(newItem);
          setIsEditing(false);
        }}
        onTransformStart={e => {
          e.cancelBubble = true;
          setIsEditing(true);
        }}
        onTransformEnd={e => {
          e.cancelBubble = true;
          const node = imgRef.current;

          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          const newItem: CanvaImageItemEntity = {
            ...item,
            height: (node.height() * scaleY * 100) / stageSize.height,
            rotation: node.rotation(),
            width: (node.width() * scaleX * 100) / stageSize.width,
            x: (node.x() * 100) / stageSize.width,
            y: (node.y() * 100) / stageSize.height,
          };

          onUpdateItem(newItem);
          setIsEditing(false);
        }}
      />

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
          centeredScaling
          flipEnabled={false}
          ref={trRef}
          rotationSnaps={[0, 45, 90, 135, 180, 235, 270]}
        />
      ) : null}
    </>
  );
}

export default CanvaImageItem;
