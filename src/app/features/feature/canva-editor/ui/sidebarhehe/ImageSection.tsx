import { Icon } from '@iconify/react';
import { Button, Col, Flex, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { CANVA_SIZE } from '@/app/features/feature/canva-editor/model';

import Item from '../items';

function ImageSection() {
  const { t } = useTranslation();
  const { asset, height } = useCanvaEditorContext();

  const srcs = asset?.image.urls;

  const frameSize =
    (CANVA_SIZE.sidebarWidth - CANVA_SIZE.actionBarWidth - 12 * 2) / 2; // 12 is the gutter size, 2 is the number of columns

  return (
    <Flex gap={CANVA_SIZE.sidebarSectionSpace} vertical>
      <Flex className="w-full px-3">
        <Tooltip placement="bottom" title={t('common.tooltip.comingSoon')}>
          <Button
            className="w-full"
            disabled
            icon={<Icon height="20" icon="lucide:upload-cloud" width="20" />}
            size="middle"
            type="primary"
          >
            {t('common.button.uploadPhoto')}
          </Button>
        </Tooltip>
      </Flex>
      <div
        className="white-background-scrollbar w-full overflow-y-auto px-3"
        style={{
          height: height - (40 + CANVA_SIZE.sidebarSectionSpace * 3), // 40 is the height of the upload button
        }}
      >
        <Row
          gutter={[
            CANVA_SIZE.sidebarSectionSpace,
            CANVA_SIZE.sidebarSectionSpace,
          ]}
        >
          {srcs?.map((src, index) => (
            <Col key={index} span={12}>
              <Item.SidebarImage frameSize={frameSize} src={src} />
            </Col>
          ))}
        </Row>
      </div>
    </Flex>
  );
}

export default ImageSection;
