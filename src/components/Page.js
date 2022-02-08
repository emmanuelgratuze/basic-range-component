import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';

const Content = styled.div`
  padding: 20px 1em 0 1em;
`;

function Page() {
  return (
    <div>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}

export default Page;
