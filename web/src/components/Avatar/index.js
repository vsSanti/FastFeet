import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Avatar({ size, url }) {
  return <Container src={url} alt="Avatar" size={size} />;
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 35,
};
