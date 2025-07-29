import { Flex, InputNumber, Slider, Tooltip } from 'antd';
import type { valueType } from 'antd/es/statistic/utils';
import { Maximize2 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import {
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  zIndex: number;
  zoomLevel: number;
}

function ZoomAction({ setZoomLevel, zIndex, zoomLevel }: Props) {
  const { t } = useTranslation();
  const roundedZoomLevel = Math.round(zoomLevel * 100);

  const onSetZoomLevel = (value?: null | number | valueType) => {
    setZoomLevel(Number(value ?? 1) / 100);
  };

  return (
    <Flex
      align="center"
      className="absolute h-[2.125rem] w-fit rounded-md border border-solid border-neutral-200 bg-neutral-0 pl-2 pr-1 transition-all"
      justify="end"
      onMouseDown={e => {
        e.stopPropagation();
      }}
      style={{
        bottom: zoomLevel <= 1 ? 8 : 12,
        boxShadow: `0px 0px 12px ${COLOR.neutral['700']}30`,
        right: zoomLevel <= 1 ? 8 : 12,
        zIndex,
      }}
    >
      <Flex align="center" gap="0.25rem">
        <Tooltip title={t('feature.floorPlan.button.fitToScreen')}>
          <Maximize2
            className="cursor-pointer hover:opacity-80"
            onClick={() => {
              setZoomLevel(1);
            }}
            size="20"
          />
        </Tooltip>
        <Slider
          className="w-48"
          max={MAX_ZOOM_LEVEL * 100}
          min={MIN_ZOOM_LEVEL * 100}
          onChange={onSetZoomLevel}
          step={1}
          tooltip={{
            open: false,
          }}
          value={roundedZoomLevel}
        />

        <InputNumber
          addonAfter="%"
          className="input-xs w-[4.5rem]"
          controls={false}
          max={MAX_ZOOM_LEVEL * 100}
          min={MIN_ZOOM_LEVEL * 100}
          onChange={onSetZoomLevel}
          precision={0}
          size="small"
          step={1}
          value={roundedZoomLevel}
        />
      </Flex>
    </Flex>
  );
}

export default ZoomAction;
