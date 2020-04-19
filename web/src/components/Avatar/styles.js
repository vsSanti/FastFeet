import styled from 'styled-components';

export const Container = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #eee;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
  margin: 0 6px;

  object-fit: cover;
`;
