import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  render() {
    let cardList = this.props.cards.map((card) => {
      return <Card key={card.id}
                   title={card.title}
                   description={card.description}
                   tasks={card.tasks}
                   taskCallBacks={this.props.taskCallBacks}/>
    });

    return (
      <div>
        <h1>{this.props.title}</h1>
        {cardList}
      </div>
    );
  }
}

CardList.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallBacks: PropTypes.object
}

export default CardList;
