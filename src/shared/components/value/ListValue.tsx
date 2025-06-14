import { Typography } from 'antd';

const { Paragraph, Text } = Typography;

interface Props {
  value?: React.ReactNode[];
}

function ListValue({ value }: Props) {
  if (!value?.length) return null;

  return (
    <Paragraph>
      <ul>
        {value.filter(Boolean).map((item, index) => (
          <li key={index}>
            {typeof item === 'string' ? <Text>{item}</Text> : item}
          </li>
        ))}
      </ul>
    </Paragraph>
  );
}

export default ListValue;
