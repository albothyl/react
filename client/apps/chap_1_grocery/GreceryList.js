import React, { Component } from 'react';

class GreceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1" name="Bread1" />
        <ListItem quantity="6" name="Eggs" />
        <ListItem quantity="2" name="Milk" />
      </ul>
    );
  }
}

class ListItem extends Component {
  render() {
    return (
      <li>
        {this.props.quantity} x {this.props.name}
      </li>
    );
  }
}

export default GreceryList;