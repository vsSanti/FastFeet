import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.backgroundColor};
  border-radius: 4px;
  border: none;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 7px 16px;
`;
