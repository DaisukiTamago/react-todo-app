import {createStore, compose} from 'redux'
import Reducer from '../reducer'
import persistState from 'redux-localstorage'

const enhancer = compose(
    persistState()
)

const initialState = {
    todos: [],
    finishedTodos: [],
    totalElapsedTime: 0
}

const store = createStore(Reducer, initialState, enhancer)

export default store