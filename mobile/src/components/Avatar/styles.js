import styled from 'styled-components/native';

export const Image = styled.Image`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  border-radius: ${props => `${props.size / 2}px`};
  background: #aaa;
`;

export const Placeholder = styled.View`
  align-items: center;
  justify-content: center;
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  border-radius: ${props => `${props.size / 2}px`};
  background: #e3d1ff;
`;

export const PlaceholderText = styled.Text`
  font-size: ${props => `${props.fontSize}px`};
  color: #886ec6;
`;
