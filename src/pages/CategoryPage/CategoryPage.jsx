import { PureComponent } from 'react';
import ProductList from 'components/ProductList';
import s from './CategoryPage.module.scss';

class CategoryPage extends PureComponent {
  render() {
    return (
      <>
        <ProductList />
      </>
    );
  }
}

export default CategoryPage;
