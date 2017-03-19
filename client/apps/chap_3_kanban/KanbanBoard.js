import React, { Component, PropTypes } from 'react';
import CardList from './CardList';

class KanbanBoard extends Component {
  render() {
    return (
      <div className="app">
        <CardList title="To Do" taskCallBack={this.props.taskCallBacks} cards={this.props.cards.filter((card) => card.status === "todo")} />
        <CardList title="In Progress" taskCallBack={this.props.taskCallBacks} cards={this.props.cards.filter((card) => card.status === "inProgress")} />
        <CardList title="Done" taskCallBack={this.props.taskCallBacks} cards={this.props.cards.filter((card) => card.status === "done")} />
      </div>

    )
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallBacks: PropTypes.object
}

export default KanbanBoard;