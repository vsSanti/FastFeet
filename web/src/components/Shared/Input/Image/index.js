import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import api from '~/services/api';

import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/AvatarPlaceholder';
import ErrorMessage from '~/components/Shared/ErrorMessage';

import Placeholder from './Placeholder';

import { Container } from './styles';

export default function ImageInput({ name, placeholderName, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.file',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  function renderImage() {
    if (preview) {
      return <Avatar url={preview} alt="Preview" size={150} />;
    }
    if (placeholderName) {
      return (
        <AvatarPlaceholder size={150} fontSize={66}>
          {placeholderName}
        </AvatarPlaceholder>
      );
    }
    return <Placeholder>Adicionar foto</Placeholder>;
  }

  return (
    <Container>
      <label htmlFor={name}>
        {renderImage()}
        <input
          id={name}
          type="file"
          ref={inputRef}
          data-file={file}
          onChange={handleChange}
          {...rest}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </label>
    </Container>
  );
}

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholderName: PropTypes.string,
};

ImageInput.defaultProps = {
  placeholderName: null,
};
