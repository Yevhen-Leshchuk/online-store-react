import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { categoriesOperations } from 'redux/categories';
import { setCategory } from 'redux/currentCategory';
import s from './Navigation.module.scss';

class Navigation extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getProductName(this.props.currentCategory);
  }

  componentDidUpdate() {
    const { location, categoriesName } = this.props;
    const pathname = location.pathname.slice(1);
    const category = categoriesName.find(name => name === pathname);

    if (category) {
      this.props.setCategory(category);
    }
  }

  clickOnCategory = category => {
    this.props.setCategory(category);
    this.props.getProductName(category);
  };

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

Navigation.propTypes = {
  categoriesName: PropTypes.arrayOf(PropTypes.string.isRequired),
  currentCategory: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  getProductName: PropTypes.func.isRequired,
};

const Nav = withRouter(Navigation);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
