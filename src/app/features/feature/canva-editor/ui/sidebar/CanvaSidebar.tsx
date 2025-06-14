import { ConfigProvider, Flex, Tooltip, Typography } from 'antd';
import { Gallery, Shapes1, Text as TextIC } from 'iconsax-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CANVA_COLOR,
  CANVA_SIZE,
} from '@/app/features/feature/canva-editor/model';
import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';

import ImageSection from './ImageSection';
import ShapeSection from './ShapeSection';

const { Text } = Typography;

enum CanvaActionTabKey {
  Image = 'image',
  Shape = 'shape',
  Text = 'text',
}

interface CanvaActionTab {
  children?: React.ReactNode;
  color: string;
  icon: React.ReactNode;
  key: CanvaActionTabKey;
  label: string;
}

function CanvaSidebar() {
  const { t } = useTranslation();

  const [activeTabKey, setActiveTabKey] = useState<CanvaActionTabKey>(
    CanvaActionTabKey.Image,
  );

  const tabs: CanvaActionTab[] = [
    {
      children: <ImageSection />,
      color: CANVA_COLOR.image,
      icon: <Gallery size="28" variant="Bulk" />,
      key: CanvaActionTabKey.Image,
      label: 'Image',
    },
    {
      children: <ShapeSection />,
      color: CANVA_COLOR.shape,
      icon: <Shapes1 size="28" variant="Bulk" />,
      key: CanvaActionTabKey.Shape,
      label: 'Shape',
    },
    {
      color: CANVA_COLOR.text,
      icon: <TextIC size="28" variant="Bulk" />,
      key: CanvaActionTabKey.Text,
      label: 'Text',
    },
  ];

  const activeTab = tabs.find(tab => tab.key === activeTabKey);

  return (
    <Flex className="h-full w-full">
      <Flex
        style={{
          width: CANVA_SIZE.actionBarWidth,
        }}
        vertical
      >
        {tabs.map(tab => {
          const isActive = tab.key === activeTabKey;
          const disabled = !tab.children;

          return (
            <Tooltip
              key={tab.key}
              open={tab.children ? false : undefined}
              placement="right"
              title={t('common.tooltip.comingSoon')}
            >
              <Flex
                align="center"
                className={cn(
                  'rounded-l-lg py-2 pl-3 transition-all duration-300 ease-in-out',
                  disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
                gap="0.125rem"
                onClick={() => {
                  if (disabled) return;
                  setActiveTabKey(tab.key);
                }}
                vertical
              >
                <div
                  className={cn(
                    'rounded-lg p-0.5',
                    isActive ? 'shadow-card-lg' : '',
                  )}
                  style={{
                    color: isActive ? tab.color : COLOR.neutral['400'],
                  }}
                >
                  {tab.icon}
                </div>
                <Text className="text-xs">{tab.label}</Text>
              </Flex>
            </Tooltip>
          );
        })}
      </Flex>
      <Flex
        className="h-full flex-1"
        style={{
          paddingBottom: CANVA_SIZE.sidebarSectionSpace,
          paddingTop: CANVA_SIZE.sidebarSectionSpace,
        }}
        vertical
      >
        <ConfigProvider
          theme={{
            components: {
              ['Button']: {
                colorTextBase: COLOR.neutral['0'],
                colorTextLightSolid: COLOR.neutral['0'],
                primaryColor: COLOR.neutral['0'],
              },
            },
            token: {
              colorPrimary: CANVA_COLOR.image,
            },
          }}
        >
          {activeTab?.children}
        </ConfigProvider>
      </Flex>
    </Flex>
  );
}

export default CanvaSidebar;
