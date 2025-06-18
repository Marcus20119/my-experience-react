import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import type { ThreeDTicketProps } from '@/shared/components/ticket/ThreeDTicket';

export const useGetCloudItems = () => {
  const { t } = useTranslation();

  const cloudItems: ThreeDTicketProps[] = [
    {
      color1: '#8fc4ff',
      color2: '#afb5ff',
      color3: '#d9a4ff',
      description: t('technology.description.aws'),
      icon: <Icon height="64" icon="logos:aws" width="64" />,
      path: '/technology/cloud/aws',
      rate: 3.5,
      title: 'AWS',
    },
  ];

  const awsItems: ThreeDTicketProps[] = [
    {
      color1: '#fa4c4d',
      icon: <Icon height="56" icon="logos:aws-iam" width="56" />,
      rate: 4,
      title: 'IAM',
    },
    {
      color1: '#f89a1c',
      icon: <Icon height="56" icon="logos:aws-ec2" width="56" />,
      rate: 3,
      shouldHighlightRate: true,
      title: 'EC2',
    },
    {
      color1: '#f89a1c',
      icon: <Icon height="56" icon="@local:aws-ec2-image-builder" width="56" />,
      rate: 2,
      shouldHighlightRate: true,
      title: ['EC2', 'Image Builder'],
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-ebs" width="56" />,
      rate: 3,
      title: 'EBS',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-efs" width="56" />,
      rate: 3,
      title: 'EFS',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-fsx" width="56" />,
      rate: 1,
      title: 'FXs',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-fsx-lustre" width="56" />,
      rate: 1,
      title: ['FXs', 'for Lustre'],
    },
    {
      color1: '#9c6af0',
      icon: <Icon height="56" icon="logos:aws-elb" width="56" />,
      rate: 2,
      title: 'ELB',
    },
    {
      color1: '#f89a1c',
      icon: <Icon height="56" icon="@local:aws-asg" width="56" />,
      rate: 2,
      shouldHighlightRate: true,
      title: 'ASG',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="logos:aws-s3" width="56" />,
      rate: 4,
      title: 'S3',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="logos:aws-glacier" width="56" />,
      rate: 2,
      title: 'Glacier',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-snowball" width="56" />,
      rate: 1,
      title: 'Snowball',
    },

    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-snowball-edge" width="56" />,
      rate: 1,
      title: 'Snowball Edge',
    },
    {
      color1: '#6fac4a',
      icon: <Icon height="56" icon="@local:aws-storage-gateway" width="56" />,
      rate: 1,
      title: ['Storage', ' Gateway'],
    },
    {
      color1: '#9c6af0',
      icon: <Icon height="56" icon="logos:aws-athena" width="56" />,
      rate: 2,
      title: 'Athena',
    },
    {
      color1: '#5e7ff3',
      icon: <Icon height="56" icon="logos:aws-neptune" width="56" />,
      rate: 1,
      title: 'Neptune',
    },
    {
      color1: '#5e7ff3',
      icon: <Icon height="56" icon="logos:aws-rds" width="56" />,
      rate: 3,
      title: 'RDS',
    },
    {
      color1: '#5e7ff3',
      icon: <Icon height="56" icon="logos:aws-dynamodb" width="56" />,
      rate: 2,
      title: 'DynamoDB',
    },
  ];

  return { awsItems, cloudItems };
};
