import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Dropdown from '~/components/Dropdown';
import Table from '~/components/Table';

import { Container } from './styles';

export default function Recipient() {
  const header = [
    {
      title: 'ID',
      styles: {
        width: '10%',
      },
    },
    {
      title: 'Nome',
      styles: {
        width: '35%',
      },
    },
    {
      title: 'Endereço',
      styles: {
        width: '45%',
      },
    },
    { title: 'Ações' },
  ];

  const [recipients, setRecipients] = useState([]);
  const [formattedRecipients, setFormattedRecipients] = useState([]);

  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  function inputChangeHandler(e) {
    setName(e.target.value);
  }

  async function loadData(nameToLoad, pageToLoad) {
    setLoading(true);
    const response = await api.get('recipients', {
      params: { name: nameToLoad, page: pageToLoad },
    });
    setRecipients(response.data.recipients);
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
          await api.delete(`recipients/${id}`);
          toast.success('Destinatário excluído com sucesso.');
          if (recipients.length > 1) {
            loadData(name, page);
          } else {
            setPage(page > 1 ? page - 1 : 1);
          }
        }
      } catch (error) {
        toast.error('Erro ao excluir destinatário.');
      } finally {
        setLoading(false);
      }
    }

    function renderActions(id) {
      return [
        {
          link: `/recipients/form/${id}`,
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

    const data = recipients.map(recipient => [
      `#${recipient.id}`,
      recipient.name,
      `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`,
      <Dropdown actions={renderActions(recipient.id)} />,
    ]);

    setFormattedRecipients(data);
  }, [name, page, recipients]);

  return (
    <Container>
      <Table
        title="Gerenciando destinatários"
        inputChangeHandler={inputChangeHandler}
        inputPlaceholder="Buscar por destinatários"
        header={header}
        registerButtonHandler={() => history.push('/recipients/form')}
        data={formattedRecipients}
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loading}
      />
    </Container>
  );
}
