import { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { currentCategory } = this.props;

    return (
      <Container>
        <Header />
        <main>
          <section className={s.products}>
            <Switch>
              <Suspense fallback={null}>
                <Route exact path="/">
                  <CategoryPage />
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
  // categoriesName: state.categories.name,
  currentCategory: state.currentCategory.category,
});

const Main = withRouter(Layout);

export default connect(mapStateToProps)(Main);
