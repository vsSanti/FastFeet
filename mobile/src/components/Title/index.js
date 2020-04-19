import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { StyledTitle } from './styles';

export default function Title({ title, icon }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {icon}
      <StyledTitle>{title}</StyledTitle>
    </View>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
