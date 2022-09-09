import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoriesOperations } from 'redux/categories';
import { setCategory } from 'redux/currentCategory';
import s from './Navigation.module.scss';

class Navigation extends PureComponent {
  clickOnCategory = category => {
    this.props.setCategory(category);
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categoriesName, currentCategory } = this.props;
    console.log(currentCategory);

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
