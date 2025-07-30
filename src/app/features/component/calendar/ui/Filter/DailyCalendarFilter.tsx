import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button, Flex, Form, Space } from 'antd';
import type { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import { Add, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useEffect, useRef } from 'react';

import type { MockDailyFilterEntity } from '@/app/features/component/calendar/model';
import { Picker } from '@/shared/components';

const { Compact } = Space;

interface Props {
  form: FormInstance<MockDailyFilterEntity>;
}

function DailyCalendarFilter({ form }: Props) {
  const navigate = useNavigate();
  const isSetInitialValues = useRef(false);
  const searchParams = useSearch({
    from: '/component/calendar/daily',
  });

  const baseDate = Form.useWatch('baseDate', form);

  useEffect(() => {
    if (!isSetInitialValues.current) {
      const initialValues: MockDailyFilterEntity = {
        baseDate: dayjs(searchParams.baseDate || undefined),
      };

      form.setFieldsValue(initialValues);
      isSetInitialValues.current = true;
    }
  }, [form, searchParams.baseDate]);

  const onFinish = (values: MockDailyFilterEntity) => {
    navigate({
      replace: true,
      search: {
        baseDate: values.baseDate?.toISOString(),
      },
      to: '/component/calendar/daily',
    });
  };

  return (
    <Flex align="center" justify="space-between">
      <Form<MockDailyFilterEntity> form={form} onFinish={onFinish}>
        <Compact>
          <Button
            className="border-neutral-400 hover:border-neutral-700"
            ghost
            icon={<ArrowLeft2 size="20" />}
            onClick={() => {
              form.setFields([
                {
                  name: 'baseDate',
                  value: baseDate?.subtract(1, 'day'),
                },
              ]);

              form.submit();
            }}
            size="middle"
          />
          <Form.Item<MockDailyFilterEntity> name="baseDate" noStyle>
            <Picker.Date onChange={form.submit} size="middle" />
          </Form.Item>
          <Button
            className="border-neutral-400 hover:border-neutral-700"
            ghost
            icon={<ArrowRight2 size="20" />}
            onClick={() => {
              form.setFields([
                {
                  name: 'baseDate',
                  value: baseDate?.add(1, 'day'),
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

export default DailyCalendarFilter;
