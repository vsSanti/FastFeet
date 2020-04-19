import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

function renderDate(title, date) {
  return (
    <strong>
      {title}
      <p>{format(parseISO(date), 'HH:mm dd/MM/yyyy', { locale: pt })}</p>
    </strong>
  );
}

function renderOrderDetails(title, data) {
  return (
    <strong>
      {title}
      <p>{data}</p>
    </strong>
  );
}

export function renderVisualizeModal(order) {
  return (
    <>
      <h3>Pedido</h3>
      {renderOrderDetails('Produto:', order.product)}
      {renderOrderDetails('Destinatário:', order.recipient.name)}
      {renderOrderDetails('Entregador:', order.deliveryman.name)}

      <hr />

      <h3>Endereço</h3>
      <p>
        {order.recipient.street}, {order.recipient.number}
      </p>
      <p>
        {order.recipient.city} - {order.recipient.state}
      </p>
      <p>{order.recipient.zip_code}</p>

      <hr />

      <h3>Datas</h3>
      {order.created_at && renderDate('Criação:', order.created_at)}
      {order.start_date && renderDate('Retirada:', order.start_date)}
      {order.end_date && renderDate('Entrega:', order.end_date)}
      {order.canceled_at && renderDate('Cancelamento:', order.canceled_at)}

      {order.signature && (
        <>
          <hr />

          <h3>Assinatura do destinatário</h3>
          <img src={order.signature.url} alt="Assinatura" />
        </>
      )}
    </>
  );
}
