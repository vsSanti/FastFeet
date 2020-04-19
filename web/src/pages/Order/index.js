import React, { useState, useEffect, useMemo } from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Dropdown from '~/components/Dropdown';
import Modal from '~/components/Modal';
import Table from '~/components/Table';

import { Container, Status } from './styles';
import { renderVisualizeModal } from './Modal';
import { renderAvatar } from '~/utils/RenderAvatar';

export default function Order() {
  const header = [
    { title: 'ID' },
    { title: 'Destinatário' },
    { title: 'Entregador' },
    { title: 'Cidade' },
    { title: 'Estado' },
    {
      title: 'Status',
      styles: {
        width: 0,
      },
    },
    { title: 'Ações' },
  ];

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formattedOrders, setFormattedOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const [product, setProduct] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  function inputChangeHandler(e) {
    setProduct(e.target.value);
  }

  async function loadData(productToLoad, pageToLoad) {
    setLoading(true);
    const response = await api.get('orders', {
      params: { product: productToLoad, page: pageToLoad },
    });
    setOrders(response.data.orders);
    setTotalPages(Math.ceil(response.data.count / 5));
    setLoading(false);
  }

  /**
   * Loads content
   */
  useEffect(() => {
    loadData(product, page);
  }, [page, product]);

  function renderStatus(status) {
    let color;
    let title;

    if (status === 'waiting') {
      color = '#C1BC35';
      title = 'PENDENTE';
    } else if (status === 'delivered') {
      color = '#2CA42B';
      title = 'ENTREGUE';
    } else if (status === 'out') {
      color = '#4D85EE';
      title = 'RETIRADA';
    } else {
      color = '#DE3B3B';
      title = 'CANCELADA';
    }

    return (
      <Status color={color}>
        <span>{title}</span>
      </Status>
    );
  }

  function registerButtonClickedHandler() {
    history.push('/orders/form');
  }

  /**
   * Renders table data
   */
  useMemo(() => {
    function visualizeButtonClickedHandler(id) {
      setOrderId(id);
      setIsModalOpened(true);
    }

    async function deleteButtonClickedHandler(id) {
      setLoading(true);
      try {
        if (window.confirm('Deseja mesmo cancelar esta encomenda?')) {
          await api.delete(`orders/${id}`);
          toast.success('Encomenda cancelada com sucesso.');
          loadData(product, page);
        }
      } catch (error) {
        toast.error('Erro ao cancelar encomenda.');
      } finally {
        setLoading(false);
      }
    }

    function renderActions(id, status) {
      const data = [
        {
          title: 'Visualizar',
          icon: <MdRemoveRedEye color="#8E5BE8" size={16} />,
          type: 'button',
          onClickButtonHandler: () => visualizeButtonClickedHandler(id),
        },
      ];

      if (status !== 'delivered' && status !== 'canceled') {
        data.push({
          link: `/orders/form/${id}`,
          title: 'Editar',
          icon: <MdEdit color="#4D85EE" size={16} />,
        });
        data.push({
          title: 'Cancelar',
          icon: <MdDeleteForever color="#DE3B3B" size={16} />,
          type: 'button',
          onClickButtonHandler: () => deleteButtonClickedHandler(id),
        });
      }
      return data;
    }

    const data = orders.map(order => [
      `#${order.id}`,
      order.recipient.name,
      <div>
        {renderAvatar(order.deliveryman.avatar, order.deliveryman.name)}
        <span>{order.deliveryman.name}</span>
      </div>,
      order.recipient.city || '',
      order.recipient.state || '',
      renderStatus(order.status),
      <Dropdown actions={renderActions(order.id, order.status)} />,
    ]);

    setFormattedOrders(data);
  }, [orders, page, product]);

  /**
   * Render and opens modal
   */
  useEffect(() => {
    if (orderId === null || isModalOpened === false) return;

    const order = orders.find(o => o.id === orderId);

    setOrderDetails(renderVisualizeModal(order));
  }, [isModalOpened, orderId, orders]);

  return (
    <Container>
      <Modal
        isOpened={isModalOpened}
        title="Informações da encomenda"
        closeHandler={() => setIsModalOpened(false)}
      >
        {orderDetails}
      </Modal>
      <Table
        title="Gerenciando encomendas"
        inputChangeHandler={inputChangeHandler}
        inputPlaceholder="Buscar por encomendas"
        header={header}
        registerButtonHandler={registerButtonClickedHandler}
        data={formattedOrders}
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loading}
      />
    </Container>
  );
}
