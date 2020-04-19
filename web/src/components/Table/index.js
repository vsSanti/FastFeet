import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { MdAdd, MdSearch, MdChevronLeft, MdChevronRight } from 'react-icons/md';

import Button from '~/components/Shared/Button';
import Spinner from '~/components/Spinner';

import {
  Container,
  TableContent,
  InputIcon,
  Pagination,
  Input,
} from './styles';

export default function Table({
  header,
  data,
  title,
  inputPlaceholder,
  inputChangeHandler,
  registerButtonHandler,
  currentPage,
  totalPages,
  setPage,
  loading,
}) {
  const inputRef = useRef();
  const formRef = useRef(null);

  function handleInputIconClick() {
    inputRef.current.focus();
  }

  function renderTableHeader() {
    return (
      <thead>
        <tr>
          {header.map(item => (
            <th
              align={item.align || 'left'}
              key={item.title}
              style={item.styles}
            >
              {item.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  function renderTableData() {
    return (
      <tbody>
        {data.map((item, trIndex) => (
          <tr key={`${item}_${String(trIndex)}`}>
            {item.map((i, tdIndex) => (
              <td
                align={header[tdIndex].align || 'left'}
                key={`${i}_${String(tdIndex)}`}
              >
                {i}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  function paginationHandler(val) {
    if (val > 0 && val <= totalPages) {
      setPage(val);
    }
  }

  const renderHeader = () => (
    <>
      <h1>{title}</h1>
      <div>
        <InputIcon onClick={handleInputIconClick}>
          <MdSearch color="#999" size={20} />
          <input
            onChange={inputChangeHandler}
            type="text"
            placeholder={inputPlaceholder}
            ref={inputRef}
          />
        </InputIcon>
        {registerButtonHandler && (
          <Button
            icon={<MdAdd color="#fff" size={20} />}
            onClick={registerButtonHandler}
          >
            CADASTRAR
          </Button>
        )}
      </div>
    </>
  );

  const renderPagination = () => (
    <Pagination>
      <Form ref={formRef}>
        <button
          type="button"
          onClick={() => paginationHandler(currentPage - 1)}
        >
          <MdChevronLeft color="#333" size={35} />
        </button>
        <Input
          type="number"
          name="page"
          min={1}
          value={currentPage}
          onChange={e => paginationHandler(e.target.value)}
        />
        <button
          type="button"
          onClick={() => paginationHandler(currentPage + 1)}
        >
          <MdChevronRight color="#333" size={35} />
        </button>
      </Form>
      <span>
        Página {currentPage} de {totalPages}
      </span>
    </Pagination>
  );

  return (
    <>
      {loading && <Spinner />}
      <Container>
        {renderHeader()}
        <TableContent>
          {renderTableHeader()}
          {renderTableData()}
        </TableContent>
        {renderPagination()}
      </Container>
    </>
  );
}

Table.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      styles: PropTypes.object,
      align: PropTypes.string,
      hasEllipsis: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.object,
      ])
    )
  ).isRequired,
  title: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputChangeHandler: PropTypes.func.isRequired,
  registerButtonHandler: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Table.defaultProps = {
  registerButtonHandler: null,
  loading: false,
};
