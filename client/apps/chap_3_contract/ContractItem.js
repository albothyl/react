import React, { Component, PropTypes } from 'react';

class ContractItem extends Component {
  render() {
    return <li key={this.props.email}>{this.props.name} - {this.props.email}</li>
  }
}

ContractItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ContractItem;
