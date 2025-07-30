import { Icon } from '@iconify/react/dist/iconify.js';
import type { NavigateOptions } from '@tanstack/react-router';
import { Image } from 'antd';
import { useMemo } from 'react';

import { Ticket } from '@/shared/components';
import type { ThreeDTicketProps } from '@/shared/components/ticket/ThreeDTicket';
import type { TechnologyResponse } from '@/shared/tanstack/api/technologies';
import { IconType } from '@/shared/tanstack/api/technologies';
import { FileTool } from '@/shared/utils/file';

const { splitFileUrl } = FileTool;

interface Props extends Partial<ThreeDTicketProps> {
  technology: TechnologyResponse;
}

function TechnologyTicket({ technology, ...props }: Props) {
  const navigateOptions: NavigateOptions | undefined = useMemo(() => {
    if (!technology?.knowledgeGroups?.length) {
      return undefined;
    }

    if (technology?.technologySectionId) {
      return {
        params: {
          sectionId: String(technology.technologySectionId),
          technologyId: String(technology.id),
          type: String(technology.technologyType),
        },
        to: '/technology-type/$type/technology-section/$sectionId/technology/$technologyId',
      };
    }

    return {
      params: {
        technologyId: String(technology.id),
        type: String(technology.technologyType),
      },
      to: '/technology-type/$type/technology/$technologyId',
    };
  }, [
    technology.id,
    technology?.knowledgeGroups,
    technology.technologySectionId,
    technology.technologyType,
  ]);

  return (
    <Ticket.ThreeD
      color1={technology.color1}
      color2={technology.color2}
      color3={technology.color3}
      description={technology.description}
      icon={
        technology.iconType === IconType.Custom && technology.iconFileKey ? (
          <Image
            height="50"
            preview={false}
            src={splitFileUrl(technology.iconFileKey).url}
            width="50"
          />
        ) : (
          <Icon height="56" icon={String(technology.iconName)} width="56" />
        )
      }
      key={technology.id}
      navigateOptions={navigateOptions}
      rate={technology.rate}
      title={technology.name}
      {...props}
    />
  );
}

export default TechnologyTicket;
