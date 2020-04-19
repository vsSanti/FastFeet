import styled from 'styled-components';

export const DashedRoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px dashed #ddd;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
`;
