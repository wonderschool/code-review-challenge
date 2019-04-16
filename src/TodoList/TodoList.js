import React, { Component } from 'react'
import TaskGroupList from './TaskGroupList'
import TaskList from './TaskList'

import './TodoList.css'

export default class TodoList extends Component {
  state = {
    tasks: [],
    taskGroup: null,
  }

  constructor(props) {
    super(props)

    this.onTaskGroupSelect = this.onTaskGroupSelect.bind(this)
    this.onTaskStatusChange = this.onTaskStatusChange.bind(this)
    this.onClearTaskGroupSelection = this.onClearTaskGroupSelection.bind(this)
  }

  componentDidMount() {
    fetch(`/tasks.json?userId=${this.props.userId}`)
      .then(resp => resp.json())
      .then(json => this.setState({ tasks: json }))
  }

  render() {
    var { taskGroup, tasks } = this.state

    return (
      <div className="TodoList">
        {
          taskGroup ?
            <TaskList
              taskGroup={taskGroup}
              tasks={tasks}
              onClearTaskGroupSelection={this.onClearTaskGroupSelection}
              onTaskStatusChange={this.onTaskStatusChange}
            /> :
            <TaskGroupList
              tasks={tasks}
              onTaskGroupSelect={this.onTaskGroupSelect}
            />
        }
      </div>
    )
  }

  onTaskGroupSelect(taskGroup) {
    this.setState({ taskGroup })
  }

  onClearTaskGroupSelection() {
    this.setState({ taskGroup: null })
  }

  onTaskStatusChange(taskId, isComplete) {
    let newTasks = this.state.tasks.map(task => {
      if (task.id !== taskId) return task

      return {
        ...task,
        completedAt: isComplete ? Date.now() : null
      }
    })

    this.setState({ tasks: newTasks })
  }
}
