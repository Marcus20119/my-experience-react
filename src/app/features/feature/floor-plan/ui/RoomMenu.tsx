import { Icon } from '@iconify/react/dist/iconify.js';
import { Flex, Menu, Spin, Tooltip, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { ArrowDown2, ArrowUp2, FormatSquare, InfoCircle } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';

import { useFloorPlanEditorContext } from '../context';
import { FLOOR_PLAN_EDITOR_SIZE } from '../model';

const { Paragraph, Text } = Typography;

function Status({ isOverlapped }: { isOverlapped?: boolean }) {
  if (isOverlapped) {
    return <InfoCircle color={COLOR.system.error} size="20" />;
  }

  return (
    <Icon
      className="scale-110"
      color={COLOR.system.success}
      height="20"
      icon="qlementine-icons:check-tick-24"
      width="20"
    />
  );
}

function ExpandIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? (
    <ArrowUp2 color={COLOR.neutral['550']} size="16" />
  ) : (
    <ArrowDown2 color={COLOR.neutral['550']} size="16" />
  );
}

function RoomMenu() {
  const { t } = useTranslation();
  const {
    allowEdit,
    draggingRoomId,
    floorPlanImage,
    getDataLoading,
    pickingDeskId,
    rooms,
    selectingDesk,
    selectingRoom,
    setDraggingRoomId,
    setPickingDeskId,
    setSelectingDesk,
    setSelectingRoom,
    workspaceSize,
  } = useFloorPlanEditorContext();

  const isDeskExists = useMemo(
    () =>
      !!rooms
        ?.flatMap(room => room.desks)
        ?.filter(desk => desk?.shape)
        ?.filter(Boolean)?.length,
    [rooms],
  );

  const menuItems: ItemType[] = useMemo(() => {
    const items: ItemType[] = rooms?.map(room => {
      const disabledDragRoom = !floorPlanImage;
      const disabledRoomItem = !room?.desks?.length && !floorPlanImage;
      const isRoomMapped = !!room?.shape;

      const pickedDesks = room?.desks?.filter(desk => desk?.shape);

      return {
        children: room?.desks?.length
          ? room?.desks?.map(desk => {
              const disabledDesk =
                !room?.shape ||
                room?.shape?.isOverlapped ||
                !floorPlanImage ||
                !allowEdit;
              const isDeskMapped = !!desk?.shape;

              return {
                className: selectingDesk?.id === desk.id ? 'active-desk' : '',
                disabled: disabledDesk,
                key: desk.id,
                label: (
                  <Flex
                    align="center"
                    className="h-9 pl-4"
                    gap="0.5rem"
                    justify="space-between"
                    onClick={e => {
                      if (isDeskMapped && allowEdit) {
                        e.stopPropagation();
                        setSelectingDesk(desk);
                        setSelectingRoom(null);
                        setPickingDeskId(null);
                        setDraggingRoomId(null);
                      }
                    }}
                  >
                    <Paragraph
                      className="mb-0 text-sm font-semibold"
                      ellipsis={{
                        rows: 1,
                        tooltip: true,
                      }}
                    >
                      {desk.name}
                    </Paragraph>
                    <Flex gap="0.5rem">
                      {isDeskMapped ? (
                        <Status isOverlapped={desk?.shape?.isDuplicated} />
                      ) : (
                        <Tooltip
                          title={
                            !disabledDesk
                              ? t('feature.floorPlan.button.pickDesk')
                              : undefined
                          }
                        >
                          <Flex
                            className="hover:opacity-85"
                            onClick={e => {
                              e.stopPropagation();

                              if (disabledDesk) return;

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
            })
          : undefined,
        className: cn(selectingRoom?.id === room.id ? 'active-room' : ''),
        disabled: disabledRoomItem,
        expandIcon: ExpandIcon,
        key: room.id,
        label: (
          <Flex
            align="center"
            className={cn(
              'h-9',
              room?.desks?.length ? '' : 'pr-5',
              !isDeskExists ? 'pr-0' : '',
            )}
            gap="0.25rem"
            justify="space-between"
            onClick={e => {
              if (isRoomMapped && allowEdit) {
                e.stopPropagation();
                setSelectingRoom(room);
                setSelectingDesk(null);
                setPickingDeskId(null);
                setDraggingRoomId(null);
              }
            }}
          >
            <Flex align="center" gap="0.25rem">
              <Icon
                color={
                  room.isActive ? COLOR.system.success : COLOR.system.alert
                }
                height="12"
                icon="icon-park-outline:dot"
                width="12"
              />
              <Paragraph
                className="mb-0 w-[5.125rem] font-semibold"
                ellipsis={{
                  rows: 1,
                  tooltip: true,
                }}
              >
                {room?.name}
              </Paragraph>
            </Flex>
            <Flex align="center" gap="0.5rem">
              {room?.desks?.length ? (
                <Text className="text-sm leading-none text-system-disable">
                  {pickedDesks?.length}/{room?.desks?.length}
                </Text>
              ) : null}

              {isRoomMapped ? (
                <Status isOverlapped={room?.shape?.isOverlapped} />
              ) : (
                <Tooltip
                  title={
                    !disabledDragRoom && allowEdit
                      ? t('feature.floorPlan.button.dragRoom')
                      : undefined
                  }
                >
                  <FormatSquare
                    className={cn(
                      !disabledDragRoom && allowEdit
                        ? 'hover:opacity-85'
                        : 'cursor-not-allowed',
                    )}
                    color={
                      draggingRoomId === room.id
                        ? COLOR.system.success
                        : COLOR.system.disable
                    }
                    onClick={e => {
                      if (disabledDragRoom || !allowEdit) return;

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
      };
    });

    return items;
  }, [
    allowEdit,
    draggingRoomId,
    floorPlanImage,
    isDeskExists,
    pickingDeskId,
    rooms,
    selectingDesk?.id,
    selectingRoom?.id,
    setDraggingRoomId,
    setPickingDeskId,
    setSelectingDesk,
    setSelectingRoom,
    t,
  ]);

  const mappedRooms = rooms?.filter(room => room?.shape);

  return (
    <Spin spinning={getDataLoading}>
      {rooms?.length ? (
        <Flex className="w-full" vertical>
          <Text className="block p-3 text-base text-neutral-550">{`${mappedRooms?.length}/${rooms?.length} ${t('feature.floorPlan.label.mappedRooms').toLowerCase()}`}</Text>
          <div
            className="overflow-y-auto"
            style={{
              height: workspaceSize.height - FLOOR_PLAN_EDITOR_SIZE.padding * 4,
            }}
          >
            <Menu items={menuItems} mode="inline" selectable={false} />
          </div>
        </Flex>
      ) : (
        <Flex align="center" className="w-full px-6 py-8" vertical>
          <Text className="-translate-y-2 text-center text-base font-normal text-neutral-550">
            {t('feature.floorPlan.description.notAvailable')}
          </Text>
        </Flex>
      )}
    </Spin>
  );
}

export default RoomMenu;
