import './index.scss';

import React, { Component } from 'react';
import { Link } from 'react-router';
import bem from 'react-bem-classes';


@bem({
  block: 'container',
  modifiers: ['long']
})
export default class Container extends Component {
  render() {
    return (
      <div className={this.block()}>
        {this.props.children}
      </div>
    );
  }
}
