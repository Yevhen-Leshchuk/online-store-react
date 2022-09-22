import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './CategoryName.module.scss';

class CategoryName extends Component {
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

CategoryName.propTypes = { currentCurrency: PropTypes.string };

export default connect(mapStateToProps)(CategoryName);
