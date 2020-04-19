import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

function renderOrderDetails(title, data) {
  return (
    <strong>
      {title}
      <p>{data}</p>
    </strong>
  );
}

function renderDate(title, date) {
  return renderOrderDetails(
    title,
    format(parseISO(date), 'HH:mm dd/MM/yyyy', { locale: pt })
  );
}

export function renderVisualizeModal(problem) {
  return (
    <>
      <h3>Detalhes da encomenda</h3>
      {renderOrderDetails('Destinatário:', problem.order.recipient.name)}
      {renderOrderDetails('Entregador:', problem.order.deliveryman.name)}
      {renderOrderDetails('Produto:', problem.order.product)}
      <hr />
      {problem.createdAt && renderDate('Relatado em:', problem.createdAt)}
      <strong>Descrição</strong>
      <p>{problem.description}</p>
    </>
  );
}
