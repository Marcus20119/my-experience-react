import { Icon } from '@iconify/react';
import { Col, Flex, InputNumber, Row, Slider, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { CanvaStrokeType } from '@/app/features/feature/canva-editor/model';
import { cn } from '@/lib/tailwind';

const { Text } = Typography;

function BorderPopover() {
  const { t } = useTranslation();
  const { onUpdateItem, selectedItem } = useCanvaEditorContext();

  const onUpdateBorderWeight = useCallback(
    (value: null | number) => {
      onUpdateItem({
        ...selectedItem,
        strokeType: !value
          ? CanvaStrokeType.None
          : selectedItem?.strokeType ?? CanvaStrokeType.Solid,
        strokeWidth: value ?? 0,
      });
    },
    [onUpdateItem, selectedItem],
  );

  const onUpdateStrokeType = useCallback(
    (type: CanvaStrokeType) => {
      onUpdateItem({
        ...selectedItem,
        strokeType: type,
        strokeWidth:
          type === CanvaStrokeType.None ? 0 : selectedItem?.strokeWidth || 1,
      });
    },
    [onUpdateItem, selectedItem],
  );

  const borderTypes = useMemo<
    {
      active?: boolean;
      type: CanvaStrokeType;
      icon: React.ReactNode;
    }[]
  >(
    () => [
      {
        active:
          !selectedItem?.strokeType ||
          selectedItem?.strokeType === CanvaStrokeType.None,
        icon: <Icon height="20" icon="ic:sharp-block" width="20" />,
        type: CanvaStrokeType.None,
      },
      {
        active: selectedItem?.strokeType === CanvaStrokeType.Solid,
        icon: <Icon height="20" icon="radix-icons:border-solid" width="20" />,
        type: CanvaStrokeType.Solid,
      },
      {
        active: selectedItem?.strokeType === CanvaStrokeType.Dashed,
        icon: <Icon height="20" icon="radix-icons:border-dashed" width="20" />,
        type: CanvaStrokeType.Dashed,
      },
      {
        active: selectedItem?.strokeType === CanvaStrokeType.Dotted,
        icon: <Icon height="20" icon="radix-icons:border-dotted" width="20" />,
        type: CanvaStrokeType.Dotted,
      },
    ],
    [selectedItem?.strokeType],
  );

  return (
    <Flex gap="0.25rem" vertical>
      <Row gutter={8}>
        {borderTypes?.map(({ active, icon, type }) => (
          <Col key={type} span={6}>
            <Flex
              align="center"
              className={cn(
                'h-9 cursor-pointer rounded-md border-2 border-solid transition-colors hover:opacity-90',
                active
                  ? 'border-primary bg-secondaryLight'
                  : 'border-neutral-300',
              )}
              justify="center"
              onClick={() => {
                onUpdateStrokeType(type);
              }}
            >
              {icon}
            </Flex>
          </Col>
        ))}
      </Row>
      <Flex gap="0.25rem" vertical>
        <Text>{t('feature.canva.label.borderWeight')}</Text>
        <Flex align="center" gap="0.75rem">
          <Slider
            className="w-48"
            max={100}
            min={0}
            onChange={onUpdateBorderWeight}
            step={1}
            tooltip={{
              open: false,
            }}
            value={selectedItem?.strokeWidth ?? 0}
          />
          <InputNumber
            className="w-12"
            controls={false}
            max={100}
            min={0}
            onChange={onUpdateBorderWeight}
            precision={0}
            size="small"
            step={1}
            value={selectedItem?.strokeWidth ?? 0}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BorderPopover;
