import styled from 'styled-components';

export const Overlay = styled.div`
  z-index: 100;
  display: ${props => (props.isOpened ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

export const Container = styled.div`
  position: fixed;
  background: #fff;
  width: 60%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  border-radius: 4px;
`;

export const Content = styled.section`
  display: block;

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #444;
  }

  strong {
    display: flex;
    flex-direction: row;
    align-items: baseline;

    p {
      font-weight: normal;
      margin-left: 4px;
    }
  }

  p,
  strong {
    font-size: 16px;
    color: #666;
  }

  hr {
    margin: 10px 0;
    border-top: 1px solid #ddd;
  }

  img {
    display: block;
    max-height: 160px;
    margin: 10px auto;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.h1`
  font-size: 26px;
  color: #444;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: 0;
`;
