import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    input {
      display: none;
    }
  }
`;
