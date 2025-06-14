import { ColorPicker, Form, Rate, Slider } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { useTranslation } from 'react-i18next';

import type { OriginalFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card } from '@/shared/components';
import { NumberTool } from '@/shared/utils';

const MIN_PRICE = 0;
const MAX_PRICE = 5000000;

const { formatMoney } = NumberTool;

function OtherFields() {
  const { t } = useTranslation();

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.slider')}
          name="slider"
        >
          <Slider
            marks={{
              [0]: '0°C',
              [20]: '20°C',
              [40]: '40°C',
              [60]: '60°C',
              [80]: '80°C',
              [100]: '100°C',
            }}
          />
        </Form.Item>
      ),
      span: 12,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.sliderRange')}
          name="sliderRange"
        >
          <Slider
            marks={{
              [MAX_PRICE]: {
                label: formatMoney(MAX_PRICE),
                style: {
                  marginTop: '1rem',
                  transform: 'translateX(-95%)',
                  whiteSpace: 'nowrap',
                },
              },
              [MIN_PRICE]: {
                label: formatMoney(MIN_PRICE),
                style: {
                  marginTop: '1rem',
                  transform: 'translateX(-25%)',
                  whiteSpace: 'nowrap',
                },
              },
            }}
            max={MAX_PRICE}
            min={MIN_PRICE}
            range
            step={100000}
            tooltip={{
              formatter: total => formatMoney(total),
            }}
          />
        </Form.Item>
      ),
      span: 12,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.rate')}
          name="rate"
        >
          <Rate allowHalf />
        </Form.Item>
      ),
      span: 12,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          getValueFromEvent={(color: Color) => `#${color.toHex()}`}
          label={t('component.label.colorPicker')}
          name="colorPicker"
        >
          <ColorPicker />
        </Form.Item>
      ),
      span: 12,
    },
  ];

  return <Card.Grid grids={grids} title={t('component.title.otherFields')} />;
}

export default OtherFields;
