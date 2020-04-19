import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

export default function Button({ icon, backgroundColor, children, onClick }) {
  return (
    <StyledButton
      type="button"
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {icon}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  icon: null,
  backgroundColor: '#7d40e7',
};
