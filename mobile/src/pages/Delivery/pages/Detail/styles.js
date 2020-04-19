import styled from 'styled-components/native';

import Card from '~/components/Card';

export const Group = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const GroupItem = styled.View`
  flex: 0.5;
`;

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

export const DeliveryInfo = styled.View`
  padding: 15px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-bottom: 5px;
  margin-top: 12px;
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
`;

export const ButtonsContainer = styled(Card)`
  flex-direction: row;
  justify-content: space-evenly;
  background: #eee;
  /* background: red; */
`;

export const ButtonContainer = styled.TouchableOpacity`
  flex: 1;
  flex-shrink: 1;
  align-items: center;
  padding: 15px;
  background: #fff;
  margin-right: 1px;
`;

export const ButtonText = styled.Text`
  text-align: center;
`;
