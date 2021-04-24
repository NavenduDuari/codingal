import React, { Component } from 'react';
import './Post.scss';
import { ComponentPropsI, ComponentStateI } from './types';

class Header extends Component<ComponentPropsI, ComponentStateI> {
  constructor(props: ComponentPropsI) {
    super(props);
    this.state = {
      test: '',
    };
  }

  render() {
    console.log(this.state.test);
    return <div>post component</div>;
  }
}

export default Header;
