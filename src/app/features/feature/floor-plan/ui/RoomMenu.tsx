import { Icon } from '@iconify/react/dist/iconify.js';
import { Flex, Menu, Tooltip, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import {
  ArrowDown2,
  ArrowUp2,
  CloseCircle,
  FormatSquare,
  TickCircle,
} from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { COLOR } from '@/shared/assets/styles/constants';

import { useFloorPlanEditorContext } from '../context';

const { Paragraph } = Typography;

function Status({ isOverlapped }: { isOverlapped?: boolean }) {
  if (isOverlapped) {
    return <CloseCircle color={COLOR.system.error} size="20" />;
  }

  return <TickCircle color={COLOR.system.success} size="20" />;
}

function RoomMenu() {
  const { t } = useTranslation();
  const {
    draggingRoomId,
    pickingDeskId,
    rooms,
    setDraggingRoomId,
    setPickingDeskId,
    setSelectingDesk,
    setSelectingRoom,
  } = useFloorPlanEditorContext();

  const menuItems: ItemType[] = useMemo(() => {
    const items: ItemType[] = rooms?.map(room => ({
      children: room?.desks?.map(desk => {
        const disabled = !room?.shape || room?.shape?.isOverlapped;

        return {
          disabled,
          key: desk.id,
          label: (
            <Flex
              align="center"
              className="pl-5"
              gap="0.5rem"
              justify="space-between"
            >
              <Paragraph
                className="mb-0"
                ellipsis={{
                  rows: 1,
                  tooltip: true,
                }}
              >
                {desk.name}
              </Paragraph>
              <Flex gap="0.5rem">
                {desk?.shape ? (
                  <Status isOverlapped={desk?.shape?.isOverlapped} />
                ) : (
                  <Tooltip
                    title={
                      !disabled
                        ? t('feature.floorPlan.button.pickDesk')
                        : undefined
                    }
                  >
                    <Flex
                      className="hover:opacity-85"
                      onClick={e => {
                        e.stopPropagation();

                        if (disabled) return;

                        if (pickingDeskId === desk.id) {
                          setPickingDeskId(null);
                        } else {
                          setPickingDeskId(desk.id);
                        }

                        setDraggingRoomId(null);
                        setSelectingRoom(null);
                        setSelectingDesk(null);
                      }}
                    >
                      <Icon
                        height="20"
                        icon={
                          pickingDeskId === desk.id
                            ? '@local:pick-point-active'
                            : '@local:pick-point-default'
                        }
                        width="20"
                      />
                    </Flex>
                  </Tooltip>
                )}
              </Flex>
            </Flex>
          ),
        };
      }),
      expandIcon: ({ isOpen }) => {
        if (isOpen) {
          return <ArrowDown2 size="16" />;
        }

        return <ArrowUp2 size="16" />;
      },
      key: room.id,
      label: (
        <Flex align="center" gap="0.5rem" justify="space-between">
          <Flex align="center" gap="0.5rem">
            <Icon
              color={
                room.isActive ? COLOR.system.success : COLOR.neutral['400']
              }
              height="12"
              icon="icon-park-outline:dot"
              width="12"
            />
            <Paragraph
              className="mb-0 font-semibold"
              ellipsis={{
                rows: 1,
                tooltip: true,
              }}
            >
              {room.name}
            </Paragraph>
          </Flex>
          <Flex gap="0.5rem">
            {room?.shape ? (
              <Status isOverlapped={room?.shape?.isOverlapped} />
            ) : (
              <Tooltip title={t('feature.floorPlan.button.dragRoom')}>
                <FormatSquare
                  className="hover:opacity-85"
                  color={
                    draggingRoomId === room.id
                      ? COLOR.system.alert
                      : COLOR.neutral['700']
                  }
                  onClick={e => {
                    e.stopPropagation();

                    if (draggingRoomId === room.id) {
                      setDraggingRoomId(null);
                    } else {
                      setDraggingRoomId(room.id);
                    }

                    setSelectingRoom(null);
                    setPickingDeskId(null);
                    setSelectingDesk(null);
                  }}
                  size="20"
                />
              </Tooltip>
            )}
          </Flex>
        </Flex>
      ),
    }));

    return items;
  }, [
    draggingRoomId,
    pickingDeskId,
    rooms,
    setDraggingRoomId,
    setPickingDeskId,
    setSelectingDesk,
    setSelectingRoom,
    t,
  ]);

  return <Menu items={menuItems} mode="inline" selectable={false} />;
}

export default RoomMenu;
