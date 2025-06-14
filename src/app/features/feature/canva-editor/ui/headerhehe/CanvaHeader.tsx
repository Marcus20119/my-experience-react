import { Icon } from '@iconify/react';
import { Button, ColorPicker, Flex } from 'antd';
import { DocumentDownload } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import {
  CANVA_SIZE,
  CanvaItemType,
  CanvaPaperType,
  CanvaShapeType,
  DEFAULT_FILL_COLOR,
  DEFAULT_STROKE_DISABLED_COLOR,
} from '@/app/features/feature/canva-editor/model';
import { cn } from '@/lib/tailwind';
import type { CompactActionEntity } from '@/shared/components';
import { Action, Select } from '@/shared/components';
import { FileTool } from '@/shared/utils/file';

import BorderPopover from './BorderPopover';
import CornerRoundingPopover from './CornerRoundingPopover';

const { downloadURI } = FileTool;

function CanvaHeader() {
  const { t } = useTranslation();
  const {
    isEditing,
    items,
    onUpdateItem,
    paperType,
    selectedItem,
    setPaperType,
    stageRef,
  } = useCanvaEditorContext();

  const isShape = selectedItem?.type === CanvaItemType.Shape;
  const isRect =
    isShape &&
    [CanvaShapeType.Rectangle, CanvaShapeType.Square].includes(
      selectedItem?.props.shapeType,
    );
  const isImage = selectedItem?.type === CanvaItemType.Image;

  const enabledCornerRadius = isRect || isImage;
  const enabledBorder = !!selectedItem;
  const enabledFillColor = isShape;
  const enabledDownload =
    !!stageRef && items?.length && !isEditing && !selectedItem;

  const actions = useMemo<CompactActionEntity[]>(
    () => [
      {
        element: (
          // Need Fragment to Tooltip work
          <>
            <ColorPicker
              disabled={!enabledBorder}
              onChange={color => {
                if (enabledBorder) {
                  onUpdateItem({
                    ...selectedItem,
                    strokeColor: color.toHexString(),
                  });
                }
              }}
              value={
                enabledBorder
                  ? selectedItem?.strokeColor
                  : DEFAULT_STROKE_DISABLED_COLOR
              }
            >
              <Button
                className={cn(
                  'flex w-8 items-center justify-center border-neutral-300',
                  !enabledBorder
                    ? 'cursor-not-allowed bg-neutral-100'
                    : 'cursor-pointer bg-neutral-0 hover:border-neutral-600 hover:bg-neutral-100',
                )}
                icon={
                  <Icon
                    color={
                      enabledBorder
                        ? selectedItem?.strokeColor
                        : DEFAULT_STROKE_DISABLED_COLOR
                    }
                    height="20"
                    icon="fa:circle-o"
                    width="20"
                  />
                }
              />
            </ColorPicker>
          </>
        ),
        label: t('feature.canva.label.borderColor'),
        type: 'custom',
      },
      {
        disabled: !enabledBorder,
        icon: <Icon height="20" icon="bi:border-width" width="20" />,
        label: t('feature.canva.label.border'),
        popover: <BorderPopover />,
        type: 'button',
      },
      {
        disabled: !enabledCornerRadius,
        icon: <Icon height="20" icon="proicons:corner-radius" width="20" />,
        label: t('feature.canva.label.cornerRounding'),
        popover: <CornerRoundingPopover />,
        type: 'button',
      },
      {
        element: (
          <ColorPicker
            className={cn(
              'flex w-8 items-center justify-center',
              !enabledFillColor
                ? 'bg-neutral-100'
                : 'bg-neutral-0 hover:border-neutral-600 hover:bg-neutral-100',
            )}
            disabled={!enabledFillColor}
            onChange={color => {
              if (enabledFillColor) {
                onUpdateItem({
                  ...selectedItem,
                  fill: color.toHexString(),
                });
              }
            }}
            value={enabledFillColor ? selectedItem?.fill : DEFAULT_FILL_COLOR}
          />
        ),
        label: t('feature.canva.label.shapeFill'),
        type: 'custom',
      },
      {
        element: (
          <Select<CanvaPaperType>
            className="w-40"
            onChange={(value: CanvaPaperType) => setPaperType(value)}
            options={[
              {
                label: t('feature.canva.paper.a4Horizontal'),
                value: CanvaPaperType.A4Horizontal,
              },
              {
                label: t('feature.canva.paper.a4Vertical'),
                value: CanvaPaperType.A4Vertical,
              },
              {
                label: t('feature.canva.paper.square'),
                value: CanvaPaperType.Square,
              },
            ]}
            value={paperType}
          />
        ),
        label: t('feature.canva.label.paperSize'),
        type: 'custom',
      },
      {
        disabled: !enabledDownload,
        icon: <DocumentDownload size="20" />,
        label: t('feature.canva.label.download'),
        onClick: () => {
          const dataURL = stageRef?.current?.toDataURL({ pixelRatio: 3 });

          if (dataURL) {
            downloadURI(dataURL, 'stage.png');
          }
        },
        type: 'button',
      },
    ],
    [
      enabledBorder,
      enabledCornerRadius,
      enabledDownload,
      enabledFillColor,
      onUpdateItem,
      paperType,
      selectedItem,
      setPaperType,
      stageRef,
      t,
    ],
  );

  return (
    <Flex
      align="center"
      className="w-full"
      justify="center"
      style={{
        height: CANVA_SIZE.headerHeight,
      }}
    >
      <Action.Compact actions={actions} />
    </Flex>
  );
}

export default CanvaHeader;
