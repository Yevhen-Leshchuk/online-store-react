import { Component, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

class App extends Component {
  render() {
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
        <ToastContainer
          transition={Zoom}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default App;
