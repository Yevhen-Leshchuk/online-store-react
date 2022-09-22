import { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'components/Container';
import Header from 'components/Header';
import s from './Layout.module.scss';

const CategoryPage = lazy(() =>
  import(
    'pages/CategoryPage/CategoryPage' /* webpackChunkName: "CategoryPage" */
  )
);

const ProductList = lazy(() =>
  import('components/ProductList/ProductList' /* webpackChunkName: "Content" */)
);

const ProductDescriptionPage = lazy(() =>
  import(
    'pages/ProductDescriptionPage/ProductDescriptionPage' /* webpackChunkName: "PDP" */
  )
);

const CartPage = lazy(() =>
  import('pages/CartPage/CartPage' /* webpackChunkName: "CartPage" */)
);

class Layout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    const { currentCategory, location } = this.props;

    return (
      <Container>
        <Header />
        <main>
          <section className={s.products}>
            <Switch>
              <Suspense fallback={null}>
                <Route exact path="/">
                  {location.pathname === '/' ? (
                    <Redirect to="/all" />
                  ) : (
                    <CategoryPage />
                  )}
                </Route>

                <Route exact path={`/${currentCategory}`}>
                  <ProductList />
                </Route>

                <Route path={`/${currentCategory}/:id`}>
                  <ProductDescriptionPage />
                </Route>

                <Route path="/cart">
                  <CartPage />
                </Route>
              </Suspense>
            </Switch>
            <ToastContainer
              transition={Zoom}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </section>
        </main>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentCategory: state.currentCategory.category,
});

Layout.propTypes = {
  currentCategory: PropTypes.string.isRequired,
};

const Main = withRouter(Layout);

export default connect(mapStateToProps)(Main);
