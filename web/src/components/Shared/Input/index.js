import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import ErrorMessage from '~/components/Shared/ErrorMessage';
import Label from '~/components/Shared/Label';

import { Container } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: '',
};
