import React from 'react'
import TYPES from '../../redux/action/types'
import Timer from '../Timer'
import { useDispatch } from 'react-redux'
import './index.css'

const FinishedTodo = ({ props }) => {

    const { title, description, id, timeElapsed } = props
    const dispatch = useDispatch()
    const reopenTodoAction = () => {
        dispatch({ type: TYPES.REOPEN_TODO, payload: { ...props, isRunning: false } })
        dispatch({ type: TYPES.SET_TOTAL_PRODUCTIVITY_TIME })
    }

    return (
        <div className="text finished-todo-container ">
            <span>{title}</span>
            <span>{description}</span>
            <Timer elapsedTimeInSeconds={timeElapsed} />
            <button onClick={reopenTodoAction}>Reopen</button>
        </div>
    )
}

export default FinishedTodo
