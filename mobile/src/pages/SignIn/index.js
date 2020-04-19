import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';
import { setStyle } from '~/store/modules/statusBar/actions';

import { Container, FormInput, Form, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    if (isFocused) dispatch(setStyle(true));
  }, [dispatch, isFocused]);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="number-pad"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <SubmitButton
          loading={loading}
          onPress={handleSubmit}
          background="#82BF18"
        >
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
