import { StyledSkeletonLoading } from './styles';

interface Props {
  className?: string;
  height?: number | string;
  width?: number | string;
}

function SkeletonLoading({ className, height, width }: Props) {
  return (
    <StyledSkeletonLoading
      className={className}
      style={{
        height: height ?? '100%',
        width: width ?? '100%',
      }}
    />
  );
}

export default SkeletonLoading;
