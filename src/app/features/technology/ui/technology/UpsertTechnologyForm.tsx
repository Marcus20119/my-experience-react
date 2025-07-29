import type { IconifyIcon } from '@iconify/react/dist/iconify.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Col,
  ColorPicker,
  Flex,
  Form,
  Image,
  Input,
  Radio,
  Rate,
  Row,
} from 'antd';
import type { Color } from 'antd/es/color-picker';
import type { FormInstance } from 'antd/lib';
import { useEffect, useState } from 'react';

import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { COLOR } from '@/shared/assets/styles/constants';
import { Field, Ticket } from '@/shared/components';
import { useWindowDimensions } from '@/shared/hooks';
import { IconType } from '@/shared/tanstack/api/technologies';
import { FileType } from '@/shared/types';
import { FileTool } from '@/shared/utils/file';

import { TechnologySectionSelect } from '../technology-section';
import { TechnologyTypeSelect } from '../technology-type';

const { splitFileUrl } = FileTool;

interface Props {
  form: FormInstance<UpsertTechnologyFormEntity>;
  onFinish?: (values: UpsertTechnologyFormEntity) => void;
}

function UpsertTechnologyForm({ form, onFinish }: Props) {
  const [showPreviewCard, setShowPreviewCard] = useState(false);

  const { width } = useWindowDimensions();
  const iconType = Form.useWatch('iconType', form);
  const technologyType = Form.useWatch('technologyType', form);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreviewCard(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Form<UpsertTechnologyFormEntity>
      form={form}
      initialValues={{
        iconType: IconType.Iconify,
      }}
      layout="vertical"
      onFinish={onFinish}
      size="middle"
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item<UpsertTechnologyFormEntity>
            label="Name ~"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter name ~" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<UpsertTechnologyFormEntity>
            label="Technology type ~"
            name="technologyType"
            rules={[{ required: true }]}
          >
            <TechnologyTypeSelect
              onChange={() => {
                form.resetFields(['technologySectionId']);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<UpsertTechnologyFormEntity>
            label="Technology section ~"
            name="technologySectionId"
          >
            <TechnologySectionSelect
              allowClear
              disabled={!technologyType}
              technologyType={technologyType}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Flex align="center" className="relative" gap="0.5rem">
            <Form.Item<UpsertTechnologyFormEntity>
              getValueFromEvent={(color: Color) => `#${color.toHex()}`}
              label="Colors ~"
              name="color1"
              rules={[{ required: true }]}
            >
              <ColorPicker />
            </Form.Item>
            <Form.Item<UpsertTechnologyFormEntity>
              className="absolute left-10 top-0"
              getValueFromEvent={(color: Color) => `#${color.toHex()}`}
              label=" "
              name="color2"
            >
              <ColorPicker />
            </Form.Item>

            <Form.Item<UpsertTechnologyFormEntity>
              className="absolute left-20 top-0"
              getValueFromEvent={(color: Color) => `#${color.toHex()}`}
              label=" "
              name="color3"
            >
              <ColorPicker />
            </Form.Item>
          </Flex>
        </Col>

        <Col span={12}>
          <Form.Item<UpsertTechnologyFormEntity>
            label="Icon type ~"
            name="iconType"
            rules={[{ required: true }]}
          >
            <Radio.Group
              options={[
                {
                  label: 'Iconify',
                  value: IconType.Iconify,
                },
                {
                  label: 'Custom ~',
                  value: IconType.Custom,
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<UpsertTechnologyFormEntity>
            hidden={iconType !== IconType.Iconify}
            label="Icon name ~"
            name="iconName"
            rules={[{ required: iconType === IconType.Iconify }]}
          >
            <Input placeholder="Enter icon ~" />
          </Form.Item>
          <Form.Item<UpsertTechnologyFormEntity>
            hidden={iconType !== IconType.Custom}
            label="Icon ~"
            name="iconFileKey"
            rules={[{ required: iconType === IconType.Custom }]}
          >
            <Field.UploadFile
              acceptTypes={[
                FileType.Svg,
                FileType.Png,
                FileType.Jpg,
                FileType.Jpeg,
                FileType.Gif,
              ]}
              maxFileSize={5}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<UpsertTechnologyFormEntity>
            label={'Description ~'}
            name="description"
          >
            <Input.TextArea placeholder="Enter description ~" rows={3} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<UpsertTechnologyFormEntity> label={'Rate ~'} name="rate">
            <Rate allowHalf />
          </Form.Item>
        </Col>
      </Row>

      {showPreviewCard ? (
        <Form.Item<UpsertTechnologyFormEntity> noStyle shouldUpdate>
          {({ getFieldsValue }) => {
            const values = getFieldsValue();
            return (
              <Flex
                className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
                style={{
                  animation: 'fadeIn 1s ease-out forwards',
                  left: (width - 600) / 2, // 600 is the width of the form
                }}
              >
                <Ticket.ThreeD
                  color1={values.color1 || COLOR.secondary}
                  color2={values.color2}
                  color3={values.color3}
                  description={values.description}
                  icon={
                    values.iconType === IconType.Custom &&
                    values.iconFileKey ? (
                      <Image
                        height="50"
                        src={splitFileUrl(values.iconFileKey).url}
                        width="50"
                      />
                    ) : (
                      <Icon
                        height="56"
                        icon={values.iconName as unknown as IconifyIcon}
                        width="56"
                      />
                    )
                  }
                  rate={values.rate}
                  title={values.name || 'Title'}
                />
              </Flex>
            );
          }}
        </Form.Item>
      ) : null}
    </Form>
  );
}

export default UpsertTechnologyForm;
