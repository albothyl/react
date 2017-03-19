import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
  checkInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.taskCallBacks.add(this.props.cardId, event.target.value);
      event.target.value = '';
    }
  }

  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist__task">
        <input type="checkbox" checked={task.done} onChange={
          this.props.taskCallBacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
        } />

        {task.name} {' '}

        <a href="#" className="checklist__task--remove"
           onClick={this.props.taskCallBacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}></a>
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
               className="checklist--add-task"
               placeholder="Type then hit Enter to add a task"
               onkeypress={this.checkInputKeyPress.bind(this)} />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallBacks: PropTypes.object
}

export default CheckList;
