import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar';
import ContractList from './ContractList';

class ContractsApp extends Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    };
  }

  handleUserInput(searchTerm) {
    this.setState({filterText: searchTerm})
  }
  
  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput.bind(this)} />

        <ContractList contracts={this.props.contracts}
                      filterText={this.state.filterText} />
      </div>
    );
  }
}

ContractsApp.propTypes = {
  contracts: PropTypes.arrayOf(PropTypes.object)
}

let contracts = [
  { name: "Test_1", email: "test_1@email.com" },
  { name: "Test_2", email: "test_2@email.com" },
  { name: "Test_3", email: "test_3@email.com" },
  { name: "Test_4", email: "test_4@email.com" },
  { name: "Test_5", email: "test_5@email.com" },
  { name: "Test_6", email: "test_6@email.com" },
]

render(<ContractsApp contracts={contracts} />, document.getElementById('root'));
