import React from 'react';

import { Container, StyledSpinnerContainer, StyledSpinner } from './styles';

export default function Spinner() {
  return (
    <Container>
      <StyledSpinnerContainer>
        <StyledSpinner viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="2"
          />
        </StyledSpinner>
      </StyledSpinnerContainer>
    </Container>
  );
}
