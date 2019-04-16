import React, { Component } from 'react'
import Task from './Task'

import './TaskList.css'

export default class TaskList extends Component {

  render() {
    let allTasks = this.props.tasks
    let groupTasks = allTasks.filter(x => x.group === this.props.taskGroup)

    return (
      <div>
        <div className="TaskList-heading">
          <div className="TaskList-headingText">{this.props.taskGroup}</div>
          <a href="/" onClick={this.props.onClearTaskGroupSelection}>All groups</a>
        </div>

        <div className="TaskList-list">
          {groupTasks.map((task, i) => {
            let isLocked = anyDependenciesIncomplete(allTasks, task.dependencyIds)
            let onStatusChange = this.onStatusChange.bind(this, task.id)

            return (
              <div key={i} className="TaskList-listItem">
                <Task task={task} isLocked={isLocked} onStatusChange={onStatusChange} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  onStatusChange(taskId, isComplete) {
    this.props.onTaskStatusChange(taskId, isComplete)
  }
}

function anyDependenciesIncomplete(tasks, dependencyIds) {
  return dependencyIds.every(dependencyId => {
    let dependencyTask = tasks.find(x => x.id === dependencyId)

    return !dependencyTask.completedAt
  })
}
