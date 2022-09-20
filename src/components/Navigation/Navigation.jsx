import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoriesOperations } from 'redux/categories';
import { setCategory } from 'redux/currentCategory';
import s from './Navigation.module.scss';

class Navigation extends Component {
  clickOnCategory = category => {
    this.props.setCategory(category);
    this.props.getProductName(category);
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getProductName(this.props.currentCategory);
  }

  render() {
    const { categoriesName, currentCategory } = this.props;

    return (
      <nav className={s.navBox}>
        {categoriesName.map(name => {
          return (
            <NavLink
              key={name}
              to={`/${name}`}
              alt={`${name} page`}
              className={
                name === currentCategory ? `${s.activeLink}` : `${s.navLink}`
              }
              onClick={() => {
                this.clickOnCategory(name);
              }}
            >
              {name}
            </NavLink>
          );
        })}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  categoriesName: state.categories.name,
  currentCategory: state.currentCategory.category,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(categoriesOperations.getAllCategories()),
  setCategory: currentCategory => dispatch(setCategory(currentCategory)),
  getProductName: currentCategory =>
    dispatch(categoriesOperations.getProductName(currentCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
