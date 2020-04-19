import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';

import ErrorMessage from '~/components/Shared/ErrorMessage';
import Label from '~/components/Shared/Label';

import { Container } from '../styles';

export default function MaskedInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

MaskedInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

MaskedInput.defaultProps = {
  label: '',
};
