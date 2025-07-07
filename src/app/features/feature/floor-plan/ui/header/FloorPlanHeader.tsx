import { Flex } from 'antd';

import { FLOOR_PLAN_SIZE } from '@/app/features/feature/floor-plan/model';

function FloorPlanHeader() {
  return (
    <Flex
      align="center"
      className="w-full px-4"
      justify="space-between"
      style={{
        height: FLOOR_PLAN_SIZE.headerHeight,
      }}
    >
      hehe
    </Flex>
  );
}

export default FloorPlanHeader;
