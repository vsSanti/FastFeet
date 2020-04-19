import React, { useState, useEffect, useMemo } from 'react';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Dropdown from '~/components/Dropdown';
import Modal from '~/components/Modal';
import Table from '~/components/Table';

import { Container } from './styles';
import { renderVisualizeModal } from './Modal';

export default function Problem() {
  const header = [
    {
      title: 'Encomenda',
      styles: {
        width: '10%',
      },
    },

    {
      title: 'Problema',
      styles: {
        width: '70%',
      },
    },
    { title: 'Ações' },
  ];

  const [problemId, setProblemId] = useState(null);
  const [problemDetails, setProblemDetails] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [problems, setProblems] = useState([]);
  const [formattedProblems, setFormattedProblems] = useState([]);

  const [description, setDescription] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  function inputChangeHandler(e) {
    setDescription(e.target.value);
  }

  async function loadData(descriptionToLoad, pageToLoad) {
    setLoading(true);
    const response = await api.get('deliveries/problems/', {
      params: { description: descriptionToLoad, page: pageToLoad },
    });
    setProblems(response.data.problems);
    setTotalPages(Math.ceil(response.data.count / 5));
    setLoading(false);
  }

  useEffect(() => {
    loadData(description, page);
  }, [description, page]);

  useMemo(() => {
    function visualizeButtonClickedHandler(id) {
      setProblemId(id);
      setIsModalOpened(true);
    }

    async function deleteButtonClickedHandler(id) {
      setLoading(true);
      try {
        if (window.confirm('Deseja mesmo cancelar este item?')) {
          await api.delete(`/problem/${id}/cancel-order`);
          toast.success('Encomenda cancelada com sucesso.');
          if (problems.length > 1) {
            loadData(description, page);
          } else {
            setPage(page > 1 ? page - 1 : 1);
          }
        }
      } catch (error) {
        toast.error('Erro ao cancelar encomenda.');
      } finally {
        setLoading(false);
      }
    }

    function renderActions(id, canceled, endDate) {
      const action = [
        {
          title: 'Visualizar',
          icon: <MdRemoveRedEye color="#8E5BE8" size={16} />,
          type: 'button',
          onClickButtonHandler: () => visualizeButtonClickedHandler(id),
        },
      ];

      if (!canceled && !endDate) {
        action.push({
          title: 'Cancelar',
          icon: <MdDeleteForever color="#DE3B3B" size={16} />,
          type: 'button',
          onClickButtonHandler: () => deleteButtonClickedHandler(id),
        });
      }

      return action;
    }

    const data = problems.map(problem => [
      `#${problem.order.id}`,
      problem.description,
      <Dropdown
        actions={renderActions(
          problem.id,
          problem.order.canceled_at,
          problem.order.end_date
        )}
      />,
    ]);

    setFormattedProblems(data);
  }, [description, page, problems]);

  /**
   * Render and opens modal
   */
  useEffect(() => {
    if (problemId === null || isModalOpened === false) return;

    const problem = problems.find(o => o.id === problemId);

    setProblemDetails(renderVisualizeModal(problem));
  }, [isModalOpened, problemId, problems]);

  return (
    <Container>
      <Modal
        isOpened={isModalOpened}
        title="Informações do problema"
        closeHandler={() => setIsModalOpened(false)}
      >
        {problemDetails}
      </Modal>
      <Table
        title="Gerenciando problemas"
        inputChangeHandler={inputChangeHandler}
        inputPlaceholder="Buscar por problemas"
        header={header}
        data={formattedProblems}
        hasEllipsis
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
        loading={loading}
      />
    </Container>
  );
}
