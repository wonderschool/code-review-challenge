import React, { Component } from 'react'
import completed from './completed.svg'
import incomplete from './incomplete.svg'
import locked from './locked.svg'

import './Task.css'

export default class Task extends Component {
  render() {
    let foo = this.props.task.completedAt ? completed : incomplete
    let bar = this.props.isLocked ? locked : foo

    return (
      <div className="Task" onClick={this.onClick}>
        <div className="Task-icon"><img className="Task-iconImg" src={bar} alt="" /></div>
        <div className="Task-text">{this.props.task.task}</div>
      </div>
    )
  }

  onClick() {
    if (this.props.isLocked) return

    this.props.onStatusChange(!this.props.task.completedAt)
  }
}
