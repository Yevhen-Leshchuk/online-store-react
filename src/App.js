import { PureComponent, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from 'components/Layout/';

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

class App extends PureComponent {
  render() {
    // const name = this.props.categoriesName.map(name => name);
    return (
      <>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<CategoryPage />} />
              <Route path="/:category" element={<ProductList />} />
              <Route path="product-card" element={<ProductDescriptionPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    );
  }
}

// const mapStateToProps = state => ({
//   categoriesName: state.categories.name,
// });

// export default connect(mapStateToProps)(App);
export default App;
