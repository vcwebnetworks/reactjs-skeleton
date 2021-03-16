import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const MainPage: React.FC = () => {
  return (
    <Container>
      <h1>MainPage</h1>
    </Container>
  );
};

export default MainPage;
