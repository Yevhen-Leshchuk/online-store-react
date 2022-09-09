import { PureComponent } from 'react';
import { connect } from 'react-redux';
import s from './CategoryName.module.scss';

class CategoryName extends PureComponent {
  render() {
    const { currentCategory } = this.props;
    return (
      <>
        <h1 className={s.categoryTitle}>{currentCategory}</h1>
      </>
    );
  }
}
const mapStateToProps = state => ({
  currentCategory: state.currentCategory.category,
});

export default connect(mapStateToProps)(CategoryName);
