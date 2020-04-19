import styled from 'styled-components/native';

import Background from '~/components/Background';
import Button from '~/components/Button';

export const Container = styled(Background)`
  align-items: center;
  justify-content: center;
  margin: 35px;
`;

export const PersonalData = styled.View`
  align-self: stretch;
  align-items: flex-start;
  margin-bottom: 15px;
  margin-top: 40px;
`;

export const Label = styled.Text`
  color: #666;
  font-size: 12px;
  margin-bottom: 5px;
`;

export const Text = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
`;
