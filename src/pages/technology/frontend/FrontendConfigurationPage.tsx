import { Flex } from 'antd';

import { useGetTechnologyItems } from '@/app/features/technology';
import { FrontendLayout } from '@/app/layout';
import { Ticket } from '@/shared/components/ticket';

function FrontendConfigurationPage() {
  const { technologyItems } = useGetTechnologyItems();

  return (
    <FrontendLayout
      route={{
        path: '/technology/frontend/configuration',
      }}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologyItems.configuration.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </FrontendLayout>
  );
}

export default FrontendConfigurationPage;
