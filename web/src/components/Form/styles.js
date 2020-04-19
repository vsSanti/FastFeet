import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 20px auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    button {
      & + button {
        margin-left: 10px;
      }
    }
  }
`;

export const FormContent = styled.div`
  margin: 20px 0;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  form section {
    display: flex;
    justify-content: space-between;
    width: 100%;

    section {
      margin-left: 20px;
    }

    > div {
      width: 100%;

      & + div {
        margin-left: 20px;
      }
    }
  }
`;
