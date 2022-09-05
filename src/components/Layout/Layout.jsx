import { PureComponent } from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'components/Container';
import Header from 'components/Header';
import s from './Layout.module.scss';

class Layout extends PureComponent {
  render() {
    return (
      <Container>
        <Header />
        <main>
          <section className={s.products}>
            <Outlet />
          </section>
        </main>
      </Container>
    );
  }
}

export default Layout;
