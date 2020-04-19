import styled from 'styled-components';

export const Container = styled.div`
  input {
    display: block;
    width: 100%;
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: none;
    padding: 0 15px;

    &::placeholder {
      color: #999;
    }
  }
`;
