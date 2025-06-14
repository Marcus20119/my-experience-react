import styled from '@emotion/styled';

export const StyledSkeletonLoading = styled.div`
  background-color: rgba(238, 238, 238, 0.105);
  background-image: linear-gradient(
    110deg,
    #bbbdbe40 40%,
    #f9f9f940 55%,
    #bbbdbe40 70%
  );
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
