import { Button, Flex, InputNumber, Slider, Tooltip } from 'antd';
import { Maximize2 } from 'iconsax-react';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { CANVA_SIZE } from '@/app/features/feature/canva-editor/model';

function CanvaFooter() {
  const { setZoomLevel, zoomLevel } = useCanvaEditorContext();

  const roundedZoomLevel = Math.round(zoomLevel * 100);

  const onSetZoomLevel = (value?: null | number) => {
    setZoomLevel((value ?? 1) / 100);
  };

  return (
    <Flex
      align="center"
      className="w-full px-4"
      justify="end"
      style={{
        height: CANVA_SIZE.footerHeight,
      }}
    >
      <Flex align="center" gap="0.75rem">
        <Tooltip title="Fit to screen">
          <Button
            icon={<Maximize2 size="20" />}
            onClick={() => {
              setZoomLevel(1);
            }}
          />
        </Tooltip>
        <Slider
          className="w-48"
          max={300}
          min={30}
          onChange={onSetZoomLevel}
          step={1}
          tooltip={{
            open: false,
          }}
          value={roundedZoomLevel}
        />

        <InputNumber
          addonAfter="%"
          className="w-20"
          controls={false}
          max={300}
          min={30}
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

export default CanvaFooter;
