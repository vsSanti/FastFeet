import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function AvatarPlaceholder({ children, size, fontSize, color }) {
  function renderInitials(name) {
    let shortenedName = String(name)
      .trim()
      .split(' ')
      .reduce((accumulator, n) => accumulator + n[0], '')
      .substring(0, 2)
      .toUpperCase();

    shortenedName =
      shortenedName.length > 2
        ? `${shortenedName[0]}${shortenedName[shortenedName.length - 1]}`
        : shortenedName;
    return shortenedName;
  }
  return (
    <Container size={size} fontSize={fontSize} color={color}>
      {renderInitials(children)}
    </Container>
  );
}

AvatarPlaceholder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  children: PropTypes.string.isRequired,
};

AvatarPlaceholder.defaultProps = {
  color: '#7159c1',
  size: 35,
  fontSize: 16,
};
