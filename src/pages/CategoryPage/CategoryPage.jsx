import { Component } from 'react';
import ProductList from 'components/ProductList';
import s from './CategoryPage.module.scss';

class CategoryPage extends Component {
  render() {
    return (
      <>
        <ProductList />
      </>
    );
  }
}

export default CategoryPage;
