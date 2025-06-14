import { Form } from 'antd';
import type { TimeRangePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { OriginalFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card, Picker } from '@/shared/components';

function DatePickerFields() {
  const { t } = useTranslation();

  const [selectedStartDate, setSelectedStartDate] = useState(dayjs());

  const rangePresets: TimeRangePickerProps['presets'] = [
    {
      label: t('component.value.aWeek'),
      value: [selectedStartDate, selectedStartDate.add(1, 'week')],
    },
    {
      label: t('component.value.twoWeeks'),
      value: [selectedStartDate, selectedStartDate.add(2, 'week')],
    },
    {
      label: t('component.value.aMonth'),
      value: [selectedStartDate, selectedStartDate.add(1, 'month')],
    },
    {
      label: t('component.value.twoMonths'),
      value: [selectedStartDate, selectedStartDate.add(2, 'month')],
    },
    {
      label: t('component.value.aYear'),
      value: [selectedStartDate, selectedStartDate.add(1, 'year')],
    },
    {
      label: t('component.value.twoYears'),
      value: [selectedStartDate, selectedStartDate.add(2, 'year')],
    },
  ];

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.datePicker')}
          name="datePicker"
        >
          <Picker.Date />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.rangeDatePicker')}
          name="rangeDatePicker"
        >
          <Picker.RangeDate />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.presetPicker')}
          name="presetPicker"
        >
          <Picker.RangeDate
            onCalendarChange={dates => {
              if (dates?.[0]) {
                setSelectedStartDate(dates?.[0]);
              }

              if (dayjs(dayjs(dates?.[1])).isBefore(dayjs(dates?.[0]))) {
                return;
              }
            }}
            presets={rangePresets}
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.weekPicker')}
          name="weekPicker"
        >
          <Picker.Week showNow />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.monthPicker')}
          name="rangeTimePicker"
        >
          <Picker.Month />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.timePicker')}
          name="timePicker"
        >
          <Picker.Time />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.rangeTimePicker')}
          name="rangeTimePicker"
        >
          <Picker.RangeTime />
        </Form.Item>
      ),
      span: 8,
    },
  ];

  return (
    <Card.Grid grids={grids} title={t('component.title.datePickerFields')} />
  );
}

export default DatePickerFields;
