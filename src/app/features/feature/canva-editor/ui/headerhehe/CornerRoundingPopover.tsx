import { Flex, InputNumber, Slider, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import {
  CanvaItemType,
  CanvaShapeType,
} from '@/app/features/feature/canva-editor/model';

const { Text } = Typography;

function CornerRoundingPopover() {
  const { t } = useTranslation();
  const { onUpdateItem, selectedItem } = useCanvaEditorContext();

  const isShape = selectedItem?.type === CanvaItemType.Shape;
  const isImage = selectedItem?.type === CanvaItemType.Image;

  const cornerRadius = useMemo(() => {
    if (isShape) {
      switch (selectedItem.props.shapeType) {
        case CanvaShapeType.Rectangle:
        case CanvaShapeType.Square: {
          return selectedItem.props.cornerRadius ?? 0;
        }
      }
    }

    if (isImage) {
      return selectedItem.cornerRadius ?? 0;
    }

    return 0;
  }, [isImage, isShape, selectedItem]);

  const onUpdateCornerRadius = useCallback(
    (value: null | number) => {
      if (isShape) {
        switch (selectedItem.props.shapeType) {
          case CanvaShapeType.Rectangle:
          case CanvaShapeType.Square: {
            onUpdateItem({
              ...selectedItem,
              props: {
                ...selectedItem.props,
                cornerRadius: value ?? 0,
              },
            });
            break;
          }
        }
      }

      if (isImage) {
        onUpdateItem({
          ...selectedItem,
          cornerRadius: value ?? 0,
        });
      }
    },
    [isImage, isShape, onUpdateItem, selectedItem],
  );

  return (
    <Flex gap="0.25rem" vertical>
      <Text>{t('feature.canva.label.cornerRounding')}</Text>
      <Flex align="center" gap="0.75rem">
        <Slider
          className="w-48"
          max={100}
          min={0}
          onChange={onUpdateCornerRadius}
          step={1}
          tooltip={{
            open: false,
          }}
          value={cornerRadius}
        />
        <InputNumber
          className="w-12"
          controls={false}
          max={100}
          min={0}
          onChange={onUpdateCornerRadius}
          precision={0}
          size="small"
          step={1}
          value={cornerRadius}
        />
      </Flex>
    </Flex>
  );
}

export default CornerRoundingPopover;
