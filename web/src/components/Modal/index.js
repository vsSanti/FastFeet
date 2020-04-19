import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdClose } from 'react-icons/md';

import {
  Overlay,
  Container,
  Content,
  Header,
  Title,
  CloseButton,
} from './styles';

export default function Modal({ closeHandler, isOpened, title, children }) {
  return (
    <Overlay isOpened={isOpened}>
      <OutsideClickHandler onOutsideClick={closeHandler} disabled={!isOpened}>
        <Container>
          <Header>
            <Title>{title}</Title>
            <CloseButton type="button" onClick={closeHandler}>
              <MdClose color="#444" size={20} />
            </CloseButton>
          </Header>

          <Content>{children}</Content>
        </Container>
      </OutsideClickHandler>
    </Overlay>
  );
}

Modal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.element,
};

Modal.defaultProps = {
  title: null,
  children: <h1>nada</h1>,
};
