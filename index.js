import Koa from 'koa'
import { createStore } from 'redux'
import freeze from 'deep-freeze'

const defaultState = freeze({
    port: 3000
})

//const app = new Koa();
function redux0r(state = defaultState, action) {
    switch (action.type) {
        case 'BIND_PORT':
            return freeze({
                ...state,
                port: action.port
            })
        default:
            return state
    }
}

const store = createStore(redux0r)
store.subscribe(() =>
  console.log(store.getState())
)
store.dispatch({ type: 'LISTEN', port: 3000 })
