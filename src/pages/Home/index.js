import React, { useState, useEffect } from 'react'
import TYPES from '../../redux/action/types'
import shortid from 'shortid'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog } from '@material-ui/core'
import Todo from '../../components/Todo'
import FinishedTodo from '../../components/FinishedTodo'
import Timer from '../../components/Timer'
import './index.css'

const Home = () => {


    const dispatch = useDispatch()
    const [isModalOpen, setModalState] = useState(false)
    const todos = useSelector(state => state.todos)
    const finishedTodos = useSelector(state => state.finishedTodos)
    const totalElapsedTime = useSelector(state => state.totalElapsedTime)

    const [todoData, setTodoData] = useState({
        title: "",
        description: "",
        timeElapsed: 0,
        inactiveTime: 0,
        isRunning: false
    })

    const handleCreateTodoData = (event) => {
        const { target: { name, value } } = event
        setTodoData(previousData => { return { ...previousData, [name]: value } })
    }

    useEffect(() => { dispatch({ type: TYPES.SET_TOTAL_PRODUCTIVITY_TIME }) }, [])

    return (
        <>
            <Dialog open={isModalOpen} onClose={() => setModalState(false)}>
                <div className="create-todo-modal-container">
                    Title: <input type="text" name="title" onChange={handleCreateTodoData} />
                    Description: <textarea name="description" onChange={handleCreateTodoData} />
                    <button onClick={() => {
                        dispatch({
                            type: TYPES.CREATE_TODO,
                            payload: {
                                ...todoData,
                                createdAt: new Date(),
                                id: shortid.generate()
                            }
                        })
                        setModalState(false)
                    }}>Create</button>
                </div>
            </Dialog>

            <div className="todos-container">
                <div className="header-container">
                    <span>To Dos</span>
                    <button onClick={() => setModalState(true)} >Add new todo</button>
                    <button onClick={() => dispatch({ type: TYPES.ERASE_ALL_TODOS })} >Erase All Todos</button>
                </div>
                {todos.map(todo => <Todo props={todo} key={todo.id} />)}
            </div>

            <div className="finished-todos-container">
                <div className="header-container">
                    <span>Finished</span>
                </div>
                {finishedTodos.map(finishedTodo => <FinishedTodo props={finishedTodo} key={finishedTodo.id} />)}
                <div className="total-time-container">
                    <span> Total Productivity Time: </span> {<Timer elapsedTimeInSeconds={totalElapsedTime} />}
                </div>
            </div>
        </>
    )
}

export default Home
