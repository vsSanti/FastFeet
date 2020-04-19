import styled from 'styled-components/native';

export const Container = styled.View`
  height: 45px;
  background: #fff;
  border-radius: 4px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 16px;
  color: #999;
  margin: 0 15px;
`;
