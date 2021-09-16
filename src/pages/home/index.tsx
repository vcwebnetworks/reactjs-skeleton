import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <h1>home page</h1>
    </Container>
  );
};

export default Home;
