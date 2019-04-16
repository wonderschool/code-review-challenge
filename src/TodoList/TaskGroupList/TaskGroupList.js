import React, { Component } from 'react'
import icon from './group.svg'

import './TaskGroupList.css'

class TaskGroup extends Component {
  render() {
    let taskCount = this.props.tasks.length
    let completedTaskCount = this.props.tasks.filter(task => task.completedAt).length

    return (
      <div className="TaskGroup" onClick={this.props.onClick}>
        <div className="TaskGroup-icon"><img src={icon} alt="" /></div>
        <div className="TaskGroup-summary">
          <div className="TaskGroup-name">{this.props.name}</div>
          <div className="TaskGroup-status">{completedTaskCount} of {taskCount} tasks completed</div>
        </div>
      </div>
    )
  }
}

export default class TaskGroupList extends Component {
  render() {
    let groups = groupTasks(this.props.tasks)

    return (
      <div>
        <div className="TaskGroupList-heading">Things to do</div>

        <div className="TaskGroupList-list">
          {Object.entries(groups).map(([name, tasks]) => {
            let onClick = this.onClick.bind(this, name)

            return (
              <div className="TaskGroupList-listItem">
                <TaskGroup name={name} tasks={tasks} onClick={onClick} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  onClick(name) {
    this.props.onTaskGroupSelect(name)
  }
}

function groupTasks(tasks) {
  return tasks.reduce((acc, task) => {
    (acc[task.group] = acc[task.group] || []).push(task)

    return acc
  }, {})
}
