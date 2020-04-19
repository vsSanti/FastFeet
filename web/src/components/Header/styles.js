import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 135px;
      height: 26px;
      margin-right: 15px;
      padding-right: 15px;
      border-right: 1px solid #ddd;
    }

    a {
      font-size: 15px;
      font-weight: bold;
      margin-right: 21px;
      color: #999;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.1, '#999')};
      }
    }
  }

  aside {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    strong {
      color: #666;
    }

    button {
      background: none;
      border: 0;
      color: #de3b3b;
      margin: 0;
    }
  }
`;
