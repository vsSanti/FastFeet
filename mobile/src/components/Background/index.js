import React from 'react';
import PropTypes from 'prop-types';

import { Container, Box } from './styles';

export default function Background({ isBoxVisible, children, ...rest }) {
  return (
    <>
      {isBoxVisible && <Box />}
      <Container {...rest}>{children}</Container>
    </>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isBoxVisible: PropTypes.bool,
};

Background.defaultProps = {
  isBoxVisible: true,
};
