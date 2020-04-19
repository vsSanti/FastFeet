import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 65px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
`;

export const StyledSpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: 100px;
  height: 100px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
