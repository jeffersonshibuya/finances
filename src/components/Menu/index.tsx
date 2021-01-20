import React from 'react';

import { GoDashboard, GoTasklist } from 'react-icons/go';
import { Container, Navigation, LinkMenu } from './styles';

const Menu: React.FC = () => {
  return (
    <Container>
      <Navigation>
        <h2>Finances</h2>
        <LinkMenu to="/" exact>
          <GoDashboard />
          Dashboard
        </LinkMenu>
        <LinkMenu to="/expenses">
          <GoTasklist />
          Expenses
        </LinkMenu>
        <LinkMenu to="/category">
          <GoTasklist />
          Categories
        </LinkMenu>
        <LinkMenu to="/reference">
          <GoTasklist />
          References
        </LinkMenu>
      </Navigation>
    </Container>
  );
};

export default Menu;
