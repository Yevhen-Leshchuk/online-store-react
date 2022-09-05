import { PureComponent } from 'react';
import ProductList from 'components/ProductList';
import s from './Content.module.scss';

class Content extends PureComponent {
  render() {
    return (
      <>
        <h1 className={s.categoryTitle}>Category name</h1>
        <ProductList />
      </>
    );
  }
}

export default Content;
