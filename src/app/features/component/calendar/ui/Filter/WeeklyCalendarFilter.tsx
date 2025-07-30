import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button, Flex, Form, Space } from 'antd';
import type { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import { Add, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useEffect, useRef } from 'react';

import type { MockWeeklyFilterEntity } from '@/app/features/component/calendar/model';
import { Picker } from '@/shared/components';

const { Compact } = Space;

interface Props {
  form: FormInstance<MockWeeklyFilterEntity>;
}

function WeeklyCalendarFilter({ form }: Props) {
  const navigate = useNavigate();
  const isSetInitialValues = useRef(false);
  const searchParams = useSearch({
    from: '/component/calendar/weekly',
  });

  const baseDate = Form.useWatch('baseDate', form);

  useEffect(() => {
    if (!isSetInitialValues.current) {
      const initialValues: MockWeeklyFilterEntity = {
        baseDate: dayjs(searchParams.baseDate || undefined),
      };

      form.setFieldsValue(initialValues);
      isSetInitialValues.current = true;
    }
  }, [form, searchParams.baseDate]);

  const onFinish = (values: MockWeeklyFilterEntity) => {
    navigate({
      replace: true,
      search: {
        baseDate: values.baseDate?.toISOString(),
      },
      to: '/component/calendar/weekly',
    });
  };

  return (
    <Flex align="center" justify="space-between">
      <Form<MockWeeklyFilterEntity> form={form} onFinish={onFinish}>
        <Compact>
          <Button
            className="border-neutral-400 hover:border-neutral-700"
            ghost
            icon={<ArrowLeft2 size="20" />}
            onClick={() => {
              form.setFields([
                {
                  name: 'baseDate',
                  value: baseDate?.subtract(1, 'week'),
                },
              ]);

              form.submit();
            }}
            size="middle"
          />
          <Form.Item<MockWeeklyFilterEntity> name="baseDate" noStyle>
            <Picker.Week onChange={form.submit} size="middle" />
          </Form.Item>
          <Button
            className="border-neutral-400 hover:border-neutral-700"
            ghost
            icon={<ArrowRight2 size="20" />}
            onClick={() => {
              form.setFields([
                {
                  name: 'baseDate',
                  value: baseDate?.add(1, 'week'),
                },
              ]);

              form.submit();
            }}
            size="middle"
          />
        </Compact>
      </Form>

      <Button icon={<Add />} size="middle" type="primary">
        {'Add event ~'}
      </Button>
    </Flex>
  );
}

export default WeeklyCalendarFilter;
