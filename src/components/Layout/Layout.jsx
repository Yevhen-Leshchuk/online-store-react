import { PureComponent } from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'components/Container';
import Header from 'components/Header';

class Layout extends PureComponent {
  render() {
    return (
      <Container>
        <Header />
        <Outlet />
      </Container>
    );
  }
}

export default Layout;
