import React, { Component, PropTypes } from 'react';
import ContractItem from './ContractItem';

class ContractList extends Component {
  render() {
    let filteredContracts = this.props.contracts.filter(
      (contract) => contract.name.indexOf(this.props.filterText) !== -1
    );

    return (
      <ul>
        {filteredContracts.map(
          (contract) => <ContractItem key={contract.email}
                                      name={contract.name}
                                      email={contract.email} />
        )}
      </ul>
    );
  }
}

ContractList.propTypes = {
  contracts: PropTypes.arrayOf(PropTypes.object)
}

export default ContractList;
