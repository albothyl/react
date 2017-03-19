import React, { Component } from 'react';
import CheckList from './CheckList'

class Card extends Component {
  constructor() {
    this.state = {
      showDetails: false
    }
  };

  render() {
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList
            cardId={this.props.id}
            tasks={this.props.tasks}
            taskCallBacks={this.props.taskCallBacks} />
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card__title"
             onclick={() => this.setState({showDetails: !this.state.showDetails})}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  tasks: PropTypes.array,
  taskCallBacks: PropTypes.object
}

export default Card;