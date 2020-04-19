import styled from 'styled-components/native';

export const List = styled.FlatList.attrs({
  showsVertivalScrollIndicator: false,
  contentContainerStyle: { marginTop: 15 },
})``;

export const ListHeader = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ListName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const ListSwitch = styled.View`
  flex-direction: row;
`;

export const ListType = styled.Text`
  margin-left: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.isActive ? '#7d40e7' : '#999')};
`;
