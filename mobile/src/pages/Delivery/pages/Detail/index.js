import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { setDeliveryData } from '~/store/modules/delivery/actions';
import { setStyle } from '~/store/modules/statusBar/actions';

import api from '~/services/api';

import Background from '~/components/Background';
import Title from '~/components/Title';

import {
  StyledCard,
  DeliveryInfo,
  Label,
  Text,
  Group,
  GroupItem,
  ButtonsContainer,
  ButtonContainer,
  ButtonText,
} from './styles';

const deliveryStatus = {
  canceled: 'Cancelada',
  delivered: 'Entregue',
  out: 'Retirada',
  waiting: 'Aguardando',
};

export default function Detail() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const delivery = useSelector(state => state.delivery.delivery);

  useEffect(() => {
    if (isFocused) dispatch(setStyle(true));
  }, [dispatch, isFocused]);

  function renderDeliveryInfo() {
    return (
      <StyledCard>
        <DeliveryInfo>
          <Title
            title="Informações da entrega"
            icon={<Icon name="truck" size={20} color="#7d40e7" />}
          />
          <Label>DESTINATÁRIO</Label>
          <Text>{delivery.recipient.name}</Text>
          <Label>ENDEREÇO DE ENTREGA</Label>
          <Text>{delivery.recipient.full_address}</Text>
          <Label>PRODUTO</Label>
          <Text>{delivery.product}</Text>
        </DeliveryInfo>
      </StyledCard>
    );
  }

  function renderDeliveryStatus() {
    return (
      <StyledCard>
        <DeliveryInfo>
          <Title
            title="Situação da entrega"
            icon={<Icon name="calendar" size={20} color="#7d40e7" />}
          />
          <Label>STATUS</Label>
          <Text>{deliveryStatus[delivery.status]}</Text>
          <Group>
            <GroupItem>
              <Label>DATA DE RETIRADA</Label>
              <Text>
                {delivery.start_date
                  ? format(parseISO(delivery.start_date), 'dd/MM/yyyy', {
                      locale: pt,
                    })
                  : '--/--/----'}
              </Text>
            </GroupItem>
            <GroupItem>
              <Label>DATA DE ENTREGA</Label>
              <Text>
                {delivery.end_date
                  ? format(parseISO(delivery.end_date), 'dd/MM/yyyy', {
                      locale: pt,
                    })
                  : '--/--/----'}
              </Text>
            </GroupItem>
          </Group>
        </DeliveryInfo>
      </StyledCard>
    );
  }

  function renderButtons() {
    async function handleStartDelivery() {
      try {
        const response = await api.put(`deliveries/${delivery.id}/start`);
        dispatch(setDeliveryData({ start_date: response.data.start_date }));
        Alert.alert('Entrega retirada com sucesso.');
      } catch (err) {
        console.tron.log(err);
        Alert.alert(
          `Houve um erro na sua requisição. Tente novamente mais tarde.`
        );
      }
    }

    return (
      <ButtonsContainer>
        {delivery.start_date ? (
          <>
            {!delivery.end_date && (
              <ButtonContainer
                onPress={() =>
                  navigation.push('DeliveryReportProblem', { delivery })
                }
              >
                <Icon name="close-circle-outline" size={30} color="#e74040" />
                <ButtonText>Informar Problema</ButtonText>
              </ButtonContainer>
            )}
            <ButtonContainer
              onPress={() =>
                navigation.push('DeliveryVisualizeProblem', { delivery })
              }
            >
              <Icon name="information-outline" size={30} color="#e7ba40" />
              <ButtonText>Visualizar Problemas</ButtonText>
            </ButtonContainer>
            {!delivery.end_date && (
              <ButtonContainer
                onPress={() =>
                  navigation.push('DeliveryConfirmDelivery', { delivery })
                }
              >
                <Icon name="check-circle-outline" size={30} color="#7d40e7" />
                <ButtonText>Confirmar Entrega</ButtonText>
              </ButtonContainer>
            )}
          </>
        ) : (
          <>
            <ButtonContainer
              onPress={() => {
                Alert.alert(
                  'Pressione por mais tempo para confirmar a retirada'
                );
              }}
              onLongPress={handleStartDelivery}
            >
              <Icon name="truck-delivery" size={30} color="#7d40e7" />
              <ButtonText>Retirar Encomenda</ButtonText>
            </ButtonContainer>
          </>
        )}
      </ButtonsContainer>
    );
  }

  return (
    <Background>
      {renderDeliveryInfo()}
      {renderDeliveryStatus()}
      {renderButtons()}
    </Background>
  );
}
