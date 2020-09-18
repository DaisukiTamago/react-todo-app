import TYPES from '../action/types'

const Reducer = (previousState, action) => {
    const { type, payload } = action

    switch (type) {
        case TYPES.CREATE_TODO:
            return { ...previousState, todos: [...previousState.todos, payload] }

        case TYPES.FINISH_TODO:

            let removeIndex = previousState.todos.map(todo => todo.id).indexOf(payload);
            let finishedTodo = previousState.todos.splice(removeIndex, 1)
            return { ...previousState, todos: previousState.todos, finishedTodos: [...previousState.finishedTodos, ...finishedTodo] }

        case TYPES.EDIT_TODO:
            return {
                ...previousState, todos: previousState.todos.map(todo => {
                    if (todo.id == payload.id) {
                        return todo = { ...todo, ...payload }
                    } else {
                        return todo
                    }
                })
            }

        case TYPES.REOPEN_TODO:
            let reopenIndex = previousState.finishedTodos.map(todo => todo.id).indexOf(payload);
            let reopenTodo = previousState.finishedTodos.splice(reopenIndex, 1)
            reopenTodo[0]["isRunning"] = false
            return { ...previousState, todos: [...previousState.todos, ...reopenTodo], finishedTodos: previousState.finishedTodos }

        case TYPES.ERASE_ALL_TODOS:
            return { ...previousState, todos: [] }

        case TYPES.SET_TOTAL_PRODUCTIVITY_TIME:

            let total = previousState.finishedTodos.reduce((accumulator, current) => {
                return accumulator += current.timeElapsed
            }, 0)

            return { ...previousState, totalElapsedTime: total }

        default:
            return previousState;
    }
}

export default Reducer