import React, { useState, useEffect } from 'react'
import Timer from '../Timer'
import { useDispatch } from 'react-redux'
import TYPES from '../../redux/action/types'
import './index.css'

const Todo = ({ props }) => {

    const dispatch = useDispatch()
    const [isEditing, setEditMode] = useState(false)
    const { title, description, id, timeElapsed, isRunning, createdAt, inactiveTime } = props

    const setRunningState = () => {
        dispatch({ type: TYPES.EDIT_TODO, payload: { ...props, isRunning: !isRunning } })
    }

    const dispatchFinishAction = () => {
        dispatch({ type: TYPES.FINISH_TODO, payload: id })
        dispatch({ type: TYPES.SET_TOTAL_PRODUCTIVITY_TIME })
    }

    const editTodo = (event) => {
        const { target: { name, value } } = event
        dispatch({ type: TYPES.EDIT_TODO, payload: { [name]: value, id } })
    }

    useEffect(() => {
        if (isRunning) {
            let actualDate = new Date()
            let creationDate = new Date(createdAt)
            let pastTime = ((actualDate.getTime() - creationDate.getTime()) / 1000) - timeElapsed
            pastTime -= inactiveTime
            dispatch({ type: TYPES.EDIT_TODO, payload: { id, timeElapsed: parseInt(timeElapsed + pastTime) } })
        }
    }, [])

    useEffect(() => {
        let interval = null

        if (isRunning) {
            interval = setInterval(() => {
                dispatch({ type: TYPES.EDIT_TODO, payload: { timeElapsed: timeElapsed + 1, id } })
            }, 1000);
        } else if (!isRunning && timeElapsed !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning, timeElapsed])

    useEffect(() => {
        let inactiveInterval = null

        if (!isRunning && timeElapsed !== 0) {
            inactiveInterval = setInterval(() => {
                dispatch({ type: TYPES.EDIT_TODO, payload: { inactiveTime: inactiveTime + 1, id } })
            }, 1000);
        } else if (isRunning && inactiveTime !== 0) {
            clearInterval(inactiveInterval)
        }
        return () => clearInterval(inactiveInterval)
    }, [isRunning, inactiveTime])

    return (
        <div className="todo-container text" style={{ backgroundColor: isRunning ? "#62CB77" : "#D6A229" }}>

            <div className="todo-container-header">
                {isEditing ?
                    <input name="title" style={{ marginBottom: 10 }} value={title} onInput={editTodo} /> :
                    <h3>{title}</h3>
                }
            </div>

            {isEditing ?
                <textarea name="description" value={description} onInput={editTodo} /> :
                <p>{description}</p>
            }
            <Timer elapsedTimeInSeconds={timeElapsed} />

            <div className="todo-buttons-container">
                <button onClick={setRunningState}> {isRunning ? 'Pause' : 'Start'} </button>
                <button onClick={dispatchFinishAction}> Finish </button>
                <button onClick={() => setEditMode(!isEditing)}>{isEditing ? "Done" : "Edit"}</button>
            </div>

        </div>
    )
}

export default Todo
