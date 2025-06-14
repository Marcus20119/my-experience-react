import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useDailyCalendarContext } from '@/app/features/component/calendar/context';
import { getDayOfWeekTitle } from '@/app/features/component/calendar/lib';

const { Text } = Typography;

function DailyTitleCell() {
  const { baseDate } = useDailyCalendarContext();

  const dayOfWeekTitle = useMemo(
    () => getDayOfWeekTitle(dayjs(baseDate).day()),
    [baseDate],
  );

  return (
    <Flex
      align="end"
      className="h-full cursor-default px-2 py-2"
      justify="space-between"
    >
      <Text className="line-clamp-1 text-xs font-semibold uppercase text-neutral-500">
        {dayOfWeekTitle}
      </Text>
      <Text className="text-primaryText flex-shrink-0 text-center text-lg font-semibold leading-8">
        {dayjs(baseDate).format('DD/MM/YYYY')}
      </Text>
    </Flex>
  );
}

export default DailyTitleCell;
