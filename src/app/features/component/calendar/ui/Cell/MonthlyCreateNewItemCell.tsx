import { Flex } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Add } from 'iconsax-react';

import { useMonthlyCalendarContext } from '@/app/features/component/calendar/context';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  startTime: Dayjs;
}

function MonthlyCreateNewItemCell({ startTime }: Props) {
  const { onCreateNewItem } = useMonthlyCalendarContext();

  return (
    <Flex
      className="hidden cursor-pointer px-[1px] pb-[1px] pt-0.5 group-hover:flex"
      onClick={() => onCreateNewItem?.(dayjs(startTime))}
    >
      <Flex
        align="center"
        className="w-full rounded-sm bg-secondaryLight px-1 py-1 shadow-card"
        justify="center"
      >
        <Flex
          align="center"
          className="h-4 w-4 rounded-full bg-primary"
          justify="center"
        >
          <Add color={COLOR.secondary} size="14" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MonthlyCreateNewItemCell;
