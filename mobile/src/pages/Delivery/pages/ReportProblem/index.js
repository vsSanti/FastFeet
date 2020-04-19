import React, { useState, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setStyle } from '~/store/modules/statusBar/actions';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Form, FormInput, SendButton } from './styles';

export default function ReportProblem() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const delivery = useSelector(state => state.delivery.delivery);

  const [loading, setLoading] = useState(false);
  const [problemDescription, setProblemDescription] = useState('');

  useEffect(() => {
    if (isFocused) dispatch(setStyle(true));
  }, [dispatch, isFocused]);

  async function reportProblem() {
    setLoading(true);
    try {
      Keyboard.dismiss();

      await api.post(`delivery/${delivery.id}/problems`, {
        description: problemDescription,
      });

      Alert.alert('Problema cadastrado com sucesso.');

      setLoading(false);
      navigation.pop();
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Houve um erro ao cadastrar o problema. Tente novamente mais tarde.'
      );
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            returnKeyType="send"
            onSubmitEditing={reportProblem}
            value={problemDescription}
            onChangeText={setProblemDescription}
            numberOfLines={10}
            multiline
            maxLength={500}
          />
        </Form>
        <SendButton onPress={reportProblem} loading={loading}>
          Enviar
        </SendButton>
      </Container>
    </Background>
  );
}
