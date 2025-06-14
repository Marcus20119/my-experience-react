/* eslint-disable prefer-destructuring */
import { BackwardItem, ForwardItem, Trash } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import {
  CanvaItemType,
  CanvaShapeType,
} from '@/app/features/feature/canva-editor/model';
import { Action, type CompactActionEntity } from '@/shared/components';

interface Props {
  zIndex: number;
}

function CanvaItemActions({ zIndex }: Props) {
  const { t } = useTranslation();
  const {
    isEditing,
    items,
    onBringToFront,
    onRemoveProduct,
    onSendToBack,
    selectedItem,
    stageSize,
  } = useCanvaEditorContext();

  // change top position of actions based on rotation
  const top = useMemo(() => {
    if (!selectedItem) {
      return 0;
    }

    const { rotation = 0, type, x, y } = selectedItem;

    let height: number = 0;
    let width: number = 0;

    switch (type) {
      case CanvaItemType.Image:
      case CanvaItemType.Text: {
        height = selectedItem.height;
        width = selectedItem.width;
        break;
      }

      case CanvaItemType.Shape: {
        switch (selectedItem.props.shapeType) {
          case CanvaShapeType.Rectangle: {
            height = selectedItem.props.height;
            width = selectedItem.props.width;
            break;
          }
          case CanvaShapeType.Square: {
            height = selectedItem.props.height;
            width = selectedItem.props.width;
            break;
          }
          case CanvaShapeType.Circle:
          case CanvaShapeType.Triangle:
          case CanvaShapeType.Pentagon:
          case CanvaShapeType.Hexagon: {
            height = selectedItem.props.radius * 2;
            width = selectedItem.props.radius * 2;
            break;
          }
          case CanvaShapeType.Ellipse: {
            height = selectedItem.props.radiusY * 2;
            width = selectedItem.props.radiusX * 2;
            break;
          }
          case CanvaShapeType.Star: {
            height = selectedItem.props.outerRadius * 2;
            width = selectedItem.props.outerRadius * 2;
            break;
          }
          default: {
            break;
          }
        }

        break;
      }
      default: {
        break;
      }
    }

    const alpha = rotation * (Math.PI / 180);
    // the degree when diagonal line is vertical
    const beta = Math.atan(width / height);
    const diagonalLength = Math.sqrt(height ** 2 + width ** 2);

    const a = {
      x: x - (Math.sin(beta - alpha) * diagonalLength) / 2,
      y: y - (Math.cos(beta - alpha) * diagonalLength) / 2,
    };

    const b = {
      x: x + (Math.sin(beta + alpha) * diagonalLength) / 2,
      y: y - (Math.cos(beta + alpha) * diagonalLength) / 2,
    };

    const c = {
      x: x + (Math.sin(beta - alpha) * diagonalLength) / 2,
      y: y + (Math.cos(beta - alpha) * diagonalLength) / 2,
    };

    const d = {
      x: x - (Math.sin(beta + alpha) * diagonalLength) / 2,
      y: y + (Math.cos(beta + alpha) * diagonalLength) / 2,
    };

    const maxY = Math.max(a.y, b.y, c.y, d.y);

    if (Math.abs(rotation) > 150) {
      return maxY + (48 / stageSize.height) * 100; // 48 is the height of the rotate stick
    }

    return maxY;
  }, [selectedItem, stageSize.height]);

  const actions = useMemo<CompactActionEntity[]>(() => {
    if (!selectedItem) {
      return [];
    }

    return [
      {
        disabled: !items?.some(item => item.zIndex > selectedItem?.zIndex),
        icon: <ForwardItem size="20" variant="Bulk" />,
        label: t('feature.canva.button.bringToFront'),
        onClick: () => {
          onBringToFront(selectedItem.id);
        },
        type: 'button',
      },
      {
        disabled: selectedItem?.zIndex === 0,
        icon: <BackwardItem size="20" variant="Bulk" />,
        label: t('feature.canva.button.sendToBack'),
        onClick: () => {
          onSendToBack(selectedItem.id);
        },
        type: 'button',
      },
      {
        icon: <Trash size="20" variant="Bulk" />,
        label: t('feature.canva.button.remove'),
        onClick: () => {
          onRemoveProduct(selectedItem.id);
        },
        type: 'button',
      },
    ];
  }, [items, onBringToFront, onRemoveProduct, onSendToBack, selectedItem, t]);

  // if no item is selected or the item is being edited, don't show actions
  if (!selectedItem || isEditing) {
    return null;
  }

  return (
    <Action.Compact
      actions={actions}
      block
      className="absolute w-fit -translate-x-1/2 translate-y-1/2"
      style={{
        left: `${selectedItem.x}%`,
        top: `${top}%`,
        zIndex,
      }}
    />
  );
}

export default CanvaItemActions;
