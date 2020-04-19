import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: left;
  background: #fff;
  border-radius: 4px;
  padding: 60px 30px;

  img {
    padding: 0 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 30px;

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 12px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: bold;
      color: #444;
      margin-top: 15px;
      margin-bottom: 9px;
    }

    input {
      display: block;
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: none;
      padding: 0 15px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      margin-top: 15px;
      color: #fff;
      border-radius: 4px;
      background: #7d40e7;
      font-size: 16px;
      font-weight: bold;
      padding: 12px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
