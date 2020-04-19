import styled from 'styled-components/native';

import Card from '~/components/Card';

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
  showsVertivalScrollIndicator: false,
  contentContainerStyle: { marginTop: 15 },
})``;

export const ListItem = styled(Card)`
  padding: 15px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

export const ListItemDescription = styled.Text`
  flex-shrink: 1;
  margin-right: 5px;
  font-size: 16px;
  color: #999;
`;

export const ListItemDate = styled.Text`
  font-size: 12px;
  color: #999;
`;
