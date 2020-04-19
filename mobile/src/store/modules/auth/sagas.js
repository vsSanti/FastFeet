import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymen/${id}`);

    const { user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'o usuário não pode ser prestador de serviços.'
      );
      return;
    }

    yield put(signInSuccess(user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login. Verifique seus dados.'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
