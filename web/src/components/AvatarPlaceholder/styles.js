import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => lighten(0.3, props.color)};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
  font-size: ${props => `${props.fontSize}px`};
  color: ${props => props.color};
  margin: 0 6px;
`;
