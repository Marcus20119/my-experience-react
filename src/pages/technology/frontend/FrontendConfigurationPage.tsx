import { Flex } from 'antd';

import { useGetFrontendTechnologyItems } from '@/app/features/technology';
import { FrontendLayout } from '@/app/layout';
import { Ticket } from '@/shared/components';

function FrontendConfigurationPage() {
  const { configurationItems } = useGetFrontendTechnologyItems();

  return (
    <FrontendLayout
      route={{
        path: '/technology/frontend/configuration',
      }}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {configurationItems.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </FrontendLayout>
  );
}

export default FrontendConfigurationPage;
