import { PureComponent, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout/';

const CategoryPage = lazy(() =>
  import(
    'pages/CategoryPage/CategoryPage' /* webpackChunkName: "CategoryPage" */
  )
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
    return (
      <>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<CategoryPage />} />
              <Route path="product-card" element={<ProductDescriptionPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    );
  }
}

export default App;
