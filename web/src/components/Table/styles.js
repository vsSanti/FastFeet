import styled from 'styled-components';

export const InputIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  input {
    border: none;
    margin-left: 5px;
    width: 250px;

    &::placeholder {
      display: flex;
      flex: 1;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 20px auto;

  > h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444;
    margin-top: 20px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;

export const TableContent = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
  margin: 10px 0;

  td {
    padding: 12px 15px;
    font-size: 16px;
    color: #666;
    max-width: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > div {
      display: flex;
      align-items: center;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      overflow: visible;
    }

    &:last-child {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
      justify-content: center;
      overflow: visible;
    }
  }

  thead tr {
    color: #444;
    font-size: 16px;
    font-weight: bold;
    text-align: left;

    th {
      flex: auto;
      padding: 0 15px;

      &:first-child {
        width: 1%;
      }

      &:last-child {
        width: 1%;
      }
    }
  }

  tbody {
    background: #fff;
    border: none;
  }
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background: 0;
      padding: 5px;
      border: none;
      border-radius: 50%;
      transition: background 0.2s;
      width: 50px;
      height: 50px;

      &:hover {
        background: #ddd;
      }
    }
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const Input = styled.input`
  margin: 0 5px;
  width: 80px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  padding: 0 15px;
`;
