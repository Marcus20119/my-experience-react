import { Flex, Rate } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppRouter } from '@/shared/hooks';

import { StyledThreeDTicket } from './styles';

export interface ThreeDTicketProps {
  color1: string;
  color2?: string;
  color3?: string;
  description: string;
  icon: React.ReactNode;
  path?: RouterPath;
  rate?: number;
  title: string;
  width?: string;
}

function ThreeDTicket({
  color1,
  color2,
  color3,
  description,
  icon,
  path,
  rate,
  title,
  width,
}: ThreeDTicketProps) {
  const { t } = useTranslation();
  const { navigate } = useAppRouter();

  return (
    <StyledThreeDTicket
      color1={color1}
      color2={color2}
      color3={color3}
      onClick={() => path && navigate({ path: path as '/' })}
      width={width}
    >
      <div className="card shadow-xl">
        <div className="content-box">
          <span className="card-title">{title}</span>
          <p className="card-content">{description}</p>
          <span className="see-more">{t('common.button.seeMore')}</span>
        </div>
        <div className="icon-box">{icon}</div>
      </div>

      <Flex className="star-board pr-5" justify="end">
        <Flex align="center" vertical>
          <Flex gap="4rem">
            <Flex className="w-fit" vertical>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div className="string h-1.5 w-0.5" key={index} />
                ))}
            </Flex>

            <Flex className="w-fit" vertical>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div className="string h-1.5 w-0.5" key={index} />
                ))}
            </Flex>
          </Flex>

          <Flex className="board rounded-md px-3 pb-2">
            <Rate allowHalf disabled value={rate ?? 0} />
          </Flex>
        </Flex>
      </Flex>
    </StyledThreeDTicket>
  );
}

export default ThreeDTicket;
