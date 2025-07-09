import { Flex, Image, InputNumber, Slider } from 'antd';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import {
  FLOOR_PLAN_SIZE,
  MAX_DESK_SIZE,
  MIN_DESK_SIZE,
} from '@/app/features/feature/floor-plan/model';

function FloorPlanHeader() {
  const { deskSize, setDeskSize } = useFloorPlanEditorContext();

  return (
    <Flex
      align="center"
      className="w-full px-4"
      justify="space-between"
      style={{
        height: FLOOR_PLAN_SIZE.headerHeight,
      }}
    >
      <Flex align="center" gap="0.75rem">
        <Image
          className="flex-shrink-0 rounded-full"
          height={36}
          preview={false}
          src="/images/desk.png"
          width={36}
        />
        <Slider
          className="w-48"
          max={MAX_DESK_SIZE}
          min={MIN_DESK_SIZE}
          onChange={setDeskSize}
          step={1}
          tooltip={{
            open: false,
          }}
          value={deskSize}
        />

        <InputNumber
          addonAfter="px"
          className="w-20"
          controls={false}
          max={MAX_DESK_SIZE}
          min={MIN_DESK_SIZE}
          onChange={value => setDeskSize(Number(value))}
          precision={0}
          size="small"
          step={1}
          value={deskSize}
        />
      </Flex>
    </Flex>
  );
}

export default FloorPlanHeader;
