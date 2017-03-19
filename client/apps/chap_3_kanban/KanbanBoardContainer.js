import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill'

const API_HOST = 'http://127.0.0.1:8080/api/v1'
const API_HEADER = {
  'content-Type': 'application/json'
}

class KanbanBoardContainer extends Component {
  constructor() {
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    fetch(API_HOST + '/kanban/cards', API_HEADER)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ cards: responseData });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  addTask(cardId, taskName) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    let newTask = { id: Date.now(), name: taskName, done: false };

    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });

    this.setState({ cards: nextState });

    fetch('${API_HOST}/cards/${cardId}/tasks', {
      method: 'post',
      headers: API_HEADER,
      body: JSON.stringify({ done: newDoneValue })
    })
      .then((response) => response.json())
      .then((responseData) => {
        newTask.id = responseData.id
        this.setState({ cards: nextState })
      });
  }

  deleteTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    this.setState({ cards: nextState })

    fetch('${API_HOST}/cards/${cardId}/tasks/${taskId}', {
      method: 'delete',
      headers: API_HEADER
    });
  }

  toggleTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    let newDoneValue;

    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDoneValue = !done
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    this.setState({ cards: nextState })

    fetch('${API_HOST}/cards/${cardId}/tasks/${taskId}', {
      method: 'put',
      headers: API_HEADER,
      body: JSON.stringify({ done: newDoneValue })
    });
  }

  render() {
    return <KanbanBoard cards={this.state.cards} taskCallBacks={{
               toggle: this.toggleTask.bind(this),
               delete: this.deleteTask.bind(this),
               add: this.addTask.bind(this)
             }}
    />
  }

}

export default KanbanBoardContainer;