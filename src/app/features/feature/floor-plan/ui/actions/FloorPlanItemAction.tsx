import { Button, Flex } from 'antd';
import { Trash } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { getRecVertices } from '@/app/features/feature/floor-plan/lib';
import { FLOOR_PLAN_EDITOR_SIZE } from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';
import { Modal } from '@/shared/components';
import { useToggle } from '@/shared/hooks';

interface Props {
  zIndex: number;
}

function FloorPlanItemAction({ zIndex }: Props) {
  const { t } = useTranslation();
  const {
    deskSize,
    isEditing,
    onRemoveDeskShape,
    onRemoveRoomShape,
    selectingDesk,
    selectingRoom,
    stageSize,
  } = useFloorPlanEditorContext();
  const {
    onClose: onCloseRemoveModal,
    onOpen: onOpenRemoveModal,
    open: openRemoveModal,
  } = useToggle();

  const x = selectingRoom?.shape?.x || selectingDesk?.shape?.x || 0;
  const y = selectingRoom?.shape?.y || selectingDesk?.shape?.y || 0;

  const xInPx = (x * stageSize.width) / 100;
  const yInPx = (y * stageSize.height) / 100;
  const widthInPx =
    ((selectingRoom?.shape?.width || 0) * stageSize.width) / 100 ||
    deskSize ||
    0;
  const heightInPx =
    ((selectingRoom?.shape?.height || 0) * stageSize.height) / 100 ||
    deskSize ||
    0;

  const rotation =
    selectingRoom?.shape?.rotation || selectingDesk?.shape?.rotation || 0;

  // Change top position of actions based on rotation
  const top = useMemo(() => {
    const { a, b, c, d } = getRecVertices({
      height: heightInPx,
      rotation,
      width: widthInPx,
      x: xInPx,
      y: yInPx,
    });

    const maxYInPx = Math.max(a.y, b.y, c.y, d.y);
    const maxYInPercent = (maxYInPx * 100) / stageSize.height;

    if (Math.abs(rotation) > 150) {
      return (
        maxYInPercent +
        (FLOOR_PLAN_EDITOR_SIZE.rotateStickHeight / stageSize.height) * 100
      );
    }

    return maxYInPercent;
  }, [heightInPx, rotation, stageSize.height, widthInPx, xInPx, yInPx]);

  const handleRemoveItem = () => {
    if (selectingRoom) {
      onRemoveRoomShape(selectingRoom.id);
    } else if (selectingDesk) {
      onRemoveDeskShape(selectingDesk.id);
    }

    onCloseRemoveModal();
  };

  const removeModalTitle = useMemo(() => {
    if (selectingRoom) {
      return t('feature.floorPlan.title.removeRoom', {
        roomName: selectingRoom?.name,
      });
    }

    return t('feature.floorPlan.title.removeDesk', {
      deskName: selectingDesk?.name,
    });
  }, [selectingDesk?.name, selectingRoom, t]);

  const removeModalDescription = useMemo(() => {
    if (selectingRoom) {
      const mappedDesks =
        selectingRoom?.desks?.filter(desk => desk.shape) || [];

      if (mappedDesks.length) {
        return t('feature.floorPlan.description.removeRoomWithDesks', {
          deskCount: mappedDesks.length,
        });
      }

      return t('feature.floorPlan.description.removeRoom');
    }

    return t('feature.floorPlan.description.removeDesk');
  }, [selectingRoom, t]);

  const shouldShowAction = (selectingRoom || selectingDesk) && !isEditing;

  return (
    <>
      {shouldShowAction ? (
        <Flex
          className="absolute -translate-x-1/2 translate-y-1/2"
          style={{ left: `${x}%`, top: `${top}%`, zIndex }}
        >
          <Button
            className="border-none bg-neutral-700/70 hover:bg-neutral-700/60"
            icon={<Trash color={COLOR.neutral['0']} size="20" />}
            onClick={onOpenRemoveModal}
            size="small"
          />
        </Flex>
      ) : null}
      <Modal.Confirm
        description={removeModalDescription}
        mode="error"
        okText={t('common.button.remove')}
        onCancel={onCloseRemoveModal}
        onOk={handleRemoveItem}
        open={openRemoveModal}
        title={removeModalTitle}
      />
    </>
  );
}

export default FloorPlanItemAction;
