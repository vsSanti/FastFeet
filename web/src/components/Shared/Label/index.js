import React from 'react';
import PropTypes from 'prop-types';

import { LabelStyle } from './styles';

export default function Label({ htmlFor, children }) {
  return <LabelStyle htmlFor={htmlFor}>{children}</LabelStyle>;
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
