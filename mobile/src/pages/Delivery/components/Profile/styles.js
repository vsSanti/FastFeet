import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const ProfileData = styled.View`
  flex-direction: row;
`;

export const PersonalData = styled.View`
  margin-left: 12px;
  justify-content: center;
`;

export const WelcomeText = styled.Text`
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled.TouchableOpacity`
  justify-content: center;
  margin-right: 20px;
`;
