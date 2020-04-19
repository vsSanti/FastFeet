import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Dropdown from '~/components/Dropdown';
import Table from '~/components/Table';
import { renderAvatar } from '~/utils/RenderAvatar';

import { Container } from './styles';

export default function Deliveryman() {
  const header = [
    { title: 'ID' },
    {
      title: 'Foto',
      styles: {
        width: '20%',
      },
      align: 'center',
    },
    {
      title: 'Nome',
      styles: {
        width: '25%',
      },
    },
    {
      title: 'Email',
      styles: {
        width: '25%',
      },
    },
    { title: 'Ações' },
  ];

  const [deliverymen, setDeliverymen] = useState([]);
  const [formattedDeliverymen, setFormattedDeliverymen] = useState([]);

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  function inputChangeHandler(e) {
    setName(e.target.value);
  }

  async function loadData(nameToLoad, pageToLoad) {
    setLoading(true);
    const response = await api.get('deliverymen', {
      params: { name: nameToLoad, page: pageToLoad },
    });
    setDeliverymen(response.data.deliverymen);
    setTotalPages(Math.ceil(response.data.count / 5));
    setLoading(false);
  }

  useEffect(() => {
    loadData(name, page);
  }, [name, page]);

  useMemo(() => {
    async function deleteButtonClickedHandler(id) {
      setLoading(true);
      try {
        if (window.confirm('Deseja mesmo deletar este item?')) {
          await api.delete(`deliverymen/${id}`);
          toast.success('Entregador excluído com sucesso.');
          if (deliverymen.length > 1) {
            loadData(name, page);
          } else {
            setPage(page > 1 ? page - 1 : 1);
          }
        }
      } catch (error) {
        toast.error('Erro ao excluir entregador.');
      } finally {
        setLoading(false);
      }
    }

    function renderActions(id) {
      return [
        {
          link: `/deliverymen/form/${id}`,
          title: 'Editar',
          icon: <MdEdit color="#4D85EE" size={16} />,
        },
        {
          title: 'Excluir',
          icon: <MdDeleteForever color="#DE3B3B" size={16} />,
          type: 'button',
          onClickButtonHandler: () => deleteButtonClickedHandler(id),
        },
      ];
    }

    const data = deliverymen.map(deliveryman => [
      `#${deliveryman.id}`,
      renderAvatar(deliveryman.avatar, deliveryman.name),
      deliveryman.name,
      deliveryman.email,
      <Dropdown actions={renderActions(deliveryman.id)} />,
    ]);

    setFormattedDeliverymen(data);
  }, [deliverymen, name, page]);

  return (
    <Container>
      <Table
        title="Gerenciando entregadores"
        inputChangeHandler={inputChangeHandler}
        inputPlaceholder="Buscar por entregadores"
        header={header}
        registerButtonHandler={() => history.push('/deliverymen/form')}
        data={formattedDeliverymen}
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loading}
      />
    </Container>
  );
}
