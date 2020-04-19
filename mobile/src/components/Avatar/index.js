import React from 'react';
import PropTypes from 'prop-types';

import { Image, Placeholder, PlaceholderText } from './styles';

export default function Avatar({ children, size, url }) {
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

  return url ? (
    <Image size={size} source={{ uri: url }} />
  ) : (
    <Placeholder size={size}>
      <PlaceholderText fontSize={size / 2}>
        {renderInitials(children)}
      </PlaceholderText>
    </Placeholder>
  );
}

Avatar.propTypes = {
  size: PropTypes.number,
  children: PropTypes.string,
  url: PropTypes.string,
};

Avatar.defaultProps = {
  size: 120,
  url: null,
  children: '',
};
