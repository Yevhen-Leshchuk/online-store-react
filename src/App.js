import { PureComponent, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout/';

const CategoryPage = lazy(() =>
  import(
    'pages/CategoryPage/CategoryPage' /* webpackChunkName: "CategoryPage" */
  )
);

class App extends PureComponent {
  render() {
    return (
      <>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<CategoryPage />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    );
  }
}

export default App;
