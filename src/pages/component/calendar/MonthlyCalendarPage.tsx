import { Flex, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import type {
  MockMonthlyCalendarEntity,
  MockMonthlyFilterEntity,
} from '@/app/features/component/calendar';
import {
  DayOfWeek,
  formatRangeDate,
  mockMonthlyData,
  MonthlyCalendar,
  MonthlyCalendarFilter,
} from '@/app/features/component/calendar';
import { useHeaderStore } from '@/app/features/header';
import { CalendarLayout } from '@/app/layout';
import { cn } from '@/lib/tailwind';
import { SPACING } from '@/shared/assets/styles/constants';
import { Modal, Value } from '@/shared/components';
import { useCalculateElementSize, useToggle } from '@/shared/hooks';

const { Paragraph, Text, Title } = Typography;

function MonthlyCalendarPage() {
  const { getHeaderHeight } = useHeaderStore();
  const { height } = useCalculateElementSize({
    heightOffset: getHeaderHeight() + SPACING.contentPadding * 2 + 58 + 50, // 58 - filter height, 50 - header height
  });
  const {
    onClose: onCloseDetail,
    onOpen: onOpenDetail,
    open: openDetail,
  } = useToggle();

  const [selectedItem, setSelectedItem] = useState<MockMonthlyCalendarEntity>();

  const [form] = Form.useForm<MockMonthlyFilterEntity>();

  const baseDate = Form.useWatch('baseDate', form);

  return (
    <CalendarLayout
      route={{
        path: '/component/calendar/monthly',
      }}
    >
      <Flex gap="1rem" vertical>
        <MonthlyCalendarFilter form={form} />
        <MonthlyCalendar<MockMonthlyCalendarEntity>
          baseDate={baseDate}
          dataSource={mockMonthlyData}
          disabledCell={[
            {
              dayOfWeek: DayOfWeek.Sunday,
              type: 'dayOfWeek',
            },
          ]}
          itemRender={(item, { groupCount, mode }) => (
            <Flex
              className={cn(
                'h-full w-full',
                mode === 'in-calendar'
                  ? 'rounded-sm px-1 py-0.5 shadow-md'
                  : 'rounded-md px-2 py-1',
              )}
              style={{
                backgroundColor: item.color,
              }}
              vertical
            >
              {mode === 'in-popover' ? (
                <Text>
                  {groupCount > 2
                    ? dayjs(item.startTime).format('H:mm')
                    : `${dayjs(item.startTime).format('H:mm')} - ${dayjs(item.endTime).format('H:mm')}`}
                </Text>
              ) : null}
              <Title
                className={cn(
                  'text-sm',
                  height < 160 && 'line-clamp-3',
                  height < 120 && 'line-clamp-2',
                  height < 80 && 'line-clamp-1',
                )}
                level={3}
              >
                {item.title}
              </Title>
              {mode === 'in-popover' ? (
                <Paragraph className="text-xs">{item.description}</Paragraph>
              ) : null}
            </Flex>
          )}
          maxItemShowPerGroup={3}
          onClickItem={item => {
            setSelectedItem(item);
            onOpenDetail();
          }}
          onCreateNewItem={startTime => {
            console.log(startTime);
          }}
          scroll={{ x: 'max-content', y: height }}
        />
      </Flex>
      <Modal.CalendarItem
        color={selectedItem?.color}
        onCancel={() => {
          onCloseDetail();
          setSelectedItem(undefined);
        }}
        open={openDetail}
        title={selectedItem?.title}
      >
        <Value.List
          value={[
            formatRangeDate({
              endTime: selectedItem?.endTime,
              startTime: selectedItem?.startTime,
            }),
            selectedItem?.description,
          ]}
        />
      </Modal.CalendarItem>
    </CalendarLayout>
  );
}

export default MonthlyCalendarPage;
