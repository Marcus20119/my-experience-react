import { Icon } from '@iconify/react/dist/iconify.js';
import { Flex, Menu, Tooltip, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { ArrowDown2, ArrowUp2, FormatSquare, TickCircle } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { COLOR } from '@/shared/assets/styles/constants';

import { useFloorPlanEditorContext } from '../context';

const { Paragraph } = Typography;

function RoomMenu() {
  const { t } = useTranslation();
  const { draggingRoomId, rooms, setDraggingRoomId, setSelectingRoom } =
    useFloorPlanEditorContext();

  const menuItems: ItemType[] = useMemo(() => {
    const items: ItemType[] = rooms?.map(room => ({
      children: room?.desks?.map(desk => ({
        disabled: !room?.shape,
        key: desk.id,
        label: (
          <Flex align="center" gap="0.5rem" justify="space-between">
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
              <Icon height="20" icon="@local:pick-point" width="20" />
            </Flex>
          </Flex>
        ),
      })),
      expandIcon: ({ isOpen }) => {
        if (isOpen) {
          return <ArrowDown2 size="16" />;
        }

        return <ArrowUp2 size="16" />;
      },
      key: room.id,
      label: (
        <Flex align="center" gap="0.5rem" justify="space-between">
          <Paragraph
            className="mb-0 font-semibold"
            ellipsis={{
              rows: 1,
              tooltip: true,
            }}
          >
            {room.name}
          </Paragraph>
          <Flex gap="0.5rem">
            {room?.shape ? (
              <TickCircle color={COLOR.system.success} size="20" />
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
  }, [draggingRoomId, rooms, setDraggingRoomId, setSelectingRoom, t]);

  return <Menu items={menuItems} mode="inline" />;
}

export default RoomMenu;
