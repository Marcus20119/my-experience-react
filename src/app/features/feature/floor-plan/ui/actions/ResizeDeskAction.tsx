import { Flex, Image, Slider } from 'antd';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import {
  FLOOR_PLAN_EDITOR_SIZE,
  MAX_DESK_SIZE,
  MIN_DESK_SIZE,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  zIndex: number;
}

function ResizeDeskAction({ zIndex }: Props) {
  const { deskSize, handleChangeDeskSize } = useFloorPlanEditorContext();

  return (
    <Flex
      align="center"
      className="absolute h-8 w-fit rounded-md border border-solid border-neutral-200 bg-neutral-0 pl-1 pr-2"
      justify="space-between"
      onMouseDown={e => {
        e.stopPropagation();
      }}
      style={{
        boxShadow: `0px 0px 12px ${COLOR.neutral['700']}30`,
        left:
          FLOOR_PLAN_EDITOR_SIZE.roomMenuWidth +
          FLOOR_PLAN_EDITOR_SIZE.padding +
          8,
        top: 8,
        zIndex,
      }}
    >
      <Flex align="center" gap="0.5rem">
        <Slider
          className="w-[7.5rem]"
          max={MAX_DESK_SIZE}
          min={MIN_DESK_SIZE}
          onChange={handleChangeDeskSize}
          step={1}
          tooltip={{
            open: false,
          }}
          value={deskSize}
        />

        <Image
          className="block flex-shrink-0 rounded-full object-cover"
          height={24}
          preview={false}
          src="svgs/desk.svg"
          style={{
            boxShadow: `0px 0px 6px ${COLOR.neutral['600']}50`,
          }}
          width={24}
        />
      </Flex>
    </Flex>
  );
}

export default ResizeDeskAction;
