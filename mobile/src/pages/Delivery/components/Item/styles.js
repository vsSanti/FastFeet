import styled from 'styled-components/native';

import Card from '~/components/Card';

export const Container = styled(Card)`
  margin-bottom: 20px;
`;

export const DeliveryHeader = styled.View`
  padding: 15px;
`;

export const DeliveryHeaderStatus = styled.View`
  margin: 10px 15px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Step = styled.View`
  align-items: center;
  flex-direction: column;
`;

export const Dot = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 1px solid #7d40e7;
  background: ${props => (props.filled ? '#7d40e7' : '#fff')};
`;

export const StepName = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 10px;
  font-size: 10px;
  color: #999;
`;

export const Line = styled.View`
  position: absolute;
  top: 5px;
  width: 84%;
  margin-left: 9%;
  margin-right: 9%;
  height: 2px;
  background: #7d40e7;
`;

export const DeliveryFooter = styled.View`
  padding: 15px;
  background: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DeliveryFooterGroup = styled.View``;

export const DeliveryFooterLabel = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #999;
`;

export const DeliveryFooterValue = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const DetailsButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
`;
