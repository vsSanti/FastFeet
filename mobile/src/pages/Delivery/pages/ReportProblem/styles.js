import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';
import Card from '~/components/Card';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const Form = styled(Card)`
  height: 250px;
`;

export const FormInput = styled(Input)`
  margin-top: 15px;
  flex: 1;
`;

export const SendButton = styled(Button)`
  margin-top: 15px;
`;
