import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

class Navigation extends PureComponent {
  render() {
    return (
      <nav className={s.navBox}>
        <NavLink
          to="/"
          alt="women page"
          className={({ isActive }) =>
            isActive ? `${s.activeLink}` : `${s.navLink}`
          }
        >
          Women
        </NavLink>

        <NavLink
          to="men"
          alt="men page"
          className={({ isActive }) =>
            isActive ? `${s.activeLink}` : `${s.navLink}`
          }
        >
          Men
        </NavLink>

        <NavLink
          to="kids"
          alt="kids page"
          className={({ isActive }) =>
            isActive ? `${s.activeLink}` : `${s.navLink}`
          }
        >
          Kids
        </NavLink>
      </nav>
    );
  }
}

export default Navigation;
