import React from 'react';
import PropTypes from 'prop-types';
import { MdImage } from 'react-icons/md';

import { DashedRoundDiv, Name } from './styles';

export default function Placeholder({ children }) {
  return (
    <DashedRoundDiv>
      <MdImage color="#DDDDDD" size={30} />
      <Name>{children}</Name>
    </DashedRoundDiv>
  );
}

Placeholder.propTypes = {
  children: PropTypes.string.isRequired,
};
