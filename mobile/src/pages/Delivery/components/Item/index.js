import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Title from '~/components/Title';

import {
  Container,
  DeliveryHeader,
  DeliveryHeaderStatus,
  DeliveryFooter,
  DeliveryFooterGroup,
  DeliveryFooterLabel,
  DeliveryFooterValue,
  DetailsButtonText,
  Step,
  Dot,
  StepName,
  Line,
} from './styles';

export default function DeliveryItem({ delivery, handleSeeDetailsPressed }) {
  return (
    <Container>
      <DeliveryHeader>
        <Title
          title={`Encomenda ${delivery.id}`}
          icon={<Icon name="truck" size={20} color="#7d40e7" />}
        />
        <DeliveryHeaderStatus>
          <Line />
          <Step>
            <Dot filled />
            <StepName>Aguardando</StepName>
          </Step>
          <Step>
            <Dot filled={delivery.start_date} />
            <StepName>Retirada</StepName>
          </Step>
          <Step>
            <Dot filled={delivery.end_date} />
            <StepName>Entregue</StepName>
          </Step>
        </DeliveryHeaderStatus>
      </DeliveryHeader>
      <DeliveryFooter>
        <DeliveryFooterGroup>
          <DeliveryFooterLabel>Data</DeliveryFooterLabel>
          <DeliveryFooterValue>
            {format(parseISO(delivery.createdAt), 'dd/MM/yyyy', {
              locale: pt,
            })}
          </DeliveryFooterValue>
        </DeliveryFooterGroup>
        <DeliveryFooterGroup>
          <DeliveryFooterLabel>Cidade</DeliveryFooterLabel>
          <DeliveryFooterValue>{delivery.recipient.city}</DeliveryFooterValue>
        </DeliveryFooterGroup>
        <TouchableOpacity onPress={handleSeeDetailsPressed}>
          <DetailsButtonText>Ver detalhes</DetailsButtonText>
        </TouchableOpacity>
      </DeliveryFooter>
    </Container>
  );
}

DeliveryItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
  handleSeeDetailsPressed: PropTypes.func.isRequired,
};
