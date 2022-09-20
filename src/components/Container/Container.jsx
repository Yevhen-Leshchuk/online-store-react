import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Container.module.scss';

class Container extends Component {
  render() {
    return <div className={s.container}>{this.props.children}</div>;
  }
}

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
