import React from 'react';
import PropTypes from 'prop-types';

import { StyledErrorMessage } from './styles';

export default function ErrorMessage({ children }) {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
}

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
