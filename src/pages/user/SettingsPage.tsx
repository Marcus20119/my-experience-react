import { Col, Divider, Flex, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { ChangeLanguage } from '@/app/features/settings/change-language';
import { ContentLayout } from '@/app/layout';

const { Text, Title } = Typography;

interface SettingItem {
  children?: React.ReactNode;
  description: string;
  key: string;
  title: string;
}

function SettingsPage() {
  const { t } = useTranslation();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.system'),
    },
    {
      title: t('layout.title.settings'),
    },
  ];

  const settingItems: SettingItem[] = [
    {
      children: <ChangeLanguage />,
      description: 'Change the language of the website',
      key: 'language',
      title: 'Language',
    },
    {
      children: <div>Appearance</div>,
      description:
        'Change the appearance of the website like color, logo, etc.',
      key: 'appearance',
      title: 'Appearance',
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.settings')}>
      {settingItems.map((item, index) => (
        <Row key={index}>
          {index ? (
            <Col className="px-6" span={24}>
              <Divider className="mt-10 border-neutral-200" />
            </Col>
          ) : null}
          <Col span={8}>
            <Flex vertical>
              <Title className="text-lg font-bold" level={2}>
                {item.title}
              </Title>
              <Text className="text-neutral-500">{item.description}</Text>
            </Flex>
          </Col>
          <Col span={16}>{item.children}</Col>
        </Row>
      ))}
    </ContentLayout>
  );
}

export default SettingsPage;
