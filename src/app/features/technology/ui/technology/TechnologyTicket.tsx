import { Icon } from '@iconify/react/dist/iconify.js';
import { Image } from 'antd';

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
      rate={technology.rate}
      title={technology.name}
      {...props}
    />
  );
}

export default TechnologyTicket;
